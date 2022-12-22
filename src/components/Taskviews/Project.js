import TaskHeader from "../TaskHeader";

export default function Project({_data_, renderCard}){
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
