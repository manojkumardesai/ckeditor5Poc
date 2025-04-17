import { Plugin, ButtonView } from 'ckeditor5';
import { CutCommand } from './cut-command';

export class CutPlugin extends Plugin {
    static get pluginName() {
        return 'Cut';
    }

    static get requires() {
        return ['ClipboardPipeline'];
    }

    init() {
        const editor = this.editor;

        // Register the cut command
        editor.commands.add('cut', new CutCommand(editor));

        // Add UI component with icon
        editor.ui.componentFactory.add('cut', locale => {
            const button = new ButtonView(locale);
            const command = editor.commands.get('cut')!;

            button.set({
                label: 'Cut',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0z" fill="none"/><circle cx="6" cy="18" fill="none" r="2"/><circle cx="12" cy="12" fill="none" r=".5"/><circle cx="6" cy="6" fill="none" r="2"/><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"/></svg>',
                tooltip: true,
                class: 'ck-button-cut'
            });

            button.bind('isEnabled').to(command);

            this.listenTo(button, 'execute', () => {
                editor.execute('cut');
                editor.editing.view.focus();
            });

            return button;
        });
    }
}