import TaskHeader from "../TaskHeader";

export default function Default({_data_, renderCard}){
    return(
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
