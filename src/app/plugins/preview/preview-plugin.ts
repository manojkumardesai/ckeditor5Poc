import { Plugin, ButtonView } from 'ckeditor5';
import { PreviewCommand } from './preview-command';

export class PreviewPlugin extends Plugin {
    static get pluginName() {
        return 'Preview';
    }

    init() {
        const editor = this.editor;

        // Register the preview command
        editor.commands.add('preview', new PreviewCommand(editor));

        // Add UI component with preview icon
        editor.ui.componentFactory.add('preview', locale => {
            const button = new ButtonView(locale);
            const command = editor.commands.get('preview')!;

            button.set({
                label: 'Preview',
                icon: 
                '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 19.59V8l-6-6H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c.45 0 .85-.15 1.19-.4l-4.43-4.43c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L20 19.59zM9 13c0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3-3 1.34-3 3z"/></svg>',
                tooltip: true,
                class: 'ck-button-preview'
            });

            button.bind('isEnabled').to(command);

            this.listenTo(button, 'execute', () => {
                editor.execute('preview');
                editor.editing.view.focus();
            });

            return button;
        });
    }
}