import { Command } from 'ckeditor5';

export class PasteCommand extends Command {
    override execute() {
        const editor = this.editor;
        const model = editor.model;

        // Read from clipboard
        navigator.clipboard.read()
            .then(async (clipboardItems) => {
                for (const clipboardItem of clipboardItems) {
                    try {
                        // Try to get HTML content first
                        if (await clipboardItem.types.includes('text/html')) {
                            const htmlBlob = await clipboardItem.getType('text/html');
                            const htmlContent = await htmlBlob.text();
                            const viewFragment = editor.data.processor.toView(htmlContent);
                            const modelFragment = editor.data.toModel(viewFragment);
                            model.insertContent(modelFragment);
                            return;
                        }
                        // Fallback to plain text
                        if (await clipboardItem.types.includes('text/plain')) {
                            const textBlob = await clipboardItem.getType('text/plain');
                            const text = await textBlob.text();
                            const modelFragment = editor.data.toModel(editor.data.processor.toView(text));
                            model.insertContent(modelFragment);
                            return;
                        }
                    } catch (err) {
                        console.warn('Failed to paste from clipboard:', err);
                    }
                }
            })
            .catch(async (err) => {
                console.warn('Failed to read clipboard data:', err);
                // Fallback to older clipboard API
                try {
                    const text = await navigator.clipboard.readText();
                    const modelFragment = editor.data.toModel(editor.data.processor.toView(text));
                    model.insertContent(modelFragment);
                } catch (err) {
                    console.error('Clipboard access denied:', err);
                }
            });
    }

    override refresh() {
        // Paste is always enabled when editor is editable
        this.isEnabled = this.editor.model.document.selection.anchor !== null;
    }
}