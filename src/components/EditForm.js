import { useCallback, useMemo } from 'react'
import { Slate, Editable, withReact } from 'slate-react'
import {
    Transforms,
    createEditor,
    Node,
    Element as SlateElement,
} from 'slate'

const withLayout = editor => {
    const { normalizeNode } = editor

    editor.normalizeNode = ([node, path]) => {

        if (path.length === 0) {
            if (editor.children.length < 1) {
                const title = {
                    type: 'title',
                    children: [{ text: 'Untitled' }],
                }
                Transforms.insertNodes(editor, title, { at: path.concat(0) })
            }

            if (editor.children.length < 2) {
                const paragraph = {
                    type: 'paragraph',
                    children: [{ text: '' }],
                }
                Transforms.insertNodes(editor, paragraph, { at: path.concat(1) })
            }

            for (const [child, childPath] of Node.children(editor, path)) {
                let type
                const slateIndex = childPath[0]
                const enforceType = type => {
                    if (SlateElement.isElement(child) && child.type !== type) {
                        const newProperties = { type }
                        Transforms.setNodes(editor, newProperties, {
                            at: childPath,
                        })
                    }
                }
                switch (slateIndex) {
                    case 0:
                        type = 'title'
                        enforceType(type)
                        break
                    case 1:
                        type = 'paragraph'
                        enforceType(type)
                    default:
                        break
                }
            }
        }

        return normalizeNode([node, path])
    }

    return editor
}

const ForcedLayoutExample = (props) => {
    const renderElement = useCallback(props => <Element {...props} />, [])
    const editor = useMemo(
        () => withLayout(withReact(createEditor())),
        []
    )
    return (
        <Slate editor={editor} value={initialValue}>
            <Editable
                renderElement={renderElement}
                placeholder="Enter a title…"
                spellCheck
                autoFocus
            />
        </Slate>
    )
}

const Element = ({ attributes, children, element }) => {
    switch (element.type) {
        case 'title':
            return <h2 {...attributes}>{children}</h2>
        case 'paragraph':
            return <p {...attributes}>{children}</p>
    }
}

const initialValue= [
    {
        type: 'title',
        children: [{ text: 'Enforce Your Layout!' }],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    'This example shows how to enforce your layout with domain-specific constraints. This document will always have a title block at the top and at least one paragraph in the body. Try deleting them and see what happens!',
            },
        ],
    },
    {
        type: 'paragraph',
        children: [
            {
                text:
                    'This example shows how to enforce your layout with domain-specific constraints. This document will always have a title block at the top and at least one paragraph in the body. Try deleting them and see what happens!',
            },
        ],
    },
]

export default ForcedLayoutExample