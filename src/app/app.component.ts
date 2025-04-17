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
    TextTransformation
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

import { CutPlugin } from './plugins/cut/cut-plugin';
import { PastePlugin } from './plugins/paste/paste-plugin';
import { PrintPlugin } from './plugins/print/print-plugin';
import { PreviewPlugin } from './plugins/preview/preview-plugin';

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

        const savedComments = localStorage.getItem('editorComments');
        if (savedComments) {
            const comments = JSON.parse(savedComments);
            comments.forEach((commentThread: any) => {
                commentsRepository.addCommentThread(commentThread);
            });
        }

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

        const savedSuggestions = localStorage.getItem('editorSuggestions');
        if (savedSuggestions) {
            const suggestions = JSON.parse(savedSuggestions);
            suggestions.forEach((suggestion: any) => {
                trackChanges.addSuggestion(suggestion);
            });
        }

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

    constructor(private changeDetector: ChangeDetectorRef) {}

    public isLayoutReady = false;
    public Editor = DecoupledEditor;
    public config: EditorConfig = {};

    public ngAfterViewInit(): void {
        const savedContent = localStorage.getItem('editorContent');
        
        this.config = {
            toolbar: {
                items: [
					'preview',
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
                PrintPlugin,
				PreviewPlugin
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
                                feed: []
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
                        feed: []
                    }
                ]
            },
            mergeFields: {},
            placeholder: 'Type or paste your content here!',
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

        editor.model.document.on('change:data', () => {
            const data = editor.getData();
            localStorage.setItem('editorContent', data);
        });
    }
}