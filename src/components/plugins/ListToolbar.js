import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useState } from "react";

import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    INSERT_CHECK_LIST_COMMAND,
    REMOVE_LIST_COMMAND
} from "@lexical/list";

import * as React from "react";
import {BsListCheck} from "react-icons/bs";

const blockTypeToBlockName = {
    bullet: "Bulleted List",
    number: "Numbered List",
    check: "Check List",
    paragraph: "Normal"
};

export default function ToolbarPlugin(){
    const [editor] = useLexicalComposerContext();
    const [blockType, setBlockType] = useState(
        "paragraph"
    );

    const formatList = (listType) => {
        if (listType === "number" && blockType !== "number") {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            setBlockType("number");
        } else if (listType === "bullet" && blockType !== "bullet") {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            setBlockType("bullet");
        } else if (listType === "check" && blockType !== "check") {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
            setBlockType("check");
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
            setBlockType("paragraph");
        }
    };

    return (
        <div className="flex justify-end">
            {/*<button*/}
            {/*    disabled={false}*/}
            {/*    className={"toolbar-item spaced"}*/}
            {/*    onClick={() => formatList("bullet")}*/}
            {/*>*/}
            {/*    <span className="text">Bullet List</span>*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    disabled={false}*/}
            {/*    className={"toolbar-item spaced"}*/}
            {/*    onClick={() => formatList("number")}*/}
            {/*>*/}
            {/*    <span className="text">Numbered List</span>*/}
            {/*</button>*/}
            <button
                disabled={false}
                className={""}
                onClick={() => formatList("check")}
            >
                <span ><BsListCheck className="hover:bg-gray-200 w-8 h-8 rounded p-1 text-gray-500"/></span>
            </button>
        </div>
    );
}
