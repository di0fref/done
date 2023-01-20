import * as React from "react";
import {Menu} from '@headlessui/react'
import {signOutFireBase} from "../auth/firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import Settings from "./Settings";
import {useState} from "react";
import {PostIcon} from "./BaseListbox";
import {FaUserCircle} from "react-icons/fa";
import {GoogleHead} from "./helper";
import {useTranslation} from "react-i18next";
import SmallUserCard from "./user/SmallUserCard";
import {BsGear} from "react-icons/bs";
import {useSelector} from "react-redux";


export default function MainMenu() {
    const [open, setOpen] = useState(false)
    const {t} = useTranslation();

    const navigate = useNavigate();

    const items = [
        {
            "name": <SmallUserCard/>,
            "id": "user",
            "disabled": true,

        },
        {
            "name": t("Sync"),
            "id": "sync",
            "icon": "VscSync",
            "styles": "space-x-3",
            "action": () => {
            }
        },
        {
            "name": t("Settings"),
            "id": "settings",
            "icon": "VscSettingsGear",
            "styles": "space-x-3",
            "action": () => {
                setOpen(true)
            }
        },
        // {
        //     "name": "divider"
        // },
        {
            "name": t("Sign out"),
            "id": "signout",
            "icon": "HiLogout",
            "styles": "space-x-3",
            "action": () => {
                signOutFireBase().then(() => {
                    navigate("/")
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
                            <BsGear className={'rounded-full w-6 h-6 text-neutral-500 hover:text-neutral-700'}/>
                        </Menu.Button>
                        <Menu.Items className={'z-50 absolute mt-1 min-w-[16rem] w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}>
                            {items.map((item, index, {length}) => (


                                <Menu.Item disabled={item.disabled} onClick={() => item.action()} as={"div"} value={item} key={item.id} className={({active}) => `${(index + 1 === length) ? "" : ""} relative cursor-pointer select-none py-2 pl-4 pr-10 ${active ? 'bg-hov dark:bg-gray-600' : ''} text-neutral-600 dark:text-neutral-300`}>

                                    <button className={`block truncate font-normal`}>
                                        <div className={`${item.styles} flex items-center`}>
                                            <div><PostIcon iconName={item.icon}/></div>
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
