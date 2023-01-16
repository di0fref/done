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
    (state, sortBy, project_id) => project_id,
    (state, sortBy, project_id, showCompleted) => showCompleted,

    (tasks, sortBy, project_id, showCompleted) => {
        return groupBy(tasks.filter(task => {

            return (
                !showCompleted
                    ? (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && task.project_id === project_id && !task.deleted && !task.completed
                    : (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) &&task.project_id === project_id && !task.deleted
            )

        }), sortBy).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }
)
const selectOverdue = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,
    (state, sortBy, project_id) => project_id,

    (tasks, sortBy, project_id) => {
        return tasks.filter(task => task.project_id === project_id && (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && (!task.completed)).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }
)



export default function Project({renderCard, ...props}) {

    const sortBy = useReadLocalStorage("sort")
    const _project_ = useSelector(state => state.current.project)
    const showCompleted = useReadLocalStorage("showCompleted")
    const showPinned = useReadLocalStorage("showPinned")
    const showOverdue = useReadLocalStorage("showOverdue")

    const tasks = useSelector((state) => selectTasks(state, sortBy, props.id, showCompleted))
    const overdue = useSelector((state) => selectOverdue(state, sortBy, props.id))
    const pinned = useSelector((state) => selectPinned(state, sortBy))


    return (
        <div>
            <TopHeader overdue={overdue}/>
            {(showPinned && pinned.length) ?
                <TaskGroup key={"projectpinned"} view={"project"} title={"Pinned"}>
                    {pinned.map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {(overdue.length && showOverdue) ?
                (
                    <TaskGroup count={Object.values(overdue).length} key={"projectoverdue"} view={"project"} title={"Overdue"}>
                        {overdue.map((card, i) => renderCard(card, i))}
                    </TaskGroup>
                )
                : ""}

            {Object.keys(tasks).length ?
                Object.keys(tasks).map((group) => {
                    return (
                        <TaskGroup count={
                            Object.values(tasks[group]).length
                        } key={_project_.id + group} view={_project_.id} title={(sortBy === "due" || sortBy === "updated_at") ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

        </div>
    )
}
