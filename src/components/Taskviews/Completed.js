import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";
import TopHeader from "./TopHeader";
import {capitalize, formatDate, groupBy} from "../helper";
import TaskGroup from "./TaskGroup";

export default function Completed({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const _data_ = {

        completed: groupBy([...useSelector(
            state => state.tasks.filter(
                task => (task.completed && !task.deleted)
            )
        )].sort((a, b) => {
            return sortF(a,b, sortBy)
        }),sortBy),

    }

    console.log(_data_.completed);

    return (
        <div>
            <TopHeader/>

            {Object.keys(_data_.completed).length ?
                Object.keys(_data_.completed).map((group) => {
                    return (
                        <TaskGroup count={Object.values(_data_.completed[group]).length} key={"completed" + group} view={"completed"} title={(sortBy === "due" || sortBy === "completed_at") ? formatDate(group, true) : capitalize(group)}>
                            {Object.values(_data_.completed[group]).map((task, i) => {
                                return renderCard(task, i)
                            })}
                        </TaskGroup>
                    )
                }) : <NoTasks/>}

        </div>
    )
}
