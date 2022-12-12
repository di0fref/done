import {useCallback} from "react";
import {
    EditorComponent,
    Remirror,
    useActive,
    useCommands,
    useHelpers,
    useKeymap,
    useRemirror,
} from '@remirror/react';

const saveToBackend = (data) => {
    console.log(data)
}

const hooks = [
    () => {
        const { getJSON } = useHelpers();

        const onSave = useCallback(
            (props) => {
                const { state } = props;
                saveToBackend(getJSON(state));

                return true; // Prevents any further key handlers from being run.
            },
            [getJSON],
        );

        // "Mod" means platform agnostic modifier key - i.e. Ctrl on Windows, or Cmd on MacOS
        useKeymap('Mod-s', onSave);
    },
];
export default function Editor(){
    const { manager, state } = useRemirror({ extensions: () => [] });

    // The editor is built up like lego blocks of functionality within the editor
    // provider.
    return (
        <Remirror manager={manager} initialContent={state} hooks={hooks}>
            <EditorComponent />
        </Remirror>
    )
}
