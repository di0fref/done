import TaskHeader from "./TaskHeader";
import AddTask from "./AddTask";

export default function TopHeader({overdue}){
    return(
        <div className={'mt-2.5 pt-2 dark:border-gray-700 text-xl font-medium'}>
            <div className={'mb-4'}><TaskHeader overdue={overdue} /></div>
            <div className={'mb-4'}><AddTask/></div>
        </div>
    )
}
