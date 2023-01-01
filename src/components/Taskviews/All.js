import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy} from "../helper";
import TaskGroup from "./TaskGroup";

export default function All({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const showCompleted = useReadLocalStorage("showCompleted")
    const showPinned = useReadLocalStorage("showPinned")

    const _data_ = {
        tasks: groupBy([...useSelector(state => state.tasks.filter(task => !task.completed && !task.deleted))].sort((a, b) => {
            return sortF(a, b, sortBy)
        }), sortBy),

        completed: [...useSelector(
            state => state.tasks.filter(
                task => (task.completed === true && !task.deleted)
            )
        )].sort((a, b) => {
            return new Date(b.due) < new Date(a.due) ? 1 : -1;
        }),
        overdue: [...useSelector(
            state => state.tasks.filter(
                task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && (!task.completed)
            )
        )].sort((a, b) => {
            return sortF(a, b, sortBy)
        }),

        pinned: [...useSelector(state => state.tasks.filter(task => task.pinned && !task.deleted && !task.completed)
        )].sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }

    return (
        <div>
            <TopHeader/>
            {(showPinned && _data_.pinned.length) ?
                <TaskGroup key={"pinnedall"} view={"all"} title={"Pinned"}>
                    {Object.values(_data_.pinned).map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {Object.keys(_data_.tasks).length ?
                Object.keys(_data_.tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(_data_.tasks[group]).length} key={"all" + group} view={"all"} title={sortBy === "due" ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(_data_.tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}


            {_data_.completed.length && showCompleted ?
                (
                    <TaskGroup key={"completedall"} view={"all"} title={"Completed"}>
                        {Object.values(_data_.completed).map((card, i) => renderCard(card, i))}
                    </TaskGroup>
                )
                : ""}
        </div>
    )
}
