import {PostIcon} from "./BaseListbox";
import {Menu} from "@headlessui/react";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import EditProjectForm from "./project/EditProjectForm";
import {useEffect, useState} from "react";
import SmallModal from "./modals/SmallModal";
import {toast} from "react-toastify";
import ShareProjectForm from "./project/ShareProjectForm"
import {useParams} from "react-router-dom";
import {useLocalStorage} from "usehooks-ts";
import {updateTask} from "../redux/taskSlice";
import {format} from "date-fns";
import {dbDateFormat} from "./helper";
import {useDispatch} from "react-redux";
import {getAuth} from "firebase/auth";

export default function DynamicMenu({p, overdue}) {

    const [project, setProject] = useState(p)
    const [open, setOpen] = useState(false)
    const [openShare, setOpenShare] = useState(false)
    const [postponeOpen, setPostponeOpen] = useState(false)
    const [useMenu, setUseMenu] = useState([])
    const params = useParams()

    const [showCompleted, setShowCompleted] = useLocalStorage("showCompleted", null)
    const [showDetails, setShowDetails] = useLocalStorage("showDetails", null)
    const dispatch = useDispatch()

    const closeModal = () => {
        setOpen(false)
        setOpenShare(false)
        setPostponeOpen(false)
    }

    const postponeHandler = () => {

        if (overdue.length) {
            (async () => {
                try {
                    await overdue.map(task => {

                        // let date = new Date(task.due)
                        // date.setDate(date.getDate() + 1)

                        dispatch(updateTask({
                            id: task.id,
                            due: format(new Date(), dbDateFormat)
                        }))
                    })
                } catch (error) {
                    toast.error(error)
                }

            })().then((result) => {
                toast.success(overdue.length + " overdue tasks moved to Today")
                setPostponeOpen(false)
            })
        } else {
            toast.warning("No overdue tasks to postpose")
            setPostponeOpen(false)
        }
    }

    useEffect(() => {
        setProject(p)
    }, [p])

    let taskMenuitems = [
        {
            "name": (showCompleted ? "Hide" : "Show") + " completed",
            "icon": "BsCheckSquare",
            allow: true,
            "id": "10",
            "action": () => {
                setShowCompleted(prev => !prev)
            }
        },
        {
            "name": (showDetails ? "Hide" : "Show") + " details",
            "icon": "BsListNested",
            "id": "20",
            allow: true,
            "action": () => {
                setShowDetails(prev => !prev)
            }
        },
        {
            "name": "Postpone",
            "icon": "BsCalendar",
            allow: true,
            "id": "30",
            "action": () => {
                setPostponeOpen(true)
            }
        },
    ]

    const projectMenuItems = [
        {
            "name": "Edit project",
            "icon": "BsPencil",
            "id": "2",
            allow: (project && project.user_id === getAuth().currentUser.uid),
            "action": () => {
                setOpen(true)
            }
        },
        {
            "name": (showCompleted ? "Hide" : "Show") + " completed",
            "icon": "BsCheckSquare",
            "id": "10",
            allow: true,
            "action": () => {
                setShowCompleted(prev => !prev)
            }
        },
        {
            "name": (showDetails ? "Hide" : "Show") + " details",
            "icon": "BsListNested",
            "id": "20",
            allow: true,
            "action": () => {
                setShowDetails(prev => !prev)
            }
        },
        {
            "name": "Share project",
            "icon": "BsShare",
            "id": "3",
            allow: (project && project.user_id === getAuth().currentUser.uid),
            "action": () => {
                setOpenShare(true)
            }
        },
        {
            "name": "Postpone",
            "icon": "BsCalendar",
            allow: true,
            "id": "31",
            "action": () => {
                setPostponeOpen(true)
            }
        },
        {
            "name": "Delete project",
            "icon": "BsTrash",
            "id": "4",
            allow: (project && project.user_id === getAuth().currentUser.uid),
            "action": () => {
                toast.error("Not implemented")
            }
        },
    ]
    useEffect(() => {

        setUseMenu(
            (params.path === "project")
                ? [...projectMenuItems]
                : [...taskMenuitems]
        )


    }, [params.path, showCompleted, showDetails])

    useEffect(() => {
        setProject(p)
    }, [p])

    return (
        <div>
            <div className={'z-50'}>
                <div className="flex items-center justify-center ">
                    <div className="relative inline-block text-left">

                        <Menu as={"div"}>

                            <Menu.Button className={'hover:bg-neutral-100 p-1 rounded'}>
                                <HiOutlineDotsHorizontal className={'h-5 w-5'}/>
                            </Menu.Button>

                            <Menu.Items static={false} className={'z-50 absolute mt-1 min-w-[14rem] right-0 max-h-72 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}>
                                {useMenu.map((item, index) => (
                                    <Menu.Item disabled={!item.allow} onClick={() => item.action()} as={"div"} value={item} key={item.id} className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-10 ${active ? 'bg-hov dark:bg-gray-600' : ''} text-neutral-600 dark:text-neutral-300`}>

                                        <button className={`${!item.allow ? "opacity-50" : ""} block truncate font-normal`}>
                                            <div className={'flex items-center space-x-3'}>
                                                <div><PostIcon iconName={item.icon}/></div>
                                                <div>
                                                    <span>{item.name}</span>
                                                </div>
                                            </div>
                                        </button>

                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>

                    </div>
                </div>
            </div>
            <SmallModal open={open} closeModal={closeModal} title={"Edit project"}>
                <EditProjectForm p={{...project}} open={false} closeModal={closeModal}/>
            </SmallModal>
            <SmallModal open={openShare} closeModal={closeModal} title={`Share project "${project&&project.name}"`}>
                <ShareProjectForm p={{...project}} open={false} closeModal={closeModal}/>
            </SmallModal>
            <SmallModal open={postponeOpen} closeModal={closeModal} title={"Postpone tasks"}>
                <div className={'px-4 pt-2'}>
                    <div className={'my-2 dark:text-gray-300 text-neutral-500'}>This will move overdue tasks to <b>Today</b>.</div>
                    <div className={'bg-gray-50_ dark:bg-gray-800 flex justify-end space-x-2 p-4 '}>
                        <button onClick={closeModal} className={'cancel-btn'}>Cancel</button>
                        <button className={'save-btn'} onClick={postponeHandler}>Ok</button>
                    </div>
                </div>
            </SmallModal>
        </div>
    )
}
