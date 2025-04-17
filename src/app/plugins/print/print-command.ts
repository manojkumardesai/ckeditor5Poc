import { Command } from 'ckeditor5';

export class PrintCommand extends Command {
    override execute() {
        const editor = this.editor;
        const data = editor.getData();
        
        // Create an iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Write the content to the iframe
        const iframeDoc = iframe.contentWindow?.document;
        if (!iframeDoc) {
            console.warn('Failed to access iframe document');
            return;
        }

        // Setup print document with styles
        iframeDoc.open();
        iframeDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Print</title>
                <style>
                    @media print {
                        body {
                            font-family: Arial, sans-serif;
                            font-size: 12pt;
                            line-height: 1.5;
                            margin: 20mm;
                        }
                        @page {
                            margin: 20mm;
                        }
                        img, table {
                            page-break-inside: avoid;
                        }
                        h1, h2, h3, h4, h5, h6 {
                            page-break-after: avoid;
                        }
                        p {
                            orphans: 3;
                            widows: 3;
                        }
                    }
                </style>
            </head>
            <body>
                ${data}
            </body>
            </html>
        `);
        iframeDoc.close();

        // Wait for images to load before printing
        setTimeout(() => {
            try {
                iframe.contentWindow?.print();
                // Remove the iframe after printing
                setTimeout(() => {
                    document.body.removeChild(iframe);
                }, 100);
            } catch (err) {
                console.error('Failed to print:', err);
                document.body.removeChild(iframe);
            }
        }, 250);
    }

    override refresh() {
        // Print is always enabled when there is content
        this.isEnabled = true;
    }
}