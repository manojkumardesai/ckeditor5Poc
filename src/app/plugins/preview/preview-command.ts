import { Command } from 'ckeditor5';

export class PreviewCommand extends Command {
    override execute() {
        const editor = this.editor;
        const data = editor.getData();
        
        // Create a new window for preview
        const previewWindow = window.open('', '_blank');
        if (!previewWindow) {
            console.warn('Failed to open preview window');
            return;
        }

        // Write the content to the preview window
        previewWindow.document.open();
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Preview</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        font-size: 12pt;
                        line-height: 1.5;
                        margin: 20mm;
                    }
                    img, table {
                        max-width: 100%;
                        height: auto;
                    }
                    h1, h2, h3, h4, h5, h6 {
                        margin-top: 1em;
                        margin-bottom: 0.5em;
                    }
                    p {
                        margin: 1em 0;
                    }
                </style>
            </head>
            <body>
                ${data}
            </body>
            </html>
        `);
        previewWindow.document.close();
    }

    override refresh() {
        // Preview is always enabled when there is content
        this.isEnabled = true;
    }
}