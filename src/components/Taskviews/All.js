import TaskHeader from "./TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";
import AddTask from "../AddTask";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy} from "../helper";
import TaskGroup from "./TaskGroup";

export default function All({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const showCompleted = useReadLocalStorage("showCompleted")
    const _data_ = {
        all:
            {
                tasks: groupBy([...useSelector(state => state.tasks.filter(task => !task.completed && !task.deleted))].sort((a, b) => {
                    return sortF(a, b, sortBy)
                }), sortBy),

                completed: [...useSelector(
                    state => state.tasks.filter(
                        task => (task.completed === true)
                    )
                )].sort((a, b) => {
                    return new Date(b.due) < new Date(a.due) ? 1 : -1;
                }),
                overdue: [...useSelector(
                    state => state.tasks.filter(
                        task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))&& (!task.completed)
                    )
                )].sort((a, b) => {
                    return new Date(b.due) < new Date(a.due) ? 1 : -1;
                }),
            },
    }
    return (
        <div>
            <TopHeader/>

            {Object.keys(_data_.all.tasks).length ?
                Object.keys(_data_.all.tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(_data_.all.tasks[group]).length} key={"all" + group} view={"all"} title={sortBy === "due" ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(_data_.all.tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}



            {_data_.all.completed.length && JSON.parse(showCompleted) ?
                (
                    <TaskGroup key={"completedall"} view={"all"} title={"Completed"}>
                        {Object.values(_data_.all.completed).map((card, i) => renderCard(card, i))}
                    </TaskGroup>
                )
                : ""}
        </div>
    )
}
