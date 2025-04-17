/**
 * This configuration was generated using the CKEditor 5 Builder. You can modify it anytime using this link:
 * https://ckeditor.com/ckeditor-5/builder/#installation/NoBgNARATAdALDEFIGYDsBOAbJjBWTKEOLPONOfPA/ARjgA4RsUSHascpkIBTAO2QowwWmHDgxYkAF1IWBnFoAjehBlA
 */

import { ChangeDetectorRef, Component, ViewEncapsulation, type AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
	type EditorConfig,
	DecoupledEditor,
	Plugin,
	Autoformat,
	Autosave,
	Emoji,
	Essentials,
	FindAndReplace,
	Fullscreen,
	ImageEditing,
	ImageUtils,
	Mention,
	Paragraph,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	TextTransformation,
	ButtonView,
	Command
} from 'ckeditor5';
import {
	CaseChange,
	Comments,
	FormatPainter,
	MergeFields,
	SlashCommand,
	Template,
	TrackChanges,
	TrackChangesData,
	TrackChangesPreview
} from 'ckeditor5-premium-features';

const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDU3OTgzOTksImp0aSI6IjFkZDJhMzY2LTllMTYtNDU0MS04ZTFmLWRiYzc4Yjk1MDNmZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjRmZjExZGYwIn0.9toW96DDJOi13kZMM7dfcX84u3LzzbkIcwRRavpDTZKf8Bim_Iz4BKG_Hf1GvTogsTOWXWRkBAETNAB4UjezmA';

/**
 * The `UsersIntegration` lets you manage user data and permissions.
 *
 * This is an essential feature when many users work on the same document.
 *
 * To read more about it, visit the CKEditor 5 documentation: https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/users.html.
 */
class UsersIntegration extends Plugin {
	static get requires() {
		return ['Users'];
	}

	static get pluginName() {
		return 'UsersIntegration';
	}

	init() {
		const usersPlugin = this.editor.plugins.get('Users');

		// These are sample users for demonstration purposes.
		// In your integration make sure to provide user data from your data source.
		const users = [
			{ id: 'user-1', name: 'varsh Croce' },
			{ id: 'user-2', name: 'Mex Haddox' }
		];
		const me = users[0];

		for (const user of users) {
			usersPlugin.addUser(user);
		}

		usersPlugin.defineMe(me.id);
	}
}

/**
 * The `CommentsIntegration` lets you synchronize comments in the document with your data source (e.g. a database).
 *
 * To read more about it, visit the CKEditor 5 documentation: https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/comments/comments-integration.html.
 */
class CommentsIntegration extends Plugin {
    static get requires() {
        return ['CommentsRepository'];
    }

    static get pluginName() {
        return 'CommentsIntegration';
    }

    init() {
        const editor = this.editor;
        const commentsRepository = editor.plugins.get('CommentsRepository');
        const usersPlugin = editor.plugins.get('Users');
        
        if (!usersPlugin || !usersPlugin.me) {
            console.warn('Users plugin or current user not initialized');
            return;
        }

        // Load existing comments from localStorage
        const savedComments = localStorage.getItem('editorComments');
        if (savedComments) {
            const comments = JSON.parse(savedComments);
            comments.forEach((commentThread: any) => {
                commentsRepository.addCommentThread(commentThread);
            });
        }

        // Set up adapter to save comments when they change
        commentsRepository.adapter = {
            getCommentThread(threadId) {
                const savedComments = localStorage.getItem('editorComments');
                const threads = savedComments ? JSON.parse(savedComments) : [];
                return Promise.resolve(threads.find((thread: any) => thread.threadId === threadId));
            },
            addComment(data) {
                const commentId = `comment-${Date.now()}`;
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve({ 
                    commentId,
                    createdAt: new Date()
                });
            },
            updateComment(data) {
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve();
            },
            removeComment(data) {
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve();
            },
            addCommentThread(data) {
                const threadId = `thread-${Date.now()}`;
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve({
                    threadId,
                    comments: data.comments.map(comment => ({
                        commentId: `comment-${Date.now()}-${Math.random()}`,
                        createdAt: new Date()
                    }))
                });
            },
            updateCommentThread(data) {
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve();
            },
            removeCommentThread(data) {
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve();
            },
            resolveCommentThread(data) {
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve({
                    threadId: data.threadId,
                    resolvedAt: new Date(),
                    resolvedBy: usersPlugin.me?.id || 'unknown'
                });
            },
            reopenCommentThread(data) {
                const comments = commentsRepository.getCommentThreads();
                localStorage.setItem('editorComments', JSON.stringify(Array.from(comments)));
                return Promise.resolve();
            }
        };
    }
}

