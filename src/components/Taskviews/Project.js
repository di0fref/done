import TaskHeader from "../TaskHeader";
import {useSelector} from "react-redux";

export default function Project({renderCard, ...props}){

    const _data_ = {
         project: {
                tasks: [...useSelector(
                    state => state.tasks.filter(
                        task => task.project_id === props.id && (!task.completed)
                    )
                )].sort((a, b) => {
                    return a.due && b.due ? (new Date(b.due) < new Date(a.due) ? 1 : -1) : -1
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
    return(
        <>
            <div>
                <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                    <TaskHeader/></div>
                {Object.values(_data_.project.tasks).map((card, i) => renderCard(card, i))}
            </div>
            {_data_.project.completed.length ?
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
