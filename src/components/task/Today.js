import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "./NoTasks";
import {sortF} from "./Sort";
import TopHeader from "./TopHeader";
import TaskGroup from "./TaskGroup";
import {capitalize, formatDate, groupBy, selectPinned} from "../helper";
import {useParams} from "react-router-dom";
import {createSelector} from "@reduxjs/toolkit";

const selectTasks = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,
    (state, sortBy, showCompleted) => showCompleted,

    (tasks, sortBy, showCompleted) => {
        return groupBy(tasks.filter(
            task => {
                return (
                    !showCompleted
                        ? (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && !task.completed && !task.deleted
                        : (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && !task.deleted
                )
            }), sortBy).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }
)

const selectOverdue = createSelector(
    (state) => state.tasks,
    (_, sortBy) => sortBy,
    (tasks, sortBy) => {
        return groupBy(tasks.filter(task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && (!task.completed)), sortBy).sort((a, b) => {
            sortF(a, b, sortBy)
        })
    }
)

export default function Today({renderCard}) {

    const params = useParams()

    const sortBy = useReadLocalStorage("sort")
    const showCompleted = useReadLocalStorage("showCompleted")
    const showPinned = useReadLocalStorage("showPinned")
    const showOverdue = useReadLocalStorage("showOverdue")

    const tasks = useSelector((state) => selectTasks(state, sortBy, showCompleted))
    const overdue = useSelector((state) => selectOverdue(state, sortBy))
    const pinned = useSelector((state) => selectPinned(state, sortBy))

    return (
        <div>

            <TopHeader overdue={overdue}/>
            {(showPinned && pinned.length) ?
                <TaskGroup key={"todaypinned"} view={"today"} title={"Pinned"}>
                    {Object.values(pinned).map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}


            {Object.keys(tasks).length ?
                Object.keys(tasks).map((group) => {
                    return (

                        <TaskGroup count={Object.values(tasks[group]).length} key={"today" + group} view={"all"} title={(sortBy === "due" || sortBy === "updated_at") ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>

                    )
                }) : !overdue && <NoTasks/>}


        </div>
    )
}
