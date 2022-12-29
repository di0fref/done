import TaskHeader from "../TaskHeader";
import {useSelector} from "react-redux";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import {useEffect} from "react";
import {sortF} from "./Sort";

export default function Project({renderCard, ...props}) {
    const sortBy = useReadLocalStorage("sort")
    const sortDirection = useReadLocalStorage("direction")
    const showCompleted = useReadLocalStorage("showCompleted")


    useEffect(() => {
        console.log(showCompleted);
    }, [showCompleted])

    const _data_ = {
        project: {
            tasks: [...useSelector(
                state => state.tasks.filter(
                    task => task.project_id === props.id && (!task.completed)
                )
            )].sort((a, b) => {
                 return sortF(a, b, sortBy)
            }),
            completed: [...useSelector(
                state => state.tasks.filter(
                    task => task.project_id === props.id && (task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            })
        },
    }
    return (
        <>
            <div className={'mb-2 mt-7 font-bold_ border-b _p-2 dark:border-gray-700 mb-5 sub-header'}>
                <TaskHeader/></div>
            {_data_.project.tasks.length
                ? Object.values(_data_.project.tasks).map((card, i) => renderCard(card, i))
                : <NoTasks/>
            }
            {_data_.project.completed.length && showCompleted ?
                (
                    <div>
                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                        {Object.values(_data_.project.completed).map((card, i) => renderCard(card, i))}
                    </div>
                )
                : ""}
        </>
    )
}
