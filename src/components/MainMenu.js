import * as React from "react";
import {Listbox, Transition} from '@headlessui/react'
import {signOutFireBase} from "../auth/firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {format} from "date-fns";
import {HiLogout} from "react-icons/hi";
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

    return (
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
        <div className={'absolute_ top-0_ right-6_ _right-16 z-50 '}>
            <div className="flex items-center justify-center p-12_">
                <div className="relative inline-block text-left">
                    <Listbox>
                        {({open}) => (
                            <>
                          <span className={''}>
                            <Listbox.Button>
                                <GoogleHead/>
                            </Listbox.Button>
                          </span>
                                <Listbox.Options className="z-50 absolute right-20_ _top-10 mt-1 w-40 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">


                                    <Listbox.Option className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-4 ${active ? 'bg-hov text-gray-800' : 'text-gray-800'}`} value={"sync"}>
                                        {({selected}) => (
                                            <span className={`block truncate font-normal`}>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div><VscSync/></div>
                                                    <div>Sync</div>
                                                </div>
                                            </span>
                                        )}
                                    </Listbox.Option>


                                    <Listbox.Option className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-4 ${active ? 'bg-hov text-gray-800' : 'text-gray-800'}`} value={"settings"}>
                                        {({selected}) => (
                                            <span className={`block truncate `}>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div><VscSettingsGear/></div>
                                                    <div>Settings</div>
                                                </div>
                                            </span>
                                        )}
                                    </Listbox.Option>


                                    <Listbox.Option className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-4 ${active ? 'bg-hov text-gray-800' : 'text-gray-800'}`} value={"signout"}>
                                        {({selected}) => (
                                            <span className={`block truncate 'font-normal`}>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div><HiLogout/></div>
                                                    <div>Sign out</div>
                                                </div>
                                            </span>
                                        )}
                                    </Listbox.Option>


                                </Listbox.Options>
                            </>
                        )}
                    </Listbox>
                </div>
            </div>
        </div>
    );
}
