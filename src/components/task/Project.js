import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "./NoTasks";
import {sortF, sortGroup} from "./Sort";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy, selectPinned} from "../helper";

import TaskGroup from "./TaskGroup";
import {useParams} from "react-router-dom";
import {createSelector} from "@reduxjs/toolkit";
import PrioBadge from "../badges/PrioBadge";
import DateBadge from "../badges/DateBadge";
import {useEffect} from "react";
import {BsExclamationCircleFill} from "react-icons/bs";


const selectTasks = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,
    (state, sortBy, project_id) => project_id,
    (state, sortBy, project_id, showCompleted) => showCompleted,
    (state, sortBy, project_id, showCompleted, group) => group,

    (tasks, sortBy, project_id, showCompleted, group) => {
        const groups = groupBy(tasks.filter(task => {

            return (showCompleted
                ? (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && task.project_id === project_id && !task.deleted
                : (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && task.project_id === project_id && !task.deleted && !task.completed)

        }), group)


        const sortedGroups = sortGroup(groups)

        Object.values(sortedGroups).map((group) => (group.sort((a, b) => (sortF(a, b, sortBy)))))
        return sortedGroups


    })
const selectOverdue = createSelector((state) => state.tasks, (state, sortBy) => sortBy, (state, sortBy, project_id) => project_id,

    (tasks, sortBy, project_id) => {
        return tasks.filter(task =>
            task.project_id === project_id &&
            (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) &&
            (!task.completed)
        ).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    })


export default function Project({renderCard, setOverDue, ...props}) {

    const sortBy = useReadLocalStorage("sort")
    const groupBy = useReadLocalStorage("group")

    const _project_ = useSelector(state => state.current.project)
    const showCompleted = useReadLocalStorage("showCompleted")
    const showPinned = useReadLocalStorage("showPinned")
    const showOverdue = useReadLocalStorage("showOverdue")

    const tasks = useSelector((state) => selectTasks(state, sortBy, props.id, showCompleted, groupBy))
    const overdue = useSelector((state) => selectOverdue(state, sortBy, props.id))
    const pinned = useSelector((state) => selectPinned(state, sortBy))

    useEffect(() => {
        setOverDue(overdue)
    }, [overdue])


    if (!_project_) {
        return (
            <div className={'flex items-center space-x-2 mx-auto'}>
                <BsExclamationCircleFill className={'text-red-600'}/>
                <div>There is no such project, or you dont have access to it.</div>
            </div>
        )

    }

    return (<div>
        {/*<TopHeader overdue={overdue} sendJsonMessage={sendJsonMessage}/>*/}
        {(showPinned && pinned.length) ? <TaskGroup key={"projectpinned"} view={"project"} title={"Pinned"}>
            {pinned.map((card, i) => renderCard(card, i))}
        </TaskGroup> : ""}

        {(overdue.length && showOverdue) ? (
            <TaskGroup count={Object.values(overdue).length} key={"projectoverdue"} view={"project"} title={"Overdue"}>
                {overdue.map((card, i) => renderCard(card, i))}
            </TaskGroup>) : ""}

        {Object.keys(tasks).length ?
            Object.keys(tasks).map((group) => {


                if (groupBy) {
                    return (
                        <TaskGroup count={Object.values(tasks[group]).length} key={_project_.id + group} view={_project_.id} title={(groupBy === "due" || groupBy === "updated_at") ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>)
                } else {
                    {
                        return (Object.values(tasks[group]).map((task, i) => {
                            return renderCard(task, i)
                        }))
                    }
                }


            }) : <NoTasks/>}

    </div>)
}
