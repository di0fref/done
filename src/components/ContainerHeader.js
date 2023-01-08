import TaskHeader from "./task/TaskHeader";
import AddTask from "./AddTask";

export default function ContainerHeader() {
    return (
        <div className={'pb-4 mt-7 border-b_ p-2 dark:border-gray-700 mb-5_ relative'}>
            <TaskHeader/>
            <AddTask/>
        </div>
    )
}
