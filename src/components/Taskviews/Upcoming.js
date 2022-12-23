import TaskHeader from "../TaskHeader";
import {formatDate} from "../helper";
import {useSelector} from "react-redux";

export default function Upcoming({renderCard}) {

    let prev = "";

    const _data_ = {
                    upcoming:
                {
                    tasks: [...useSelector(
                        state => state.tasks.filter(
                            task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                        ))].sort((a, b) => {
                        return new Date(b.due) < new Date(a.due) ? 1 : -1;
                    }),
                    completed: [...useSelector(
                        state => state.tasks.filter(
                            task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (task.completed === true)
                        ))].sort((a, b) => {
                        return new Date(b.due) < new Date(a.due) ? 1 : -1;
                    })
                },
    }

    return (
        <>
            <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                <TaskHeader/></div>

            {Object.values(_data_.upcoming.tasks).map((card, i) => {
                if (prev !== card.due) {
                    prev = card.due;
                    return (
                        <div key={card.id}>
                            <div className={'mb-2 mt-7 text-sm font-bold border-b p-2 dark:border-gray-700 mb-5 _sub-header '}>
                                {formatDate(card.due, true)}
                            </div>
                            {renderCard(card, i)}
                        </div>
                    )
                } else {
                    return (
                        <div key={card.id}>
                            {renderCard(card, i)}
                        </div>
                    )
                }
            })}
            {_data_.upcoming.completed.length ?
                (
                    <div>
                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                        {Object.values(_data_.upcoming.completed).map((card, i) => {
                            return renderCard(card, i)
                        })}
                    </div>
                )
                : ""}
        </>
    )
}
