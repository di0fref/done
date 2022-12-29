import TaskHeader from "../TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";

export default function Inbox({renderCard}) {
    const sortBy = useReadLocalStorage("sort")
    const sortDirection = useReadLocalStorage("direction")
    const showCompleted = useReadLocalStorage("showCompleted")

    const _data_ = {
        inbox: {
            tasks: [...useSelector(
                state => state.tasks.filter(
                    task => (task.due === null && !task.completed)
                )
            )].sort((a, b) => {
                return sortF(a, b, sortBy)

            }),
            completed: [...useSelector(
                state => state.tasks.filter(
                    task => (task.due === null && task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
            })
        },
    }
    return (
        <>
            <div>
                <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                    <TaskHeader/>
                </div>
                {_data_.inbox.tasks.length
                    ? Object.values(_data_.inbox.tasks).map((card, i) => renderCard(card, i))
                    : <NoTasks/>
                }
            </div>
            {_data_.inbox.completed.length && JSON.parse(showCompleted) ?
                (
                    <div>
                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                        {Object.values(_data_.inbox.completed).map((card, i) => renderCard(card, i))}
                    </div>
                )
                : ""}
        </>
    )
}
