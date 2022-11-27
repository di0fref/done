import {Link} from "react-router-dom";
import {HiArchiveBox, HiCalendar, HiInbox, HiStar} from "react-icons/hi2";

export default function Sidebar() {
    return (
        <>
            <input type="checkbox" id="menu-open" className="hidden"/>
            {/*<label htmlFor="menu-open" className="z-50 absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-800 text-gray-600 md:hidden" data-dev-hint="floating action button">*/}
            {/*    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">*/}
            {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>*/}
            {/*    </svg>*/}
            {/*</label>*/}

            <header className="z-50 bg-gray-200 text-gray-100 flex justify-between md:hidden" data-dev-hint="mobile menu bar">
                <a href="#" className="block p-4 text-white font-bold whitespace-nowrap truncate">
                    Your App is cool
                </a>
                <label htmlFor="menu-open" id="mobile-menu-button" className="z-50 m-2 p-2 focus:outline-none hover:text-white hover:bg-gray-700 rounded-md">
                    <svg id="menu-open-icon" className="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    <svg id="menu-close-icon" className="h-6 w-6 transition duration-200 ease-in-out" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </label>
            </header>


            <aside id="sidebar" className="z-50 bg-gray-200 text-gray-700 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto" data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation">

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

            </aside>
        </>

    )
}
