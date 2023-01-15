import React from "react";
import {Disclosure} from "@headlessui/react";
import {
    HiBars3,
} from "react-icons/hi2";
import {Link, useLocation} from "react-router-dom";
import {getIcon, groupByCount} from "./helper"
import AddProjectForm from "./project/AddProjectButton";
import {useSelector} from "react-redux";
import ProjectMenu from "./DynamicMenu";
import {BsCheckSquareFill, BsTrash} from "react-icons/bs";
import {useReadLocalStorage} from "usehooks-ts";
import {SortableComponent} from "./project/ProjectList";
import {useTranslation} from "react-i18next";
import {createSelector} from "@reduxjs/toolkit";

const selectProjects = createSelector(
    (state) => state.projects,
    (projects) => (
        projects.filter((project) => !project.deleted)
    )
)

const selectCount = createSelector(
    (state) => state.tasks,
    (tasks) => {
        return {
            today: tasks.filter(task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (!task.completed) && !task.deleted).length,
            upcoming: tasks.filter(task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed) && !task.deleted).length,
            inbox: tasks.filter(task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed && task.project_id === "" && !task.deleted)).length,
            all: tasks.filter((task) => (!task.completed && !task.deleted)).length,
            completed: tasks.filter((task) => (task.completed)).length,
            trash: tasks.filter((task) => (task.deleted)).length,
        }
    }
)

