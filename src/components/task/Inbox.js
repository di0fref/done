import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "./NoTasks";
import {sortF} from "./Sort";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy, selectPinned} from "../helper";
import TaskGroup from "./TaskGroup";
import {createSelector} from "@reduxjs/toolkit";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";


const selectTasks = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,

    (tasks, sortBy) => {
        return tasks.filter(
            task => (!task.completed && task.project_id === "" && !task.deleted && (task.due === null || task.due === ""))
        ).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }
)


export default function Inbox({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const showPinned = useReadLocalStorage("showPinned")
    const {t} = useTranslation();

    const tasks = useSelector((state) => selectTasks(state, sortBy))
    const pinned = useSelector((state) => selectPinned(state, sortBy))


    return (
        <div>
            <TopHeader overdue={[]}/>

            {/*{(showPinned && pinned.length) ? (*/}
            {/*        <TaskGroup key={"pinnedinbox"} view={"inbox"} title={"Pinned"}>*/}
            {/*            {pinned.map((card, i) => renderCard(card, i))}*/}
            {/*        </TaskGroup>)*/}
            {/*    : ""}*/}


            {Object.keys(tasks).length ?
                Object.values(tasks).map((task, i) => {
                    return renderCard(task, i)
                })
                : <NoTasks/>}

        </div>
    )
}
