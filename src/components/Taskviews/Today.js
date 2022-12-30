import TaskHeader from "../TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {sortF} from "./Sort";

export default function Today({renderCard}) {
    const sortBy = useReadLocalStorage("sort")
    const sortDirection = useReadLocalStorage("direction")
    const showCompleted = useReadLocalStorage("showCompleted")

    const _data_ = {
        today: {
            tasks: [...useSelector(state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                )
            )].sort((a, b) => {
                return sortF(a, b, sortBy)

            }),
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
            <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                <TaskHeader/></div>

            {_data_.today.tasks.length
                ? Object.values(_data_.today.tasks).map((card, i) => renderCard(card, i))
                : <NoTasks/>
            }
            {_data_.today.completed.length && JSON.parse(showCompleted) ?
                (
                    <div>
                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                        {Object.values(_data_.today.completed).map((card, i) => renderCard(card, i))}
                    </div>
                )
                : ""}

        </div>
    )
}