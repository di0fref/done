import {BsCheck} from "react-icons/bs";

export default function NoTasks() {
    return (
        <div className={'w-full  flex items-center justify-center'}>
            <div><BsCheck className={'h-6 w-6 text-green-600'}/></div>
            <div>Congratulations, you have no tasks to complete.</div>
        </div>
    )
}