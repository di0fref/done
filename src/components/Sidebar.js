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


function Sidebar(props) {

    const location = useLocation();
    const projects = useSelector(state => state.projects)
    const currentProject = useSelector(state => state.projects.find(project => props.id === project.id))
    return (
        // <div>
            <Disclosure as="div" className={''}>

                {/*<div className="fixed inset-0 bg-black/30" aria-hidden="true"/>*/}

                <Disclosure.Button className="z-40_ absolute top-6 left-14 inline-flex items-center peer justify-center rounded-md _p-2 text-gray-500 hover:bg-gray-200 hover:text-white_ focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <HiBars3
                        className="block md:hidden h-8 w-8"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className="border-r md:relative absolute px-6 py-6 w-80 h-screen bg-white fixed top-0 -left-80 md:left-0 md:w-52 lg:w-80  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                    {/*<SearchDialog/>*/}
                    <div className="flex flex-col justify-start item-center">
                        <div className={'overflow-y-auto pb-3'}>
                            <ul className={'space-y-1'}>
                                <li>
                                    <Link to={'/inbox'} className={`${(location.pathname.includes("/inbox")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-700`}>
                                        <div>{getIcon("inbox")}</div>
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
                            <div className={' flex justify-between'}>
                                <div className={'text-black/50 font-medium text-[14px] mb-2'}>Lists</div>
                                <AddProjectForm/>
                            </div>
                            <ul className={'space-y-1'}>

                                {
                                    Object.values(projects).map((project, i) => {
                                        return (
                                            <li key={project.id} className={`
                                                    ${(currentProject && project.id === currentProject.id)?"sidebar-active":""} 
                                                pl-2 px-1 py-2 hover:bg-hov rounded`}>
                                                <Link to={"/project/" + project.id} className={'flex items-center'}>
                                                    <div style={{
                                                        background: project.color
                                                    }} className={'w-2 h-2 rounded-full'}> </div>
                                                    <div className={'hover:text-gray-600 ml-3 text-gray-500 text-md flex-grow tracking-wide_'}>{project.name}</div>
                                                    <div className={'mr-1'}><HiEllipsisHorizontal/></div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>

                    </div>
                </div>
            </Disclosure>
        // </div>
    );
}

export default Sidebar;
