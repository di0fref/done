import {Popover} from "@headlessui/react"
import {
    BsList,
    BsSunFill, BsSunriseFill
} from "react-icons/bs";
import {useEffect, useState} from "react";
import BaseListbox, {Avatar, PostIcon} from "../BaseListbox";
import {Tooltip} from "react-tooltip";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, updateTask} from "../../redux/taskSlice";
import {format} from "date-fns";
import DatePickerIcon from "../badges/DatePickerIcon";
import {toast} from "react-toastify";
import {formatDate} from "../helper";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {ws_broadcast} from "../ws";


export default function CardMenu({disabled, card, sendJsonMessage, ...props}) {

    const projects = useSelector(state => state.projects)
    const _project_ = useSelector(state => state.projects.find(
        project => card ? (card.project_id === project.id) : null
    ))
    const {t} = useTranslation();
    const currentUser = useSelector(state => state.current.user)

    const [pinned, setPinned] = useState(card.pinned)
    const [project, setProject] = useState(_project_);
    const [isOpen, setIsOpen] = useState(false)
    const [users, setUsers] = useState([])

    const [assignedUser, setAssignedUser] = useState({})

    useEffect(() => {
        /* Load users that can be assigned */
        isOpen && project && axios.get("/projects_users/" + project.id).then(response => {
            setUsers(response.data)
            setAssignedUser(response.data.find(user => user.user_id === card.assigned_user_id))
        })
    }, [isOpen])


    const items =
        [
            //     {
            //         "name": card.pinned ? t("Unpin") : t("Pin"),
            //         "id": "pin",
            //         "icon": "BsPinAngle",
            //         "action": () => {
            //             setPinned(prev => !prev)
            //             dispatch(updateTask({
            //                 id: card.id,
            //                 pinned: !card.pinned,
            //                 changes: [
            //                     {
            //                         field: "pinned",
            //                         old: card.pinned ? 1 : 0,
            //                         new: !card.pinned ? 1 : 0,
            //                         user_id: currentUser.id,
            //                         assigned_user_id: card.assigned_user_id,
            //                         type: "bool"
            //                     }
            //                 ]
            //             })).unwrap()
            //             sendMessage()
            //             toast.success(t("Task") + " " + (!card.pinned ? t("pinned") : t("unpinned")))
            //         },
            //         "disabled": disabled
            //     },
            {
                "name": t("Move to trash"),
                "id": "delete",
                "icon": "BsTrash",
                "action": () => {
                    dispatch(updateTask({
                        id: card.id,
                        deleted: 1,
                        changes: [
                            {
                                field: "deleted",
                                old: 0,
                                new: 1,
                                user_id: currentUser.id,
                                assigned_user_id: card.assigned_user_id,
                                type: "bool"
                            }
                        ]
                    })).unwrap()
                    sendMessage()
                    toast.success(t("Task moved to trash"))
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
                    sendMessage()
                    toast.success(t("Task restored"))
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
                    sendMessage()
                    toast.success(t("Task deleted forever"))
                },
                "disabled": disabled,
            }

        ]

    const dispatch = useDispatch()

    const sendMessage = (project_id) => {
        if (card.project_id || project_id) {
            ws_broadcast({
                room: card.project_id,
                type: "update",
                module: "tasks",
                params: {
                    id: card.id
                }
            })
        }
    }

    const setDue = (date) => {
        dispatch(updateTask({
            id: card.id,
            due: date ? format(date, "Y-MM-dd") : null,
            changes: [
                {
                    field: "due",
                    old: card.due,
                    new: date ? format(date, "Y-MM-dd") : null,
                    user_id: currentUser.id,
                    assigned_user_id: card.assigned_user_id,
                    type: "date"
                }
            ]
        })).then(r => {
            sendMessage()
        })

        toast.success(t("Due date set to ") + formatDate(date))
    }

    const onUserChange = (user) => {
        dispatch(updateTask({
            id: card.id,
            assigned_user_id: user.user_id,
            changes: [
                {
                    field: "assigned_user_id",
                    old: card.due,
                    new: user.assigned_user_id,
                    user_id: currentUser.id,
                    assigned_user_id: card.assigned_user_id,
                    type: "assigned_user_id"
                }
            ],
            notifications: [
                {
                    notify_user_id: user.user_id,
                    action: "assign",
                    module_id: card.id,
                    action_user_id: currentUser.id,
                    module: "task"
                }
            ]
        })).then(r => {
            sendMessage()
        })
        toast.success(t("Assigned user changed"))
    }

    const setPrio = (prio) => {
        dispatch(updateTask({
            id: card.id,
            prio: prio,
            changes: [
                {
                    field: "prio",
                    old: card.priod,
                    new: prio,
                    user_id: currentUser.id,
                    assigned_user_id: card.assigned_user_id,
                    type: "string"
                }
            ]
        })).then(r => {
            sendMessage()
        })
        toast.success(t("Priority set to ") + prio)
    }

    const onProjectChange = (project) => {
        dispatch(updateTask({
            id: card.id,
            project_id: project.id,
            changes: [
                {
                    field: "project",
                    old: card.project,
                    new: project.name,
                    user_id: currentUser.id,
                    assigned_user_id: card.assigned_user_id,
                    type: "project_id"
                }
            ]
        })).then(r => {
            sendMessage(project.id)
        })
        toast.success(t("Task moved to project ") + project.name)
        setProject(project)
    }

    if (disabled) {
        return (
            // <div className={'relative'}>

                <Popover as={"div"} className={"relative"}>
                    {({open}) => (
                        <>
                            <Popover.Button className={'py-1 px-2 rounded flex items-center w-full justify-start text-left hover:bg-neutral-100 dark:hover:bg-gray-600'}>
                                <BsList className={'h-5 w-5 text-neutral-500 dark:text-gray-400'}/>
                            </Popover.Button>
                            <Popover.Panel className=" w-36 bg-white dark:bg-gray-700 absolute right-0 mt-2   origin-top-right rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                {disabledItems.map((item, index) => (
                                    <div className={``} key={item.id + card.id}>
                                        <button onClick={item.action} className={` dark:hover:bg-gray-600 hover:bg-hov dark:text-neutral-200 text-neutral-500 group flex w-full items-center rounded px-2 py-2 text-sm`}>
                                            {item.icon ?
                                                <div className={'mr-2'}>
                                                    <PostIcon iconName={item.icon} css={item.css}/>
                                                </div>
                                                : ""}
                                            {item.image_url ?
                                                <div className={'mr-2'}>
                                                    <Avatar img={item.image_url} css={item.css}/>
                                                </div>
                                                : ""}
                                            <div className={'whitespace-nowrap'}>{t(item.name)}</div>
                                        </button>
                                    </div>
                                ))}
                            </Popover.Panel>
                        </>
                    )}

                </Popover>
             // </div>
        )
    }


    return (
        <div className={'relative'}>
            <Popover as={"div"}>
                {({open}) => {

                    return <>
                        <Popover.Button onClick={() => setIsOpen(!isOpen)} className={'ml-2 group-hover:visible invisible  p-1 rounded flex items-center  justify-start text-left dark:hover:bg-gray-600'}>
                            <BsList className={'h-5 w-5 hover:text-neutral-600 text-neutral-400 dark:text-gray-400'}/>
                        </Popover.Button>
                        <Popover.Panel className=" bg-white dark:bg-gray-700 absolute right-6  mt-2 origin-top-right rounded shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {({close}) => (

                                <div className="px-1 py-1 w-56">
                                    <div className={'p-2 border-b  dark:border-b-gray-600'}>
                                        <div className={'text-neutral-400 dark:text-neutral-200 text-xs'}>{t("due")}</div>
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
                                                <Tooltip anchorId={`tomorrow${card.id}`} content={t("Tomorrow")}/>
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
                                                <Tooltip anchorId={`custom${card.id}`} content={t("Custom")}/>
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
                                        <div className={'text-neutral-400 dark:text-neutral-200 text-xs'}>{t("prio")}</div>
                                        <div className={'mt-2 text-sm flex items-center justify-between'}>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("low")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 text-neutral-400 dark:text-neutral-200 ho_ver:text-neutral-600`}>{t("low")}
                                                </button>
                                            </div>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("normal")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600  hover:bg-hov px-2 py-1 text-neutral-400 dark:text-neutral-200 h_over:text-neutral-600`}>{t("normal")}
                                                </button>
                                            </div>
                                            <div>
                                                <button disabled={disabled} onClick={() => {
                                                    setPrio("high")
                                                    close()
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 text-neutral-400 dark:text-neutral-200 ho_ver:text-neutral-600`}>{t("high")}
                                                </button>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="px-1 py-1 ">
                                        <div className={'p-2 border-b dark:border-b-gray-600'}>
                                            <div className={'dark:text-neutral-200 text-neutral-400 text-xs'}>{t("Assigned user")}
                                            </div>
                                            <BaseListbox disabled={disabled} placement={"right-48 text-sm"} items={users} selected={assignedUser || []}
                                                         onChange={(user) => {
                                                             onUserChange(user)
                                                             close()
                                                         }}/>
                                        </div>
                                    </div>


                                    <div className="px-1 py-1 ">
                                        <div className={'p-2 border-b dark:border-b-gray-600'}>
                                            <div className={'dark:text-neutral-200 text-neutral-400 text-xs'}>{t("Project")}</div>
                                            <BaseListbox disabled={disabled} placement={"right-48 text-sm"} items={
                                                [{
                                                    "name": "Inbox",
                                                    "id": null,
                                                    "icon": "BsInbox"
                                                }, ...projects]} selected={project || {
                                                "name": "Inbox",
                                                "id": null,
                                                "icon": "BsInbox"
                                            }}
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
                                                }} className={`${disabled ? "hover:cursor-not-allowed" : ""} ${(index + 1 === length) ? "" : ""} dark:hover:bg-gray-600 hover:bg-hov dark:text-neutral-200 text-neutral-500 group flex w-full items-center rounded px-2 py-2 text-sm`}>
                                                    {item.icon ?
                                                        <div className={'mr-2'}>
                                                            <PostIcon iconName={item.icon} css={item.css}/>
                                                        </div>
                                                        : ""}
                                                    <div className={'whitespace-nowrap'}>{t(item.name)}</div>
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
