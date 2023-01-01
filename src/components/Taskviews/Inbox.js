import TaskHeader from "./TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";
import AddTask from "../AddTask";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy} from "../helper";
import TaskGroup from "./TaskGroup";

export default function Inbox({renderCard}) {
    const sortBy = useReadLocalStorage("sort")
    const sortDirection = useReadLocalStorage("direction")
    const showCompleted = useReadLocalStorage("showCompleted")
    let prev = "";

    const _data_ = {
        inbox: {
            tasks: groupBy([...useSelector(
                state => state.tasks.filter(
                    task =>(new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) &&  (!task.completed && task.project_id === "")
                )
            )].sort((a, b) => {
                return sortF(a, b, sortBy)
            }), sortBy),

            completed: [...useSelector(
                state => state.tasks.filter(
                    task => (task.due === null && task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
            }),
            overdue: [...useSelector(
                state => state.tasks.filter(
                    task =>(new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) &&  (!task.completed && task.project_id === "")
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            }),
        },
    }
    return (
        <div>
            <TopHeader/>
            {Object.keys(_data_.inbox.tasks).length ?
                Object.keys(_data_.inbox.tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(_data_.inbox.tasks[group]).length} key={"inbox" + group} view={"inbox"} title={sortBy === "due" ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(_data_.inbox.tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}
            {_data_.inbox.completed.length && JSON.parse(showCompleted) ?
                (
                    <div>
                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                        {Object.values(_data_.inbox.completed).map((card, i) => renderCard(card, i))}
                    </div>
                )
                : ""}
        </div>
    )
}
