import {Popover} from "@headlessui/react"
import {
    BsList,
    BsSunFill, BsSunriseFill
} from "react-icons/bs";
import {useEffect, useState} from "react";
import BaseListbox, {PostIcon} from "../BaseListbox";
import {Tooltip} from "react-tooltip";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, updateTask} from "../../redux/taskSlice";
import {format} from "date-fns";
import DatePickerIcon from "../badges/DatePickerIcon";
import {toast} from "react-toastify";
import {formatDate} from "../helper";
import axios from "axios";


export default function CardMenu({disabled, card, ...props}) {


    const projects = useSelector(state => state.projects)
    const _project_ = useSelector(state => state.projects.find(
        project => card ? (card.project_id === project.id) : null
    ))

    const [pinned, setPinned] = useState(card.pinned)

    const [project, setProject] = useState(_project_);

    const [isOpen, setIsOpen] = useState(false)

    const [users, setUsers] = useState([])

    const [assignedUser, setAssignedUser] = useState({
        id: card.assigned_user_id,
        name: card.assigned_user_name
    })

    useEffect(() => {
        /* Load users that can be assigned */
        isOpen && project && axios.get("/projects_users/" + project.id).then(response => {
            setUsers(response.data)
        })
    }, [isOpen])

    const items =
        [
            {
                "name": "Pin",
                "id": "pin",
                "icon": "BsPinAngle",
                "action": () => {
                    setPinned(!pinned)
                    dispatch(updateTask({
                        id: card.id,
                        pinned: !pinned
                    })).unwrap()

                    toast.success("Task " + (pinned ? "pinned" : "unpinned"))
                },
                "disabled": disabled
            },
            {
                "name": "Move to trash",
                "id": "delete",
                "icon": "BsTrash",
                "action": () => {
                    dispatch(updateTask({
                        id: card.id,
                        deleted: 1
                    })).unwrap()

                    toast.success("Task moved to trash")
                },
                "disabled": disabled
            },
        ]


    const disabledItems =
        [
            {
                "name": "Restore",
                "id": "restore",
                "icon": "BsRecycle",
                "action": () => {
                    dispatch(updateTask({
                        id: card.id,
                        deleted: 0
                    })).unwrap()

                    toast.success("Task restored")
                },
                "disabled": disabled,
            },
            {
                "name": "Delete forever",
                "id": "delete",
                "icon": "BsTrash",
                "action": () => {
                    dispatch(deleteTask({
                        id: card.id,
                    })).unwrap()

                    toast.success("Task deleted forever")
                },
                "disabled": disabled,
            }

        ]

    const dispatch = useDispatch()

    const setDue = (date) => {
        dispatch(updateTask({
            id: card.id,
            due: date ? format(date, "Y-MM-dd") : null
        })).unwrap()

        toast.success("Due date set to " + formatDate(date))
    }

    const onUserChange = (user) => {
        dispatch(updateTask({
            id: card.id,
            assigned_user_id: user.user_id
        }))
    }

    const setPrio = (prio) => {
        dispatch(updateTask({
            id: card.id,
            prio: prio
        })).unwrap()

        toast.success("Priority set to " + prio)
    }

    const onProjectChange = (project) => {
        dispatch(updateTask({
            id: card.id,
            project_id: project.id
        })).unwrap()

        toast.success("Task moved to project " + project.name)
        setProject(project)
    }

    if (disabled) {
        return (
            <div className={'relative'}>

                <Popover as={"div"}>
                    {({open}) => (
                        <>
                            <Popover.Button className={'z-50 py-1 px-2 rounded flex items-center w-full justify-start text-left hover:bg-neutral-100 dark:hover:bg-gray-600'}>
                                <BsList className={'h-5 w-5 text-neutral-500 dark:text-gray-400'}/>
                            </Popover.Button>
                            <Popover.Panel className="w-36 z-50 bg-white dark:bg-gray-700 absolute right-0 mt-2 min-w-fit w-full origin-top-right rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                {disabledItems.map((item, index) => (
                                    <div className={``} key={item.id + card.id}>
                                        <button onClick={item.action} className={` dark:hover:bg-gray-600 hover:bg-hov dark:text-neutral-200 text-neutral-500 group flex w-full items-center rounded px-2 py-2 text-sm`}>
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
                        </>
                    )}

                </Popover>
            </div>
        )
    }


    return (
        <div className={'relative'}>
            <Popover as={"div"}>
                {({open}) => {

                    return <>
                        <Popover.Button onClick={() => setIsOpen(!isOpen)} className={'z-50 py-1 px-2 rounded flex items-center w-full justify-start text-left hover:bg-neutral-100 dark:hover:bg-gray-600'}>
                            <BsList className={'h-5 w-5 text-neutral-500 dark:text-gray-400'}/>
                        </Popover.Button>
                        <Popover.Panel className="z-50 bg-white dark:bg-gray-700 absolute right-0 mt-2 origin-top-right rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {({close}) => (

                                <div className="px-1 py-1 w-56">
                                    <div className={'p-2 border-b  dark:border-b-gray-600'}>
                                        <div className={'text-neutral-400 dark:text-neutral-200 text-xs'}>Due date</div>
                                        <div className={'mt-2 text-sm flex items-center justify-between'}>
                                            <div>
                                                <Tooltip anchorId={`today${card.id}`} content={"Today"}/>
                                                <button disabled={disabled} onClick={() => {
                                                    setDue(new Date())
                                                    close()
                                                }} id={`today${card.id}`} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 dark:text-neutral-200 text-neutral-400 hove_r:text-neutral-600`}>
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
                                                }} id={`tomorrow${card.id}`} data-tooltip-content={"Tomorrow"} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 dark:text-neutral-200 text-neutral-400 ho_ver:text-neutral-600`}>
                                                    <BsSunriseFill className={'h-5 w-5'}/>
                                                </button>
                                            </div>
                                            <div>
                                                <Tooltip anchorId={`custom${card.id}`} content={"Custom"}/>
                                                <div disabled={disabled} id={`custom${card.id}`} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 dark:text-neutral-200 text-neutral-400 ho_ver:text-neutral-600`}>
                                                    <DatePickerIcon disabled={disabled} onDateChange={(due) => {
                                                        setDue(due)
                                                        close()
                                                    }}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={'p-2 border-b dark:border-b-gray-600'}>
                                        <div className={'text-neutral-400 dark:text-neutral-200 text-xs'}>Priority</div>
                                        <div className={'mt-2 text-sm flex items-center justify-between'}>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("low")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 text-neutral-400 dark:text-neutral-200 ho_ver:text-neutral-600`}>Low
                                                </button>
                                            </div>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("normal")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600  hover:bg-hov px-2 py-1 text-neutral-400 dark:text-neutral-200 h_over:text-neutral-600`}>Normal
                                                </button>
                                            </div>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("high")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 text-neutral-400 dark:text-neutral-200 ho_ver:text-neutral-600`}>High
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="px-1 py-1 ">
                                        <div className={'p-2 border-b dark:border-b-gray-600'}>
                                            <div className={'dark:text-neutral-200 text-neutral-400 text-xs'}>Assigned
                                                user
                                            </div>
                                            <BaseListbox disabled={disabled} placement={"right-48 text-sm"} items={users} selected={assignedUser}
                                                         onChange={(user) => {
                                                             onUserChange(user)
                                                             close()
                                                         }}/>
                                        </div>
                                    </div>


                                    <div className="px-1 py-1 ">
                                        <div className={'p-2 border-b dark:border-b-gray-600'}>
                                            <div className={'dark:text-neutral-200 text-neutral-400 text-xs'}>Project</div>
                                            <BaseListbox disabled={disabled} placement={"right-48 text-sm"} items={
                                                [{
                                                    "name": "Inbox",
                                                    "id": null
                                                }, ...projects]} selected={project || {"name": "Inbox", "id": null}}
                                                         onChange={(project) => {
                                                             onProjectChange(project)
                                                             close()
                                                         }}/>
                                        </div>
                                    </div>
                                    <div className={'mt-2_'}>
                                        {items.map((item, index, {length}) => (
                                            <div className={``} key={item.id + card.id}>
                                                <button disabled={item.disabled} onClick={() => {
                                                    close();
                                                    item.action()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} ${(index + 1 === length)?"":""} dark:hover:bg-gray-600 hover:bg-hov dark:text-neutral-200 text-neutral-500 group flex w-full items-center rounded px-2 py-2 text-sm`}>
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
                    </>
                }}
            </Popover>
        </div>
    )
}
