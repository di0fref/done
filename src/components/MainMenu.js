import * as React from "react";
import {Menu} from '@headlessui/react'
import {signOutFireBase} from "../auth/firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import Settings from "./Settings";
import {useState} from "react";
import {PostIcon} from "./BaseListbox";
import {FaUserCircle} from "react-icons/fa";


const GoogleHead = () => {
    const user = getAuth();

    return (
        <div className={'w-8'}>
            <img  alt="Avatar" className={'rounded-md'} src={user.currentUser.photoURL}/>
        </div>
    )
}


export default function MainMenu() {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    const items = [
        {
            "name": "Sync",
            "id": "sync",
            "icon": "VscSync",
            "action": () => {
            }
        },
        {
            "name": "Settings",
            "id": "settings",
            "icon": "VscSettingsGear",
            "action": () => {
                setOpen(true)
            }
        },
        {
            "name": "Sign out",
            "id": "signout",
            "icon": "HiLogout",
            "action": () => {
                signOutFireBase().then(() => {
                    navigate("/login")
                })
            }
        }
    ]


    return (
        <div className={'z-50 '}>
            <div className="flex items-center justify-center ">
                <div className="relative inline-block text-left">

                    <Menu as={"div"}>
                        <Menu.Button>
                            <GoogleHead/>
                        </Menu.Button>
                        <Menu.Items className={' z-50 absolute mt-1 w-fit _w-44 max-h-72 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}>
                            {items.map((item, index) => (
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
            <Settings open={open} setModalOpen={setOpen}/>
        </div>
    );
}
