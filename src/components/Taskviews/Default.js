import TaskHeader from "../TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";

export default function Default({renderCard}) {
    const sort = useReadLocalStorage("sort")
    const sortDirection = useReadLocalStorage("sortDirection")

    const _data_ = {
        today: {
            tasks: [...useSelector(state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                )
            )].sort((a, b) => {
                let sortBy = sort
                let direction = sortDirection

                if (sortBy.field === "due") {
                    if (direction.direction === "asc") {
                        return new Date(b.due) > new Date(a.due) ? 1 : -1
                    } else {
                        return new Date(b.due) < new Date(a.due) ? 1 : -1
                    }
                } else {
                    if (direction.direction === "asc") {
                        return a[sortBy.field] > b[sortBy.field] ? 1 : -1;
                    } else {
                        return a[sortBy.field] < b[sortBy.field] ? 1 : -1;
                    }
                }
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

            {Object.values(_data_.today.tasks).map((card, i) => renderCard(card, i))}

            {_data_.today.completed.length ?
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
