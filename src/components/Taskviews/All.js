import TaskHeader from "../TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";

export default function All({renderCard}) {

    const sort = useReadLocalStorage("sort")
    const sortDirection = useReadLocalStorage("sortDirection")
    const showCompleted = useReadLocalStorage("showCompleted")

    const _data_ = {
        all:
            {
                tasks: [...useSelector(
                    state => state.tasks.filter(
                        task => (!task.completed)
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
                <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                    <TaskHeader/>
                </div>
                {Object.values(_data_.all.tasks).map((card, i) => renderCard(card, i))}
            </div>
            {_data_.all.completed.length && JSON.parse(showCompleted)?
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
