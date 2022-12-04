import * as React from "react";
import {Menu, Transition} from "@headlessui/react";
import {signOutFireBase} from "../auth/firebase";
import {useNavigate} from "react-router-dom";
import {getAuth} from "firebase/auth";
import {format} from "date-fns";
import {HiLogout} from "react-icons/hi";
import {useDispatch} from "react-redux";
import {getTasks} from "../redux/taskSlice";

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

export default function MainMenu() {

    const navigate = useNavigate();
    const user = getAuth();

    const dispatch = useDispatch()

    const signOut = () => {
        signOutFireBase().then(() => {
            navigate("/login")
        })
    }

    const toggle = () => {
        dispatch(getTasks())
    }

    return (
        <div className={'absolute top-2 right-4 _right-16'}>
            <div className="flex items-center justify-center p-12_">
                <div className="relative inline-block text-left">
                    <Menu>
                        {({open}) => (
                            <>
              <span className="rounded-md shadow-sm">
                <Menu.Button className="inline-flex justify-center w-full px-2 py-1 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white rounded-full hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">

                              <div className="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{
                            user.currentUser ? user.currentUser.displayName.split(" ").map((n) => n[0]).join("") : ""
                        }</span>
                    </div>

                </Menu.Button>
              </span>

                                <Transition
                                    show={open}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                                    <Menu.Items
                                        static
                                        className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                    >

                                        <Menu.Item as={"div"}>
                                            <Avatar/>
                                        </Menu.Item>

                                        <Menu.Item>
                                            {({active}) => (
                                                <button onClick={toggle}
                                                        className={`${
                                                            active ? 'bg-gray-100' : 'text-gray-900'
                                                        } group flex w-full items-center px-4 py-2 text-sm space-x-2`}
                                                >
                                                    <div><HiLogout className={'text-blue-500'}/></div>
                                                    <div>Show/hide completed</div>
                                                </button>
                                            )}
                                        </Menu.Item>

                                        <div className="py-1">
                                            <Menu.Item>
                                                {({active}) => (

                                                    <button onClick={signOut}
                                                            className={`${
                                                                active ? 'bg-gray-100' : 'text-gray-900'
                                                            } group flex w-full items-center px-4 py-2 text-sm space-x-2`}
                                                    >
                                                        <div><HiLogout className={'text-blue-500'}/></div>
                                                        <div>Log out</div>
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
        </div>
    );
}
