import ExampleTheme from "./themes/ExampleTheme";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {TRANSFORMERS} from "@lexical/markdown";

import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import AutoLinkPlugin from "./plugins/AutoLinkPlugin";
import {$createParagraphNode, $getRoot, $getSelection} from "lexical";
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";

function Placeholder() {
    return <div className="editor-placeholder">Enter some text...</div>;
}

const editorConfig = {
    // The editor theme
    theme: ExampleTheme,
    // Handling of errors during update
    onError(error) {
        throw error;
    },
    // Any custom nodes go here
    nodes: [
        ListNode,
        ListItemNode,
        AutoLinkNode,
        LinkNode
    ],
    // editorState: props.initial
};
// This is some crazy shit
// Item 1
// item 2
// item 3
// https://github.com/facebook/lexical#working-with-lexical
export default function Editor(props) {

    return (

        <LexicalComposer initialConfig={{
            editorState: props.initial,
            nodes: [
                HeadingNode,
                ListNode,
                ListItemNode,
                QuoteNode,
                CodeNode,
                CodeHighlightNode,
                TableNode,
                TableCellNode,
                TableRowNode,
                AutoLinkNode,
                LinkNode
            ],
        }}>
            <div className="editor-container prose">
                {/*<ToolbarPlugin />*/}
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input  focus:ring-0"/>}
                        placeholder={<Placeholder/>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    {/*<HistoryPlugin />*/}
                    {/*<TreeViewPlugin />*/}
                    <AutoFocusPlugin/>
                    <OnChangePlugin onChange={props.onChange}/>
                    {/*<CodeHighlightPlugin />*/}
                    <ListPlugin/>
                    <LinkPlugin/>
                    <AutoLinkPlugin/>
                    {/*<ListMaxIndentLevelPlugin maxDepth={7} />*/}
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
                </div>
            </div>
        </LexicalComposer>
    );
}
