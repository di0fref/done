import {capitalize, formatDate, groupBy} from "../helper";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import TopHeader from "./TopHeader";
import {sortF} from "./Sort";
import TaskGroup from "./TaskGroup";
import {useParams} from "react-router-dom";

export default function Upcoming({renderCard}) {

    const params = useParams()
    const showCompleted = useReadLocalStorage("showCompleted")

    const sortBy = useReadLocalStorage("sort")
    const showPinned = useReadLocalStorage("showPinned")

    const _data_ = {

        tasks: groupBy([...useSelector(
            state => state.tasks.filter(
                task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed) && !task.deleted
            ))].sort((a, b) => {
            return sortF(a, b, sortBy)
        }), sortBy),

        completed: [...useSelector(
            state => state.tasks.filter(
                task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (task.completed === true) && !task.deleted
            ))].sort((a, b) => {
            return new Date(b.due) < new Date(a.due) ? 1 : -1;
        }),

        overdue: [...useSelector(
            state => state.tasks.filter(
                task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && (!task.completed) && !task.deleted
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
            <TopHeader overdue={_data_.overdue}/>

            {(showPinned && _data_.pinned.length) ?
                <TaskGroup key={"pinnedupcoming"} view={"upcoming"} title={"Pinned"}>
                    {Object.values(_data_.pinned).map((card, i) => renderCard(card, i))}
                </TaskGroup>
                : ""}

            {Object.keys(_data_.tasks).length ?
                Object.keys(_data_.tasks).map((group) => {
                    return (
                        <TaskGroup count={Object.values(_data_.tasks[group]).length} key={"upcoming" + group} view={"upcoming"} title={(sortBy === "due" || sortBy==="updated_at") ? formatDate(group, true) : capitalize(group)}>
                            <div className={''}>
                                {Object.values(_data_.tasks[group]).map((task, i) => {
                                    return renderCard(task, i)
                                })}
                            </div>
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

            {/*{_data_.completed.length ?*/}
            {/*    (*/}
            {/*        <TaskGroup key={"upcomingcompleted"} view={"upcomig"} title={"Completed"}>*/}
            {/*            {Object.values(_data_.completed).map((card, i) => renderCard(card, i))}*/}
            {/*        </TaskGroup>*/}
            {/*    )*/}
            {/*    : ""}*/}
        </div>
    )
}
