import {Popover, Menu, Listbox, Transition} from "@headlessui/react"
import {
    BsList,
    BsSunFill, BsSunriseFill
} from "react-icons/bs";
import {useState} from "react";
import BaseListbox, {PostIcon} from "./BaseListbox";
import {Tooltip} from "react-tooltip";
import {useDispatch, useSelector} from "react-redux";
import {updateTask} from "../redux/taskSlice";
import {format} from "date-fns";
import DatePickerIcon from "./DatePickerIcon";


export default function CardMenu({disabled, card, ...props}) {


    const projects = useSelector(state => state.projects)
    const _project_ = useSelector(state => state.projects.find(
        project => card ? (card.project_id === project.id) : null
    ))

    const [project, setProject] = useState(_project_);

    const pin = () => {
        console.log("pin")
    }
    const restore = () => {
        dispatch(updateTask({
            id: card.id,
            deleted: 0
        }))
    }
    const trash = (e) => {
        dispatch(updateTask({
            id: card.id,
            deleted: 1
        }))
    }

    const [items, setItems] = useState(
        [
            {
                "name": "Pin",
                "id": "pin",
                "icon": "BsPinAngle",
                "action": pin,
                "disabled": disabled
            },
            {
                "name": "Delete",
                "id": "delete",
                "icon": "BsTrash",
                "action": trash,
                "disabled": disabled
            },
        ]
    )

    const [disabledItems, setDisabledItems] = useState([
        {
            "name": "Restore",
            "id": "restore",
            "icon": "BsTrash",
            "action": restore,
            "disabled": disabled
        }
    ])
    const [selected, setSelected] = useState()
    const dispatch = useDispatch()


    const onChange = (value) => {
        setSelected(value)
        props.onChange(value)
    }

    const setDue = (date) => {
        dispatch(updateTask({
            id: card.id,
            due: date ? format(date, "Y-M-dd") : null
        }))
    }
    const setPrio = (prio) => {
        dispatch(updateTask({
            id: card.id,
            prio: prio
        }))
    }

    const onProjectChange = (project) => {
        dispatch(updateTask({
            id: card.id,
            project_id: project.id
        }))
        setProject(project)
    }

    if (disabled) {
        return (

            <Popover as={"div"}>
                {({open}) => (
                    <>
                        <Popover.Button className={'z-50 py-1 px-2 rounded flex items-center w-full justify-start text-left hover:bg-neutral-100'}>

                            <BsList className={'h-5 w-5 text-neutral-500'}/>

                        </Popover.Button>
                        <Transition
                            show={open}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0">
                            <Popover.Panel static={true} className="bg-white absolute right-0 mt-2 min-w-fit w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                {disabledItems.map((item, index) => (
                                    <div className={``} key={item.id + card.id}>
                                        <button onClick={item.action} className={`hover:bg-hov text-neutral-500 group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                            {item.icon ?
                                                <div className={'mr-2'}>
                                                    <PostIcon iconName={item.icon} css={item.css}/>
                                                </div>
                                                : ""}
                                            <div className={'whitespace-nowrap'}>{item.name}</div>
                                        </button>
                                    </div>
                                ))}
                            </Popover.Panel>
                        </Transition>
                    </>
                )}

            </Popover>
        )
    }


    return (

        <Popover as={"div"}>
            {({open}) => (
                <>
                    <Popover.Button className={'z-50 py-1 px-2 rounded flex items-center w-full justify-start text-left hover:bg-neutral-100'}>

                        <BsList className={'h-5 w-5 text-neutral-500'}/>

                    </Popover.Button>
                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0">

                        <Popover.Panel static={true} className="bg-white absolute right-0 mt-2 min-w-fit w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">


                            {({close}) => (

                                <div className="px-1 py-1">
                                    <div className={'p-2 border-b'}>
                                        <div className={'text-neutral-400 text-xs'}>Due date</div>
                                        <div className={'mt-2 text-sm flex items-center justify-between'}>
                                            <div>
                                                <Tooltip anchorId={`today${card.id}`} content={"Today"}/>
                                                <button disabled={disabled} onClick={() => {
                                                    setDue(new Date())
                                                    close()
                                                }} id={`today${card.id}`} className={`${disabled ? "hover:cursor-not-allowed" : ""} hover:bg-hov px-2 py-1 text-neutral-400 hover:text-neutral-600`}>
                                                    <BsSunFill className={'h-5 w-5'}/>
                                                </button>
                                            </div>
                                            <div>
                                                <Tooltip anchorId={`tomorrow${card.id}`} content={"Tomorrow"}/>
                                                <button disabled={disabled} onClick={() => {
                                                    const date = new Date()
                                                    date.setDate(date.getDate() + 1)
                                                    setDue(date)
                                                    close()
                                                }} id={`tomorrow${card.id}`} data-tooltip-content={"Tomorrow"} className={`${disabled ? "hover:cursor-not-allowed" : ""} hover:bg-hov px-2 py-1 text-neutral-400 hover:text-neutral-600`}>
                                                    <BsSunriseFill className={'h-5 w-5'}/>
                                                </button>
                                            </div>
                                            <div>
                                                <Tooltip anchorId={`custom${card.id}`} content={"Custom"}/>
                                                <div disabled={disabled} id={`custom${card.id}`} className={`${disabled ? "hover:cursor-not-allowed" : ""} hover:bg-hov px-2 py-1 text-neutral-400 hover:text-neutral-600`}>
                                                    <DatePickerIcon disabled={disabled} onDateChange={(due) => {
                                                        setDue(due)
                                                        close()
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'p-2 border-b'}>
                                        <div className={'text-neutral-400 text-xs'}>Priority</div>
                                        <div className={'mt-2 text-sm flex items-center justify-between'}>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("low")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} hover:bg-hov px-2 py-1 text-neutral-400 hover:text-neutral-600`}>Low
                                                </button>
                                            </div>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("normal")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} hover:bg-hov px-2 py-1 text-neutral-400 hover:text-neutral-600`}>Normal
                                                </button>
                                            </div>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("high")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} hover:bg-hov px-2 py-1 text-neutral-400 hover:text-neutral-600`}>High
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-1 py-1 ">
                                        <div className={'p-2 border-b'}>
                                            <div className={'text-neutral-400 text-xs'}>Project</div>
                                            <BaseListbox disabled={disabled} placement={"right-40 text-sm"} items={projects} selected={project} onChange={(project) => {
                                                onProjectChange(project)
                                                close()
                                            }}/>
                                        </div>
                                    </div>
                                    <div className={'mt-2'}>
                                        {items.map((item, index) => (
                                            <div className={``} key={item.id + card.id}>
                                                <button disabled={item.disabled} onClick={item.action} className={`${disabled ? "hover:cursor-not-allowed" : ""} hover:bg-hov text-neutral-500 group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                                    {item.icon ?
                                                        <div className={'mr-2'}>
                                                            <PostIcon iconName={item.icon} css={item.css}/>
                                                        </div>
                                                        : ""}
                                                    <div className={'whitespace-nowrap'}>{item.name}</div>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            )}

                        </Popover.Panel>
                    </Transition>
                </>
            )}

        </Popover>
    )
}