export default function Sidebar(props) {

    const location = useLocation();
    const {t} = useTranslation();
    const showSidebarCount = useReadLocalStorage("showSidebarCount");

    const projects = useSelector(selectProjects)
    const counts = useSelector(selectCount)

    // const project_count = groupByCount(useSelector(state => state.tasks.filter(task => !task.completed && !task.deleted)), "project_id")

    // const currentProject = useSelector(state => state.projects.find(project => props.id === project.id))

    return (
        // <div>
        <Disclosure as="div" className={'h-full'}>

            {/*<div className="fixed inset-0 bg-black/30" aria-hidden="true"/>*/}

            <Disclosure.Button className="absolute top-4 left-14 inline-flex items-center peer justify-center rounded-md _p-2 text-gray-500 hover:bg-gray-200 hover:text-white_ focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                <HiBars3
                    className={`block md:hidden h-8 w-8`}
                    aria-hidden="true"
                />
            </Disclosure.Button>
            <div className=" z-30 overflow-auto shadow-xl md:shadow-none  border-r dark:border-gray-700  md:relative absolute px-4 py-4 w-80 lg:w-64 h-screen bg-white dark:bg-gray-800 fixed top-0 -left-80 md:left-0 lg:w-80 md:w-64 peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
                {/*<SearchDialog/>*/}
                <div className="flex flex-col justify-start item-center h-full">
                    <div className={'pb-3'}>
                        <ul className={'space-y-1 border-b  dark:border-gray-700 pb-2'}>
                            <li>
                                <Link to={'/inbox'} className={`${(location.pathname.includes("/inbox")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-900/30`}>
                                    <div className={'text-gray-500'}>{getIcon("inbox")}</div>
                                    <div className={'ml-3 flex-grow'}>{t("Inbox")}</div>
                                    {showSidebarCount ? <div className={'text-xs pr-1'}>{counts["inbox"]}</div> : ""}
                                </Link>
                            </li>
                            <li>
                                <Link to={'/today'} className={`${(location.pathname.includes("/today")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-900/30`}>

                                    {/*<div className={'ml-3'}>*/}
                                    {getIcon("today")}
                                    <div className={'ml-3 flex-grow'}>{t("Today")}</div>
                                    {showSidebarCount ? <div className={'text-xs pr-1'}>{counts["today"]}</div> : ""}
                                    {/*</div>*/}
                                </Link>
                            </li>
                            <li>
                                <Link to={'/upcoming'} className={`${(location.pathname.includes("/upcoming")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-900/30`}>
                                    {getIcon("upcoming")}
                                    <div className={'ml-3 flex-grow'}>{t("Upcoming")}</div>
                                    {showSidebarCount ? <div className={'text-xs pr-1'}>{counts["upcoming"]}</div> : ""}
                                </Link>
                            </li>
                            <li>
                                <Link to={'/all'} className={`${(location.pathname.includes("/all")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-900/30`}>
                                    {getIcon("all")}
                                    <div className={'ml-3 flex-grow'}>{t("All Tasks")}</div>
                                    {showSidebarCount ? <div className={'text-xs pr-1'}>{counts["all"]}</div> : ""}
                                </Link>
                            </li>

                        </ul>
                    </div>
                    <div className={'mt-1'}>
                        <div className={'flex justify-between py-2'}>
                            <div className={'mb-2 pl-2 flex items-center space-x-2'}>
                                <div>{getIcon("projects", "h-3 w-3")}</div>
                                <div className={'text-neutral-500 font-semibold dark:text-neutral-300 text-sm'}>{t("Projects")}</div>
                            </div>
                            <AddProjectForm/>
                        </div>
                        {/*{projects.length ?*/}
                        {/*    <ul className={'space-y-1'}>*/}
                        {/*        {*/}
                        {/*            Object.values(projects).map((project, i) => {*/}
                        {/*                return (*/}
                        {/*                    <li key={project.id} className={`${(currentProject && project.id === currentProject.id) ? "sidebar-active" : ""} group pl-2 px-1 py-1.5 dark:text-white hover:bg-hov dark:hover:bg-gray-900/30 rounded`}>*/}
                        {/*                        <Link to={"/project/" + project.id} className={'flex items-center'}>*/}
                        {/*                            <div style={{background: project.color}} className={'w-2 h-2 rounded-full'}/>*/}
                        {/*                            <div className={'flex items-center hover:text-gray-600 dark:hover:text-neutral-100 ml-3 dark:text-neutral-300 text-gray-500 text-sm flex-grow '}>*/}
                        {/*                                <div className={'flex-grow'}>{project.name}</div>*/}
                        {/*                            </div>*/}
                        {/*                        </Link>*/}
                        {/*                    </li>*/}
                        {/*                )*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*    </ul>*/}
                        {/*    :*/}
                        {/*    <div className={'bg-neutral-100 text-sm mx-2 p-2 text-neutral-600'}>*/}
                        {/*        Create your first project and start grouping tasks together.*/}
                        {/*    </div>*/}
                        {/*}*/}
                    </div>
                    {projects.length ?
                        <SortableComponent items={projects}/>
                        : <div className={'bg-neutral-100 text-sm mx-2 p-2 text-neutral-600'}>
                            {t("Create your first project and start grouping tasks together.")}
                        </div>
                    }

                    <div className={'flex flex-col justify-end_ h-full border-t dark:border-gray-700 mt-3'}>
                        <div className={'inline-block pt-3'}>
                            <Link to={'/completed'} className={`${(location.pathname.includes("/completed")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-900/30`}>
                                <div className={'text-gray-500'}><BsCheckSquareFill className={'text-gray-500'}/></div>
                                <div className={'ml-3 flex-grow'}>{t("Completed")}</div>
                                {showSidebarCount ? <div className={'text-xs pr-1'}>{counts["completed"]}</div> : ""}
                            </Link>

                            <Link to={'/trash'} className={`${(location.pathname.includes("/trash")) ? "sidebar-active" : ""} flex items-center p-2 text-base font-normal text-gray-700 rounded-lg dark:text-white hover:bg-hov dark:hover:bg-gray-900/30`}>
                                <div className={'text-gray-500'}><BsTrash className={'text-gray-500'}/></div>
                                <div className={'ml-3 flex-grow'}>{t("Trash")}</div>
                                {showSidebarCount ? <div className={'text-xs pr-1'}>{counts["trash"]}</div> : ""}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Disclosure>
        // </div>
    )
        ;
}
