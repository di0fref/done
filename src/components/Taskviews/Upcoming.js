import TaskHeader from "./TaskHeader";
import {capitalize, formatDate, groupBy} from "../helper";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import AddTask from "../AddTask";
import TopHeader from "./TopHeader";
import Coll from "./TaskGroup";
import {sortF} from "./Sort";
import TaskGroup from "./TaskGroup";

export default function Upcoming({renderCard}) {
    const sortBy = useReadLocalStorage("sort")
    const showCompleted = useReadLocalStorage("showCompleted")

    let prev = "";

    const _data_ = {
        upcoming:
            {
                tasks: groupBy([...useSelector(
                    state => state.tasks.filter(
                        task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                    ))].sort((a, b) => {
                    return sortF(a, b, sortBy)
                }), sortBy),
                completed: [...useSelector(
                    state => state.tasks.filter(
                        task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (task.completed === true)
                    ))].sort((a, b) => {
                    return new Date(b.due) < new Date(a.due) ? 1 : -1;
                }),
                overdue: [...useSelector(
                    state => state.tasks.filter(
                        task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                    )
                )].sort((a, b) => {
                    return new Date(b.due) < new Date(a.due) ? 1 : -1;
                }),
            },
    }

    return (
        <div>
            <TopHeader/>


            {Object.keys(_data_.upcoming.tasks).length ?
                Object.keys(_data_.upcoming.tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(_data_.upcoming.tasks[group]).length} key={"upcoming" + group} view={"upcoming"} title={sortBy === "due" ? formatDate(group, true) : capitalize(group)}>
                            <div className={''}>
                                {Object.values(_data_.upcoming.tasks[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                            </div>
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

            {/*{_data_.upcoming.completed.length ?*/}
            {/*    (*/}
            {/*        <TaskGroup key={"upcomingcompleted"} view={"upcomig"} title={"Completed"}>*/}
            {/*            {Object.values(_data_.upcoming.completed).map((card, i) => renderCard(card, i))}*/}
            {/*        </TaskGroup>*/}
            {/*    )*/}
            {/*    : ""}*/}
        </div>
    )
}
