import {Listbox} from "@headlessui/react"
import {HiChevronDown, HiLogout} from "react-icons/hi";
import {
    BsCalendar,
    BsRecycle,
    BsFlag,
    BsSortUp,
    BsSortDown,
    BsPinAngle,
    BsArrowRightSquare,
    BsTrash, BsPencil, BsShare, BsCheckSquare, BsListNested
} from "react-icons/bs";
import {useEffect, useState} from "react";
import {VscSettingsGear, VscSync} from "react-icons/vsc";

const icons = {
    "BsFlag": BsFlag,
    "BsSortUp": BsSortUp,
    "BsSortDown": BsSortDown,
    "BsPinAngle": BsPinAngle,
    "BsArrowRightSquare": BsArrowRightSquare,
    "BsTrash": BsTrash,
    "BsRecycle": BsRecycle,
    "BsCalendar": BsCalendar,
    "VscSync": VscSync,
    "VscSettingsGear": VscSettingsGear,
    "HiLogout": HiLogout,
    "BsPencil": BsPencil,
    "BsShare": BsShare,
    "BsCheckSquare": BsCheckSquare,
    "BsListNested": BsListNested

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
        if(value.action) {
            value.action()
        }
    }

    useEffect(() => {
        setSelected(props.selected)
        setItems(props.items)
    }, [props.selected, props.items])

    return (

        <div className={'z-50'}>
            <Listbox as={'div'} className={'z-50'} value={selected} onChange={onChange} disabled={!!disabled}>
                <Listbox.Button className={`${disabled ? "hover:cursor-not-allowed" : ""} z-50 py-1 px-2 rounded flex items-center w-full justify-start text-left hover:bg-neutral-100 dark:hover:bg-gray-700`}>

                    {selected && selected.icon ?
                        <div className={'mr-2'}><PostIcon iconName={selected.icon} css={selected.css}/></div>
                        : ""}

                    {selected && selected.color ? <div style={{
                        backgroundColor: selected.color
                    }} className={'rounded-full h-2 w-2 mr-2'}/> : ""}

                    <div className={'text-sm flex-grow text-neutral-500 dark:text-neutral-300  whitespace-nowrap'}>{selected ? selected.name : ""}</div>
                    <HiChevronDown className={''}/>

                </Listbox.Button>

                <Listbox.Options className={`${placement ? placement : "right-0_"}  z-50 absolute mt-1 w-fit _w-44 max-h-72 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm`}>

                    {items.map((item, index) => (

                        <Listbox.Option value={item} key={item.id} className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-10 ${active ? 'bg-hov dark:bg-gray-600' : ''} text-neutral-600 dark:text-neutral-300`}>
                            {({active}) => (
                                <button className={`block truncate font-normal`}>
                                    <div className={'flex items-center space-x-3'}>
                                        {item.color ?
                                            <div style={{
                                                backgroundColor: item.color
                                            }} className={'rounded-full h-2 w-2 mr-2_'}/>
                                            : ""}
                                        {item.icon ?
                                            <div>
                                                <PostIcon iconName={item.icon} css={item.css}/>
                                            </div>
                                            : ""}
                                        <div className={'whitespace-nowrap dark:text-neutral-300'}>{item.name}</div>
                                    </div>
                                </button>
                            )}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>

    )
}
