import {capitalize, formatDate, groupBy, selectPinned} from "../helper";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "./NoTasks";
import TopHeader from "./TopHeader";
import {sortF} from "./Sort";
import TaskGroup from "./TaskGroup";
import {useParams} from "react-router-dom";
import {createSelector} from "@reduxjs/toolkit";

const selectTasks = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,
    (tasks, sortBy) => groupBy(tasks.filter(
        task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed) && !task.deleted
    ).sort((a, b) => {
        return sortF(a, b, sortBy)
    }), sortBy)
)


export default function Upcoming({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const showPinned = useReadLocalStorage("showPinned")

    const tasks = useSelector((state) => selectTasks(state, sortBy))
    const pinned = useSelector((state) => selectPinned(state, sortBy))

    return (
        <div>
            <TopHeader overdue={[]}/>

            {(showPinned && pinned.length) ?
                <TaskGroup key={"pinnedupcoming"} view={"upcoming"} title={"Pinned"}>
                    {Object.values(pinned).map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {Object.keys(tasks).length ?
                Object.keys(tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(tasks[group]).length} key={"upcoming" + group} view={"upcoming"} title={(sortBy === "due" || sortBy === "updated_at") ? formatDate(group, true) : capitalize(group)}>
                            <div className={''}>
                                {Object.values(tasks[group]).map((task, i) => {
                                    return renderCard(task, i)
                                })}
                            </div>
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

        </div>
    )
}
