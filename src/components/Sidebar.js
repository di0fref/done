import React from "react";
import {Disclosure} from "@headlessui/react";
import {
    HiBars3,
    HiEllipsisHorizontal
} from "react-icons/hi2";
import {Link, useLocation} from "react-router-dom";
import {getIcon} from "./helper"
import AddProjectForm from "./AddProjectButton";
import {useSelector} from "react-redux";
import SearchDialog from "./SearchDialog";
import SearchForm from "./SearchForm";
import {FaList, FaTrash} from "react-icons/fa";
import {BsList} from "react-icons/bs";


function Sidebar(props) {

    const location = useLocation();
    const projects = useSelector(state => state.projects)
    const currentProject = useSelector(state => state.projects.find(project => props.id === project.id))
    return (
        // <div>
        <Disclosure as="div" className={''}>

            {/*<div className="fixed inset-0 bg-black/30" aria-hidden="true"/>*/}

            <Disclosure.Button className="z-40_ absolute top-2 left-14 inline-flex items-center peer justify-center rounded-md _p-2 text-gray-500 hover:bg-gray-200 hover:text-white_ focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                <HiBars3
                    className="block md:hidden h-8 w-8"
                    aria-hidden="true"
                />
            </Disclosure.Button>
            <div className=" shadow-xl md:shadow-none overflow-hidden border-r dark:border-gray-700  md:relative absolute px-4 py-6 w-80 lg:w-64 h-screen bg-white dark:bg-gray-800 fixed top-0 -left-80 md:left-0 lg:w-80 md:w-64 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                {/*<SearchDialog/>*/}
                <div className="flex flex-col justify-start item-center">
                    <div className={'overflow-y-auto pb-3'}>
                        <ul className={'space-y-1 border-b pb-2'}>
                            <li>
                                <Link to={'/inbox'} className={`${(location.pathname.includes("/inbox")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-700`}>
                                    <div className={'text-gray-500'}>{getIcon("inbox")}</div>
                                    <span className={'ml-3'}>Inbox</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/today'} className={`${(location.pathname.includes("/today")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-700`}>
                                    {getIcon("today")}
                                    <span className={'ml-3'}>Today</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/upcoming'} className={`${(location.pathname.includes("/upcoming")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-700`}>
                                    {getIcon("upcoming")}
                                    <span className={'ml-3'}>Upcoming</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={'/all'} className={`${(location.pathname.includes("/all")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-700`}>
                                    {getIcon("all")}
                                    <span className={'ml-3'}>All Tasks</span>
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div>
                        <div className={'flex justify-between py-2'}>
                            <div className={'text-black/50  dark:text-neutral-300 mb-2 pl-2 flex items-center space-x-2 text-base font-normal text-gray-700'}>
                                <div>{getIcon("lists")}</div>
                                <div className={''}>Lists</div>
                            </div>
                            <AddProjectForm/>
                        </div>
                        <ul className={'space-y-1'}>

                            {
                                Object.values(projects).map((project, i) => {
                                    return (
                                        <li key={project.id} className={`
                                                    ${(currentProject && project.id === currentProject.id) ? "sidebar-active" : ""}  pl-2 px-1 py-2 dark:text-white hover:bg-hov dark:hover:bg-gray-700 rounded`}>
                                            <Link to={"/project/" + project.id} className={'flex items-center'}>
                                                <div style={{
                                                    background: project.color
                                                }} className={'w-2 h-2 rounded-full'}> </div>
                                                {/*<div><BsList/></div>*/}
                                                <div className={'hover:text-gray-600 dark:hover:text-neutral-100 ml-3 dark:text-neutral-300 text-gray-500 text-md flex-grow '}>{project.name}</div>
                                                {/*<div style={{*/}
                                                {/*    background: project.color*/}
                                                {/*}} className={'w-2 h-2 rounded-full mr-6'}> </div>*/}
                                                <div className={'mr-1 w-4 '}><HiEllipsisHorizontal/></div>
                                            </Link>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>

                </div>
                <div className={'absolute bottom-10 w-72'}>
                    <Link to={'/trash'} className={`${(location.pathname.includes("/trash")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-700`}>
                        <div className={'text-gray-500'}><FaTrash className={'text-gray-500'}/> </div>
                        <span className={'ml-3'}>Trash</span>
                    </Link>
                </div>
            </div>
        </Disclosure>
        // </div>
    );
}

export default Sidebar;
