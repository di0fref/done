import React from "react";
import {Disclosure} from "@headlessui/react";
import {HiInbox, HiArchiveBox, HiCalendar, HiStar, HiBars3, HiUser, HiUserCircle} from "react-icons/hi2";
import {Link, useLocation} from "react-router-dom";
import getIcon from "./helper"


function Sidebar() {

    const location = useLocation();
    return (
        <div>
            <Disclosure as="nav">

                {/*<div className="fixed inset-0 bg-black/30" aria-hidden="true"/>*/}

                <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md _p-2 text-gray-500 hover:bg-gray-200 hover:text-white_ focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <HiBars3
                        className="block md:hidden h-8 w-8"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="border-r md:relative absolute p-6 w-1/2 h-screen bg-gray-100 _z-20 fixed top-0 -left-72 md:left-0 md:w-72  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    {/*<Avatar/>*/}
                    <div className="flex flex-col justify-start item-center">
                        <div className={'overflow-y-auto py-4 px-3_'}>
                            <ul className={'space-y-1'}>
                                <li>
                                    <Link to={'/today'} className={`${(location.pathname === "/today") ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
                                        {getIcon("today")}
                                        <span className={'ml-3'}>Today</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/upcoming'} className={`${(location.pathname === "/upcoming") ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
                                        {getIcon("upcoming")}
                                        <span className={'ml-3'}>Upcoming</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/anytime'} className={`${(location.pathname === "/anytime") ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
                                        {getIcon("anytime")}
                                        <span className={'ml-3'}>Anytime</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/someday'} className={`${(location.pathname === "/someday") ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
                                        {getIcon("someday")}
                                        <span className={'ml-3'}>Someday</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div className={'text-black/50 font-medium text-[14px] mb-2 '}>Projects</div>
                            <ul className={'space-y-1 text-ss ml-2'}>
                                <li>
                                    <Link to={"/"} className={'flex items-center'}>
                                        <span className={'bg-blue-400 w-2 h-2 rounded-full'}></span>
                                        <span className={'ml-3 text-gray-600'}>Travel</span>
                                    </Link>
                                </li>

                                <li>
                                    <Link to={"/"} className={'flex items-center'}>
                                        <span className={'bg-red-400 w-2 h-2 rounded-full'}></span>
                                        <span className={'ml-3 text-gray-600'}>Work</span>
                                    </Link>
                                </li>             <li>
                                <Link to={"/"} className={'flex items-center'}>
                                    <span className={'bg-yellow-400 w-2 h-2 rounded-full'}></span>
                                    <span className={'ml-3 text-gray-600'}>Home</span>
                                </Link>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </div>
    );
}

export default Sidebar;
