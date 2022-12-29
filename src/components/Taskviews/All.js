import TaskHeader from "../TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";

export default function All({renderCard}) {

    const sortBy = useReadLocalStorage("sort")
    const sortDirection = useReadLocalStorage("direction")
    const showCompleted = useReadLocalStorage("showCompleted")

    const _data_ = {
        all:
            {
                tasks: [...useSelector(
                    state => state.tasks.filter(
                        task => (!task.completed)
                    )
                )].sort((a, b) => {
                    return sortF(a, b, sortBy)
                }),

                completed: [...useSelector(
                    state => state.tasks.filter(
                        task => (task.completed === true)
                    )
                )].sort((a, b) => {
                    return new Date(b.due) < new Date(a.due) ? 1 : -1;
                })
            },
    }
    return (
        <>
            <div>
                <div className={'mb-2 mt-7 border-b p-2 dark:border-gray-700 mb-5 relative'}>
                    <TaskHeader/>
                </div>

                {_data_.all.tasks.length
                    ? Object.values(_data_.all.tasks).map((card, i) => renderCard(card, i))
                    : <NoTasks/>
                }
            </div>
            {_data_.all.completed.length && JSON.parse(showCompleted) ?
                (
                    <div>
                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                        {Object.values(_data_.all.completed).map((card, i) => renderCard(card, i))}
                    </div>
                )
                : ""}
        </>
    )
}
