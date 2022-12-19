import ExampleTheme from "./themes/ExampleTheme";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {AutoFocusPlugin} from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
// import ToolbarPlugin from "./plugins/ToolbarPlugin";
import {HeadingNode, QuoteNode} from "@lexical/rich-text";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {ListItemNode, ListNode} from "@lexical/list";
import {CodeHighlightNode, CodeNode} from "@lexical/code";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import {ListPlugin} from "@lexical/react/LexicalListPlugin";
import {MarkdownShortcutPlugin} from "@lexical/react/LexicalMarkdownShortcutPlugin";
import {TRANSFORMERS} from "@lexical/markdown";
import {CheckListPlugin} from "@lexical/react/LexicalCheckListPlugin";


import AutoLinkPlugin from "./plugins/AutoLinkPlugin";

import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin";
import ToolbarPlugin from "./plugins/ListToolbar";

import {BsTextLeft} from "react-icons/bs";
import {useEffect} from "react";
import LexicalComposerContext from "@lexical/react/LexicalComposerContext";

function Placeholder() {
    return (
        <div className="editor-placeholder flex items-center space-x-2">
            <div><BsTextLeft/></div>
            <div>Description</div>
        </div>
    )
}

const listTheme = {
    ltr: "ltr",
    rtl: "rtl",
    placeholder: "editor-placeholder",
    paragraph: "editor-paragraph",
    list: {
        listitem: "PlaygroundEditorTheme__listItem",
        listitemChecked: "PlaygroundEditorTheme__listItemChecked",
        listitemUnchecked: "PlaygroundEditorTheme__listItemUnchecked",
        nested: {
            listitem: "PlaygroundEditorTheme__nestedListItem"
        },
        olDepth: [
            "PlaygroundEditorTheme__ol1",
            "PlaygroundEditorTheme__ol2",
            "PlaygroundEditorTheme__ol3",
            "PlaygroundEditorTheme__ol4",
            "PlaygroundEditorTheme__ol5"
        ],
        ul: "PlaygroundEditorTheme__ul"
    }
};


export default function Editor(props) {

    const empty = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
    // const [editor] = LexicalComposerContext.useLexicalComposerContext();

    return (

        <LexicalComposer initialConfig={{
            theme: listTheme,
            editorState: props.initial ? props.initial : empty,
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
            <div className="editor-container">
                <ToolbarPlugin/>
                <div className="editor-inner">
                    <RichTextPlugin
                        contentEditable={<ContentEditable className="editor-input"/>}
                        placeholder={<Placeholder/>}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    {/*<HistoryPlugin />*/}
                    {/*<TreeViewPlugin />*/}
                    {/*<AutoFocusPlugin/>*/}
                    <OnChangePlugin onChange={props.onTextChange}/>
                    {/*<CodeHighlightPlugin />*/}
                    <ListPlugin/>
                    <LinkPlugin/>
                    <AutoLinkPlugin/>
                    <CheckListPlugin/>
                    {/*<ListMaxIndentLevelPlugin maxDepth={7} />*/}
                    <MarkdownShortcutPlugin transformers={TRANSFORMERS}/>
                </div>
            </div>
        </LexicalComposer>
    );
}
