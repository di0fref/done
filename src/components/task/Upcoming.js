import {capitalize, formatDate, groupBy, selectPinned} from "../helper";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "./NoTasks";
import TopHeader from "./TopHeader";
import {sortF, sortGroup} from "./Sort";
import TaskGroup from "./TaskGroup";
import {createSelector} from "@reduxjs/toolkit";

const selectTasks = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,
    (state, sortBy, group) => group,

    (tasks, sortBy, group) => {
        const groups = groupBy(tasks.filter(
            task => (new Date(task.due).setHours(0, 0, 0, 0) > new Date().setHours(0, 0, 0, 0)) && (!task.completed) && !task.deleted
        ), group)

        const sortedGroups = sortGroup(groups)

        Object.values(sortedGroups).map((group) => (
                group.sort((a, b) => (
                    sortF(a, b, sortBy)
                ))
            )
        )
        return sortedGroups
    }
)


export default function Upcoming({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const groupBy = useReadLocalStorage("group")

    const showPinned = useReadLocalStorage("showPinned")

    const tasks = useSelector((state) => selectTasks(state, sortBy, groupBy))
    const pinned = useSelector((state) => selectPinned(state, sortBy))

    return (
        <div className={'pb-12'}>
            <TopHeader overdue={[]}/>

            {(showPinned && pinned.length) ?
                <TaskGroup key={"pinnedupcoming"} view={"upcoming"} title={"Pinned"}>
                    {pinned.map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {Object.keys(tasks).length ?
                Object.keys(tasks).map((group) => {

                    if (groupBy) {
                        return (
                            <TaskGroup count={Object.values(tasks[group]).length} key={"upcoming" + group} view={"upcoming"} title={(groupBy === "due" || groupBy === "updated_at") ? formatDate(group, true) : capitalize(group)}>
                                <div className={''}>
                                    {Object.values(tasks[group]).map((task, i) => {
                                        return renderCard(task, i)
                                    })}
                                </div>
                            </TaskGroup>
                        )
                    } else {
                        return Object.values(tasks[group]).map((task, i) => {
                            return renderCard(task, i)
                        })
                    }


                }) : <NoTasks/>}

        </div>
    )
}
