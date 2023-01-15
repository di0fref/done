import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "./NoTasks";
import {sortF} from "./Sort";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy} from "../helper";
import TaskGroup from "./TaskGroup";
import {useTranslation} from "react-i18next";
import {createSelector} from "@reduxjs/toolkit";

const selectTasks = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,

    (tasks, sortBy) => (
        groupBy(tasks.filter(
            task => (task.completed && !task.deleted)
        ).sort((a, b) => {
            return sortF(a, b, sortBy)
        }), sortBy)
    )
)

export default function Completed({renderCard}) {
    const {t} = useTranslation();

    const sortBy = useReadLocalStorage("sort")
    const completed = useSelector((state) => selectTasks(state, sortBy))


    return (
        <div>
            <TopHeader/>

            {Object.keys(completed).length ?
                Object.keys(completed).map((group) => {
                    return (
                        <TaskGroup count={Object.values(completed[group]).length} key={"completed" + group} view={"completed"} title={(sortBy === "due" || sortBy === "completed_at") ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(completed[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <div className={'w-full my-12 flex items-center justify-center'}>
                    <div className={'text-neutral-500 dark:text-gray-500 text-center'}>
                        <div className={'text-base mb-1'}>{t("Nothing to see here, move along.")}</div>
                    </div>
                </div>}

        </div>
    )
}
