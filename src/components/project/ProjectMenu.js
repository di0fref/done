import {getAuth} from "firebase/auth";
import {toast} from "react-toastify";
import {useTranslation} from "react-i18next";
import {Menu} from "@headlessui/react";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {PostIcon} from "../BaseListbox";
import SmallModal from "../modals/SmallModal";
import EditProjectForm from "./EditProjectForm";
import ShareProjectForm from "./ShareProjectForm";
import {useState} from "react";

export default function ProjectMenu({p}) {

    const [project, setProject] = useState(p)

    const {t} = useTranslation();
    const [open, setOpen] = useState(false)
    const [openShare, setOpenShare] = useState(false)

    const projectMenuItems = [
        {
            "name": t("Edit project"),
            "icon": "BsPencil",
            "id": "2",
            allow: (project && project.user_id === getAuth().currentUser.uid),
            "action": () => {
                setOpen(true)
            }
        },

        {
            "name": t("Share project"),
            "icon": "BsShare",
            "id": "3",
            allow: (project && project.user_id === getAuth().currentUser.uid),
            "action": () => {
                setOpenShare(true)
            }
        },

        {
            "name": t("Delete project"),
            "icon": "BsTrash",
            "id": "4",
            allow: (project && project.user_id === getAuth().currentUser.uid),
            "action": () => {
                toast.error(t("Not implemented"))
            }
        },
    ]

    const closeModal = () => {
        setOpen(false)
        setOpenShare(false)
    }
    return (
        <div>
            <div className={'z-50'}>
                <div className="flex items-center justify-center ">
                    <div className="relative inline-block text-left">

                        <Menu as={"div"}>

                            <Menu.Button className={'group-hover:visible invisible text-neutral-400 hover:text-neutral-600 p-1 rounded'}>
                                <HiOutlineDotsHorizontal className={'h-5 w-5'}/>
                            </Menu.Button>

                            <Menu.Items static={false} className={'z-50 absolute mt-1 min-w-[14rem] right-0 max-h-72 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}>
                                {projectMenuItems.map((item, index, {length}) => (
                                    <Menu.Item disabled={!item.allow} onClick={() => item.action()} as={"div"} value={item} key={item.id} className={({active}) => `${(index + 1 === length)?"":""} relative cursor-pointer select-none py-2 pl-4 pr-10 ${active ? 'bg-hov dark:bg-gray-600' : ''} text-neutral-600 dark:text-neutral-300`}>

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
            <SmallModal open={open} closeModal={closeModal} title={t("Edit project")}>
                <EditProjectForm p={{...project}} open={false} closeModal={closeModal}/>
            </SmallModal>
            <SmallModal open={openShare} closeModal={closeModal} title={t("Share project") + " " + (project && project.name)}>
                <ShareProjectForm p={{...project}} open={false} closeModal={closeModal}/>
            </SmallModal>
        </div>
    )
}
