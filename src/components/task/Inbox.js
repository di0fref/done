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

    (tasks, sortBy) => {
        return groupBy(tasks.filter(
            task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed && task.project_id === "" && !task.deleted)
        ), sortBy).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }
)
const selectOverdue = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,

    (tasks, sortBy) => {
        return tasks.filter(
            task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && (!task.completed && task.project_id === "" && !task.deleted)
        ).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }
)


export default function Inbox({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const showPinned = useReadLocalStorage("showPinned")

    const tasks = useSelector((state) => selectTasks(state, sortBy))
    const overdue = useSelector((state) => selectOverdue(state, sortBy))
    const pinned = useSelector((state) => selectPinned(state, sortBy))

    return (
        <div>
            <TopHeader overdue={overdue}/>
            {(showPinned && pinned.length) ?
                <TaskGroup key={"pinnedinbox"} view={"inbox"} title={"Pinned"}>
                    {Object.values(pinned).map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {Object.keys(tasks).length ?
                Object.keys(tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(tasks[group]).length} key={"inbox" + group} view={"inbox"} title={(sortBy === "due" || sortBy === "updated_at") ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

        </div>
    )
}
