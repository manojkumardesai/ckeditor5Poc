import { Plugin, ButtonView } from 'ckeditor5';
import { PasteCommand } from './paste-command';

export class PastePlugin extends Plugin {
    static get pluginName() {
        return 'Paste';
    }

    static get requires() {
        return ['ClipboardPipeline'];
    }

    init() {
        const editor = this.editor;

        // Register the paste command
        editor.commands.add('paste', new PasteCommand(editor));

        // Add UI component with CKEditor 4 style icon
        editor.ui.componentFactory.add('paste', locale => {
            const button = new ButtonView(locale);
            const command = editor.commands.get('paste')!;

            button.set({
                label: 'Paste',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',
                tooltip: true,
                class: 'ck-button-paste'
            });

            button.bind('isEnabled').to(command);

            this.listenTo(button, 'execute', () => {
                editor.execute('paste');
                editor.editing.view.focus();
            });

            return button;
        });
    }
}