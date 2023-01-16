import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "./NoTasks";
import {sortF} from "./Sort";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy, selectPinned} from "../helper";
import TaskGroup from "./TaskGroup";
import {useParams} from "react-router-dom";
import {createSelector} from "@reduxjs/toolkit";


const selectTasks = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,
    (state, sortBy, showCompleted) => showCompleted,

    (tasks, sortBy, showCompleted) => {
        return groupBy(tasks.filter(
            task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && !task.completed && !task.deleted
        ), sortBy).sort((a, b) => {
            sortF(a, b, sortBy)
        })
    }
)
const selectOverdue = createSelector(
    (state) => state.tasks,
    (_, sortBy) => sortBy,
    (tasks, sortBy) => {
        return tasks.filter(task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && (!task.completed)).sort((a, b) => {
            sortF(a, b, sortBy)
        })
    }
)

export default function All({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const showCompleted = useReadLocalStorage("showCompleted")
    const showPinned = useReadLocalStorage("showPinned")

    const tasks = useSelector((state) => selectTasks(state, sortBy, showCompleted))
    const overdue = useSelector((state) => selectOverdue(state, sortBy))
    const pinned = useSelector((state) => selectPinned(state, sortBy))
    const showOverdue = useReadLocalStorage("showOverdue")


    return (

        <div>
            <TopHeader overdue={overdue}/>
            {(showPinned && pinned.length) ?
                <TaskGroup key={"pinnedall"} view={"all"} title={"Pinned"}>
                    {pinned.map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {(showOverdue && overdue.length) ?
                <TaskGroup key={"overdueall"} view={"all"} title={"Overdue"}>
                    {overdue.map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {Object.keys(tasks).length ?
                Object.keys(tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(tasks[group]).length} key={"all" + group} view={"all"} title={(sortBy === "due" || sortBy === "updated_at") ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

        </div>
    )
}
