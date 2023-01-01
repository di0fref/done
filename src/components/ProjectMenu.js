import BaseListbox, {PostIcon} from "./BaseListbox";
import {Menu} from "@headlessui/react";
import {VscSettingsGear, VscSync} from "react-icons/vsc";
import {HiLogout, HiOutlineDotsHorizontal} from "react-icons/hi";
import Settings from "./Settings";
import EditProjectForm from "./EditProjectForm";
import {useEffect, useState} from "react";
import SmallModal from "./SmallModal";
import {toast} from "react-toastify";


export default function ProjectMenu({p}) {

    const [project, setProject] = useState(p)
    const [open, setOpen] = useState(false)

    const closeModal = () => {
        setOpen(false)
    }


    const projectMenuItems = [
        {
            "name": "Edit project",
            "icon": "BsPencil",
            "id": "1",
            "action": () => {
                setOpen(true)
            }
        },
        {
            "name": "Delete project",
            "icon": "BsTrash",
            "id": "2",
            "action": () => {
                toast.error("Not implemented")
            }
        },
    ]

    useEffect(() => {
        setProject(p)
    }, [p])

    return (
       <div>

           <div className={'z-50 '}>
               <div className="flex items-center justify-center ">
                   <div className="relative inline-block text-left">

                       <Menu as={"div"}>
                           <Menu.Button>
                               <HiOutlineDotsHorizontal/>
                           </Menu.Button>
                           <Menu.Items className={' z-50 absolute mt-1 w-fit right-0 max-h-72 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}>
                               {projectMenuItems.map((item, index) => (
                                   <Menu.Item onClick={() => item.action()} as={"div"} value={item} key={item.id} className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-10 ${active ? 'bg-hov dark:bg-gray-600' : ''} text-neutral-600 dark:text-neutral-300`}>

                                       <button className={`block truncate font-normal`}>
                                           <div className={'flex items-center space-x-3'}>
                                               <div><PostIcon iconName={item.icon}/> </div>
                                               <div>{item.name}</div>
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
        </div>
    )
}
