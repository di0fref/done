import * as React from "react";
import {Menu, Transition} from "@headlessui/react";
import {signOutFireBase} from "../auth/firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {format} from "date-fns";
import {HiLogout} from "react-icons/hi";
import {useDispatch} from "react-redux";
import {getTasks} from "../redux/taskSlice";
import {useLocalStorage} from "usehooks-ts";
import ToggleCompletedButton from "./ToggleCompletedButton";
import {FaSync} from "react-icons/fa";
import {VscSettingsGear, VscSync} from "react-icons/vsc";

function Avatar() {

    const user = getAuth();
    return (
        <div className={'p-4'}>
            <div className="flex items-start space-x-2">
                <div className={'rounded-full  text-gray-400'}>
                    <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{
                            user.currentUser ? user.currentUser.displayName.split(" ").map((n) => n[0]).join("") : ""
                        }</span>
                    </div>
                </div>
                <div className="dark:text-white">
                    <div className={'text-sm font-medium text-gray-700'}>{user.currentUser ? user.currentUser.displayName : ""}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Joined {user.currentUser ? format(new Date(user.currentUser.metadata.creationTime), "d MMM Y") : ""}</div>
                </div>
            </div>
        </div>
    );
}

const GoogleHead = () => {
    const user = getAuth();

    return(
        <div className={'w-10'}>
            <img className={'rounded-md'} src={user.currentUser.photoURL}/>
        </div>
    )
}

export default function MainMenu() {

    const navigate = useNavigate();
    const user = getAuth();

    const signOut = () => {
        signOutFireBase().then(() => {
            navigate("/login")
        })
    }

    return (
        <div className={'absolute_ top-0_ right-6_ _right-16 z-50'}>
            <div className="flex items-center justify-center p-12_">
                <div className="relative inline-block text-left">
                    <Menu>
                        {({open}) => (
                            <>
                          <span className={''}>
                            <Menu.Button >
                                {/*<div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">*/}
                                {/*    <span className="font-medium text-gray-600 dark:text-gray-300">*/}
                                {/*        {user.currentUser ? user.currentUser.displayName.split(" ").map((n) => n[0]).join("") : ""}*/}
                                {/*    </span>*/}
                                {/*</div>*/}
                                <GoogleHead/>
                            </Menu.Button>
                          </span>
                                <Menu.Items className="text-tgray/60 text-md z-50 absolute left-3 w-44 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">

                                    <Menu.Item as={'div'}>
                                        {({active}) => (
                                            <button onClick={signOut} className={`${active ? 'bg-hov' : ''} group flex w-full items-center px-4 py-2 space-x-2`}>
                                                <div><VscSync className={''}/></div>
                                                <div>Sync</div>
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item as={'div'}>
                                        {({active}) => (
                                            <button onClick={signOut} className={`${active ? 'bg-hov' : ''} group flex w-full items-center px-4 py-2 space-x-2`}>
                                                <div><VscSettingsGear className={''}/></div>
                                                <div>Settings</div>
                                            </button>
                                        )}
                                    </Menu.Item>

                                    <div className="py-1">
                                        <Menu.Item>
                                            {({active}) => (
                                                <button onClick={signOut} className={`${active ? 'bg-hov' : ''} group flex w-full items-center px-4 py-2 space-x-2`}>
                                                    <div><HiLogout className={''}/></div>
                                                    <div>Sign out</div>
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </div>
                                </Menu.Items>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        </div>
    );
}
