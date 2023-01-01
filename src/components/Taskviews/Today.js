import TaskHeader from "./TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";
import AddTask from "../AddTask";
import TopHeader from "./TopHeader";
import TaskGroup from "./TaskGroup";
import {capitalize, formatDate, groupBy} from "../helper";

export default function Today({renderCard}) {
    const sortBy = useReadLocalStorage("sort")
    const showCompleted = useReadLocalStorage("showCompleted")

    const _data_ = {
        today: {
            tasks: groupBy([...useSelector(state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                )
            )].sort((a, b) => {
                return sortF(a, b, sortBy)

            }), sortBy),
            completed: [...useSelector(state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
            }),

            overdue: [...useSelector(
                state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) && task.due != null) && (!task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            }),
        },
    }

    return (
        <div>
            {/*{Object.keys(_data_.overdue).length ? (*/}
            {/*        <div className={''}>*/}
            {/*            <div className={'font-bold text-lg mt-4_ border-b_ pb-1'}>*/}
            {/*                Overdue*/}
            {/*            </div>*/}
            {/*            {Object.values(_data_.overdue).map((card, i) => renderCard(card, i))}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*    : null}*/}
            {/*{Object.keys(_data_.overdue).length ? (*/}
            {/*    <div className={'ml-6_ font-bold text-lg mt-4_ border-b_ pb-1'}>*/}
            {/*        Today*/}
            {/*    </div>*/}
            {/*) : null}*/}
            {/*<div className={'mb-2 mt-2.5 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>*/}
            {/*    <TaskHeader/>*/}
            {/*    <AddTask/>*/}
            {/*</div>*/}

            <TopHeader/>
            {_data_.today.overdue.length ?
                (
                    <TaskGroup count={Object.values(_data_.today.overdue).length} key={"todayoverdue"} view={"today"} title={"Overdue"}>
                        {Object.values(_data_.today.overdue).map((card, i) => renderCard(card, i))}
                    </TaskGroup>
                )
                : ""}

            {Object.keys(_data_.today.tasks).length ?
                Object.keys(_data_.today.tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(_data_.today.tasks[group]).length} key={"today" + group} view={"all"} title={sortBy === "due" ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(_data_.today.tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

            {_data_.today.completed.length && showCompleted ?
                (
                    <TaskGroup key={"todaycompleted"} view={"today"} title={"Completed"}>
                        {Object.values(_data_.today.completed).map((card, i) => renderCard(card, i))}
                    </TaskGroup>
                )
                : ""}

        </div>
    )
}
