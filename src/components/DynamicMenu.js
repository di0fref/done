import {PostIcon} from "./BaseListbox";
import {Menu} from "@headlessui/react";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import EditProjectForm from "./EditProjectForm";
import {useEffect, useState} from "react";
import SmallModal from "./SmallModal";
import {toast} from "react-toastify";
import ShareProjectForm from "./ShareProjectForm"
import {useParams} from "react-router-dom";
import {useLocalStorage} from "usehooks-ts";

export default function DynamicMenu({p}) {

    const [project, setProject] = useState(p)
    const [open, setOpen] = useState(false)
    const [openShare, setOpenShare] = useState(false)
    const [useMenu, setUseMenu] = useState([])
    const params = useParams()

    const [showCompleted, setShowCompleted] = useLocalStorage("showCompleted" + params.path + (params.id || ""), null)
    const [showDetails, setShowDetails] = useLocalStorage("showDetails" + params.path + (params.id || ""), null)

    const closeModal = () => {
        setOpen(false)
        setOpenShare(false)
    }

    useEffect(() => {
        setProject(p)
    }, [p])

    let taskMenuitems = [
        {
            "name": (showCompleted ? "Hide" : "Show") + " completed",
            "icon": "BsCheckSquare",
            "id": "10",
            "action": () => {
                setShowCompleted(prev => !prev)
            }
        },
        {
            "name": (showDetails ? "Hide" : "Show") + " details",
            "icon": "BsListNested",
            "id": "20",
            "action": () => {
                setShowDetails(prev => !prev)
            }
        },
        {
            "name": "Postpone",
            "icon": "BsCalendar",
            "id": "30",
            "action": () => {
                toast.error("Not implemented")
            }
        },
    ]

    const projectMenuItems = [
        {
            "name": (showCompleted ? "Hide" : "Show") + " completed",
            "icon": "BsCheckSquare",
            "id": "10",
            "action": () => {
                setShowCompleted(prev => !prev)
            }
        },
        {
            "name": "Edit project",
            "icon": "BsPencil",
            "id": "2",
            "action": () => {
                setOpen(true)
            }
        },
        {
            "name": "Share project",
            "icon": "BsShare",
            "id": "3",
            "action": () => {
                setOpenShare(true)
            }
        },
        {
            "name": "Delete project",
            "icon": "BsTrash",
            "id": "4",
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
                                    <Menu.Item onClick={() => item.action()} as={"div"} value={item} key={item.id} className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-10 ${active ? 'bg-hov dark:bg-gray-600' : ''} text-neutral-600 dark:text-neutral-300`}>

                                        <button className={`block truncate font-normal`}>
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
            <SmallModal open={openShare} closeModal={closeModal} title={"Share project"}>
                <ShareProjectForm p={{...project}} open={false} closeModal={closeModal}/>
            </SmallModal>
        </div>
    )
}
