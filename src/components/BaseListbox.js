import {Listbox, Transition} from "@headlessui/react"
import {HiChevronDown} from "react-icons/hi";
import {BsFlag, BsSortUp, BsSortDown, BsPinAngle, BsArrowRightSquare, BsTrash} from "react-icons/bs";
import {useEffect, useState} from "react";

const icons = {
    "BsFlag": BsFlag,
    "BsSortUp": BsSortUp,
    "BsSortDown": BsSortDown,
    "BsPinAngle": BsPinAngle,
    "BsArrowRightSquare": BsArrowRightSquare,
    "BsTrash": BsTrash
}

export const PostIcon = (props) => {
    const Icon = icons[props.iconName];
    return <Icon className={props.css}/>
}

export default function BaseListbox({disabled, placement, ...props}) {

    const [items, setItems] = useState(props.items)
    const [selected, setSelected] = useState(props.selected)

    const onChange = (value) => {
        setSelected(value)
        props.onChange(value)
    }

    useEffect(() => {
        setSelected(props.selected)
        setItems(props.items)
    }, [props.selected, props.items])

    return (

        <Listbox value={selected} onChange={onChange} disabled={!!disabled} >
            <Listbox.Button className={`${disabled?"hover:cursor-not-allowed":""} z-50 py-1 px-2 rounded flex items-center w-full justify-start text-left hover:bg-neutral-100`}>

                {selected && selected.icon ?
                    <div className={'mr-2'}><PostIcon iconName={selected.icon} css={selected.css}/></div>
                    : ""}

                {selected && selected.color ? <div style={{
                    backgroundColor: selected.color
                }} className={'rounded-full h-2 w-2 mr-2'}/> : ""}

                <div className={'text-sm flex-grow text-neutral-500 whitespace-nowrap'}>{selected ? selected.name : ""}</div>
                <HiChevronDown className={''}/>

            </Listbox.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0">
                <Listbox.Options className={`bg-white absolute ${placement?placement:""} right-0 mt-2 min-w-fit w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                    <div className="px-1 py-1 ">
                        {items.map((item, index) => (

                            <Listbox.Option as={"div"} className={``} value={item} key={item.id}>
                                {({active}) => (
                                    <button className={`${active ? 'bg-hov' : ''} text-neutral-500 group flex w-full items-center rounded-md px-2 py-2 text-sm`}>

                                        {item.color ?
                                            <div style={{
                                                backgroundColor: item.color
                                            }} className={'rounded-full h-2 w-2 mr-2'}/>
                                            : ""}

                                        {item.icon ?
                                            <div className={'mr-2'}><PostIcon iconName={item.icon} css={item.css}/>
                                            </div>
                                            : ""}

                                        <div className={'whitespace-nowrap'}>{item.name}</div>

                                    </button>
                                )}
                            </Listbox.Option>
                        ))}
                    </div>
                </Listbox.Options>
            </Transition>
        </Listbox>
    )
}
