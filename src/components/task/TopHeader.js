import TaskHeader from "./TaskHeader";
import AddTask from "./AddTask";

export default function TopHeader({overdue, sendJsonMessage}){
    return(
        <div className={'mt-2.5 pt-2 dark:border-gray-700 text-xl font-medium mr-12'}>
            <div className={'mb-4'}><TaskHeader overdue={overdue} sendJsonMessage={sendJsonMessage}/></div>
            <div className={'mb-4'}><AddTask sendJsonMessage={sendJsonMessage}/></div>
        </div>
    )
}