/**
 * The `TrackChangesIntegration` lets you synchronize suggestions added to the document with your data source (e.g. a database).
 *
 * To read more about it, visit the CKEditor 5 documentation: https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/track-changes/track-changes-integration.html.
 */
class TrackChangesIntegration extends Plugin {
    static get requires() {
        return ['TrackChanges'];
    }

    static get pluginName() {
        return 'TrackChangesIntegration';
    }

    init() {
        const editor = this.editor;
        const trackChanges = editor.plugins.get('TrackChanges');
        const usersPlugin = editor.plugins.get('Users');
        
        if (!trackChanges || !usersPlugin || !usersPlugin.me) {
            console.warn('TrackChanges plugin, Users plugin, or current user not initialized');
            return;
        }

        // Load existing suggestions from localStorage
        const savedSuggestions = localStorage.getItem('editorSuggestions');
        if (savedSuggestions) {
            const suggestions = JSON.parse(savedSuggestions);
            suggestions.forEach((suggestion: any) => {
                trackChanges.addSuggestion(suggestion);
            });
        }

        // Set up adapter to save suggestions when they change
        trackChanges.adapter = {
            getSuggestion(id: string) {
                const savedSuggestions = localStorage.getItem('editorSuggestions');
                const suggestions = savedSuggestions ? JSON.parse(savedSuggestions) : [];
                const suggestion = suggestions.find((s: any) => s.id === id);
                return Promise.resolve(suggestion);
            },
            addSuggestion(suggestionData) {
                const suggestions = trackChanges.getSuggestions();
                localStorage.setItem('editorSuggestions', JSON.stringify(Array.from(suggestions)));
                return Promise.resolve({
                    ...suggestionData,
                    authorId: usersPlugin.me!.id,
                    createdAt: new Date()
                });
            },
            updateSuggestion(id: string, suggestionData) {
                const suggestions = trackChanges.getSuggestions();
                localStorage.setItem('editorSuggestions', JSON.stringify(Array.from(suggestions)));
                return Promise.resolve();
            }
        };
    }
}

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, CKEditorModule],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
	@ViewChild('editorToolbarElement') private editorToolbar!: ElementRef<HTMLDivElement>;
	@ViewChild('editorMenuBarElement') private editorMenuBar!: ElementRef<HTMLDivElement>;
	// @ViewChild('editorAnnotationsElement') private editorAnnotations!: ElementRef<HTMLDivElement>;

	constructor(private changeDetector: ChangeDetectorRef) {}

	public isLayoutReady = false;
	public Editor = DecoupledEditor;
	public config: EditorConfig = {}; // CKEditor needs the DOM tree before calculating the configuration.
	public ngAfterViewInit(): void {
		const savedContent = localStorage.getItem('editorContent');
		
		this.config = {
			toolbar: {
				items: [
					'fullscreen',
					'undo', 'redo',
					'|',
					'selectAll', 'cut', 'paste', 'print',
					'|',
					'heading',
					'|',
					'bold',
					'italic'
				]
			},
			plugins: [
				Autoformat,
				Autosave,
				CaseChange,
				Comments,
				Emoji,
				Essentials,
				FindAndReplace,
				FormatPainter,
				Fullscreen,
				ImageEditing,
				ImageUtils,
				Mention,
				MergeFields,
				Paragraph,
				SlashCommand,
				SpecialCharacters,
				SpecialCharactersArrows,
				SpecialCharactersCurrency,
				SpecialCharactersEssentials,
				SpecialCharactersLatin,
				SpecialCharactersMathematical,
				SpecialCharactersText,
				TextTransformation,
				TrackChanges,
				TrackChangesData,
				TrackChangesPreview,
				CutPlugin,
				PastePlugin,
				PrintPlugin
			],
			extraPlugins: [UsersIntegration, CommentsIntegration, TrackChangesIntegration],
			htmlSupport: {
				allow: [
					{
						name: /.*/,
						attributes: true,
						classes: true,
						styles: true
					}
				]
			},
			comments: {
				editorConfig: {
					extraPlugins: [Autoformat, Mention],
					mention: {
						feeds: [
							{
								marker: '@',
								feed: [
									/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#comments-with-mentions */
								]
							}
						]
					}
				}
			},
			autosave: {
				waitingTime: 1000,
				save: editor => {
					const data = editor.getData();
					localStorage.setItem('editorContent', data);
					return Promise.resolve();
				}
			},
			initialData: savedContent || this.config.initialData,
			licenseKey: LICENSE_KEY,
			mention: {
				feeds: [
					{
						marker: '@',
						feed: [
							/* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
						]
					}
				]
			},
			mergeFields: {
				/* Read more: https://ckeditor.com/docs/ckeditor5/latest/features/merge-fields.html#configuration */
			},
			placeholder: 'Type or paste your content here!',
			// sidebar: {
			// 	container: this.editorAnnotations.nativeElement
			// },
			template: {
				definitions: [
					{
						title: 'Introduction',
						description: 'Simple introduction to an article',
						icon: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">\n    <g id="icons/article-image-right">\n        <rect id="icon-bg" width="45" height="45" rx="2" fill="#A5E7EB"/>\n        <g id="page" filter="url(#filter0_d_1_507)">\n            <path d="M9 41H36V12L28 5H9V41Z" fill="white"/>\n            <path d="M35.25 12.3403V40.25H9.75V5.75H27.7182L35.25 12.3403Z" stroke="#333333" stroke-width="1.5"/>\n        </g>\n        <g id="image">\n            <path id="Rectangle 22" d="M21.5 23C21.5 22.1716 22.1716 21.5 23 21.5H31C31.8284 21.5 32.5 22.1716 32.5 23V29C32.5 29.8284 31.8284 30.5 31 30.5H23C22.1716 30.5 21.5 29.8284 21.5 29V23Z" fill="#B6E3FC" stroke="#333333"/>\n            <path id="Vector 1" d="M24.1184 27.8255C23.9404 27.7499 23.7347 27.7838 23.5904 27.9125L21.6673 29.6268C21.5124 29.7648 21.4589 29.9842 21.5328 30.178C21.6066 30.3719 21.7925 30.5 22 30.5H32C32.2761 30.5 32.5 30.2761 32.5 30V27.7143C32.5 27.5717 32.4391 27.4359 32.3327 27.3411L30.4096 25.6268C30.2125 25.451 29.9127 25.4589 29.7251 25.6448L26.5019 28.8372L24.1184 27.8255Z" fill="#44D500" stroke="#333333" stroke-linejoin="round"/>\n            <circle id="Ellipse 1" cx="26" cy="25" r="1.5" fill="#FFD12D" stroke="#333333"/>\n        </g>\n        <rect id="Rectangle 23" x="13" y="13" width="12" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 24" x="13" y="17" width="19" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 25" x="13" y="21" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 26" x="13" y="25" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 27" x="13" y="29" width="6" height="2" rx="1" fill="#B4B4B4"/>\n        <rect id="Rectangle 28" x="13" y="33" width="16" height="2" rx="1" fill="#B4B4B4"/>\n    </g>\n    <defs>\n        <filter id="filter0_d_1_507" x="9" y="5" width="28" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">\n            <feFlood flood-opacity="0" result="BackgroundImageFix"/>\n            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>\n            <feOffset dx="1" dy="1"/>\n            <feComposite in2="hardAlpha" operator="out"/>\n            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/>\n            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_507"/>\n            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_507" result="shape"/>\n        </filter>\n    </defs>\n</svg>\n',
						data: "<h2>Introduction</h2><p>In today's fast-paced world, keeping up with the latest trends and insights is essential for both personal growth and professional development. This article aims to shed light on a topic that resonates with many, providing valuable information and actionable advice. Whether you're seeking to enhance your knowledge, improve your skills, or simply stay informed, our comprehensive analysis offers a deep dive into the subject matter, designed to empower and inspire our readers.</p>"
					}
				]
			}
		};

		this.isLayoutReady = true;
		this.changeDetector.detectChanges();
	}

	public onReady(editor: DecoupledEditor): void {
		Array.from(this.editorToolbar.nativeElement.children).forEach(child => child.remove());
		Array.from(this.editorMenuBar.nativeElement.children).forEach(child => child.remove());

		this.editorToolbar.nativeElement.appendChild(editor.ui.view.toolbar.element!);
		this.editorMenuBar.nativeElement.appendChild(editor.ui.view.menuBarView.element!);

		// Set up content change handling
		editor.model.document.on('change:data', () => {
			const data = editor.getData();
			localStorage.setItem('editorContent', data);
		});
	}
}

function ClipboarfButtons(editor: DecoupledEditor) {
	addButton('cut', 'Cut');
	addButton('paste', 'Paste');

	function addButton(action: string, label: string) {
		editor.ui.componentFactory.add(action, locale => {
			const view = new ButtonView(locale);

			view.set({
				label,
				icon: '',
				tooltip: true
			})
			view.on('execute', () => {
				editor.execute(action);
				editor.editing.view.focus();
			});
			return view;
		});
	}
}

class CutCommand extends Command {
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

class CutPlugin extends Plugin {
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

        // Add UI component with properly sized icon
        editor.ui.componentFactory.add('cut', locale => {
            const button = new ButtonView(locale);
            const command = editor.commands.get('cut')!;

            button.set({
                label: 'Cut',
                icon: 
				// '<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm7-3l-4-4 4-4 .7.7-3.3 3.3 3.3 3.3-.7.7z M14.2 11l-4-4 4-4 .7.7-3.3 3.3 3.3 3.3-.7.7z M6.5 11C5.1 11 4 12.1 4 13.5S5.1 16 6.5 16 9 14.9 9 13.5 7.9 11 6.5 11z"/></svg>',
                '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0z" fill="none"/><circle cx="6" cy="18" fill="none" r="2"/><circle cx="12" cy="12" fill="none" r=".5"/><circle cx="6" cy="6" fill="none" r="2"/><path d="M9.64 7.64c.23-.5.36-1.05.36-1.64 0-2.21-1.79-4-4-4S2 3.79 2 6s1.79 4 4 4c.59 0 1.14-.13 1.64-.36L10 12l-2.36 2.36C7.14 14.13 6.59 14 6 14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4c0-.59-.13-1.14-.36-1.64L12 14l7 7h3v-1L9.64 7.64zM6 8c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm0 12c-1.1 0-2-.89-2-2s.9-2 2-2 2 .89 2 2-.9 2-2 2zm6-7.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zM19 3l-6 6 2 2 7-7V3z"/></svg>',
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

class PasteCommand extends Command {
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

class PastePlugin extends Plugin {
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
                icon:
                '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/></svg>',
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

class PrintCommand extends Command {
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

class PrintPlugin extends Plugin {
    static get pluginName() {
        return 'Print';
    }

    init() {
        const editor = this.editor;

        // Register the print command
        editor.commands.add('print', new PrintCommand(editor));

        // Add UI component with print icon
        editor.ui.componentFactory.add('print', locale => {
            const button = new ButtonView(locale);
            const command = editor.commands.get('print')!;

            button.set({
                label: 'Print',
                icon: 
				'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#e3e3e3"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>',
				tooltip: true,
                class: 'ck-button-print'
            });

            button.bind('isEnabled').to(command);

            this.listenTo(button, 'execute', () => {
                editor.execute('print');
                editor.editing.view.focus();
            });

            return button;
        });
    }
}