import { Command } from 'ckeditor5';

export class CutCommand extends Command {
    override execute() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;

        if (!selection || selection.isCollapsed) {
            return;
        }

        // Get selected content
        const selectedContent = model.getSelectedContent(selection);
        const viewFragment = editor.data.toView(selectedContent);
        const html = editor.data.processor.toData(viewFragment);
        const plainText = this._getPlainTextFromView(viewFragment);

        // Copy to clipboard
        if (navigator.clipboard && window.ClipboardItem) {
            const clipboardData = new ClipboardItem({
                'text/html': new Blob([html], { type: 'text/html' }),
                'text/plain': new Blob([plainText], { type: 'text/plain' })
            });
            navigator.clipboard.write([clipboardData])
                .then(() => this._removeContent())
                .catch(err => {
                    console.warn('Failed to cut to clipboard:', err);
                    // Fallback to basic text copy
                    navigator.clipboard.writeText(plainText)
                        .then(() => this._removeContent());
                });
        } else {
            // Fallback for older browsers
            navigator.clipboard.writeText(plainText)
                .then(() => this._removeContent());
        }
    }

    override refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        
        // Command is enabled only when there is a non-collapsed selection
        this.isEnabled = !selection.isCollapsed;
    }

    private _getPlainTextFromView(viewFragment: any): string {
        return viewFragment.data || '';
    }

    private _removeContent() {
        const model = this.editor.model;
        const selection = model.document.selection;
        
        model.deleteContent(selection);
    }
}