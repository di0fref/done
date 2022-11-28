import React from "react";
import {Disclosure} from "@headlessui/react";
import {HiInbox, HiArchiveBox, HiCalendar, HiStar, HiBars3} from "react-icons/hi2";
import {Link} from "react-router-dom";


function Sidebar() {
    return (
        <div>
            <Disclosure as="nav">

                    {/*<div className="fixed inset-0 bg-black/30" aria-hidden="true"/>*/}

                <Disclosure.Button className="absolute right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-500 hover:bg-gray-200 hover:text-white_ focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <HiBars3
                        className="block md:hidden h-6 w-6"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="border-r md:relative absolute p-6 w-1/2 h-screen bg-gray-100 z-20 fixed top-0 -left-72 md:left-0 md:w-72  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    <div className="flex flex-col justify-start item-center">
                        <div className={'overflow-y-auto py-4 px-3'}>
                            <ul className={'space-y-1'}>
                                <li>
                                    <Link to={'/today'} className={'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'}>
                                        <HiStar className={'text-yellow-400'}/>
                                        <span className={'ml-3'}>Today</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/upcoming'} className={'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'}>
                                        <HiCalendar className={'text-red-400'}/>
                                        <span className={'ml-3'}>Upcoming</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/anytime'} className={'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'}>
                                        <HiInbox className={'text-green-500'}/>
                                        <span className={'ml-3'}>Anytime</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/someday'} className={'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'}>
                                        <HiArchiveBox className={'text-amber-700'}/>
                                        <span className={'ml-3'}>Someday</span>
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
