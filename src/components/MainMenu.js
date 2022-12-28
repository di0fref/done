import * as React from "react";
import {Listbox, Transition} from '@headlessui/react'
import {signOutFireBase} from "../auth/firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {format} from "date-fns";
import {HiLogout} from "react-icons/hi";
import {VscSettingsGear, VscSync} from "react-icons/vsc";
import Settings from "./Settings";
import {useState} from "react";


const GoogleHead = () => {
    const user = getAuth();

    return (
        <div className={'w-10'}>
            <img className={'rounded-md'} src={user.currentUser.photoURL}/>
        </div>
    )
}

export default function MainMenu() {
        const [open, setOpen] = useState(false)

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


                                    <Listbox.Option onClick={() => setOpen(true)} className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-4 ${active ? 'bg-hov text-gray-800' : 'text-gray-800'}`} value={"settings"}>
                                        {({selected}) => (
                                            <span className={`block truncate `}>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div><VscSettingsGear/></div>
                                                    <div>Settings</div>
                                                </div>
                                            </span>
                                        )}
                                    </Listbox.Option>


                                    <Listbox.Option onClick={signOut}  className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-4 ${active ? 'bg-hov text-gray-800' : 'text-gray-800'}`} value={"signout"}>
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
            <Settings open={open} setModalOpen={setOpen}/>
        </div>
    );
}
