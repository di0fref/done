import {useEffect, useRef, useState} from "react";
import _Datepicker from "./_Datepicker";
import {format, formatRelative} from "date-fns";
import enGB from 'date-fns/locale/en-GB';
import {HiBars2, HiBars4, HiCalendar, HiDocument} from "react-icons/hi2";
import TaskModal from "./TaskModal";

function Task(props) {

    const [modelOpen, setModalOpen] = useState(false);
    const [task, setTask] = useState(props.task)

    const setTaskDate = (date) => {
        task.date = date;
        setTask({
            ...task,
            date: date
        });
    };

    const onNameChange = (e) => {
        setTask({
            ...task,
            name: e.target.value
        })
    }
    const onNoteChange = (e) => {
        setTask({
            ...task,
            description: e.target.value
        })
    }

    const onStatusChange = (e) => {
        setTask({
            ...task,
            completed: !task.completed
        })
    }

    const formatRelativeLocale = {
        lastWeek: "'Last' eeee",
        yesterday: "'Yesterday'",
        today: "'Today'",
        tomorrow: "'Tomorrow'",
        nextWeek: "'Next' eeee",
        other: 'yyyy-MM-dd',
    };

    const locale = {
        ...enGB,
        formatRelative: (token) => formatRelativeLocale[token],
    };

    const clickHandler = (e) => {
        if (e.target.type !== "checkbox") {
            setModalOpen(true)
        }
    }

    return (

        <div onClick={clickHandler} className={'flex  px-4 py-2.5 hover:bg-gray-100 border-b hover:cursor-pointer'}>
            <div className={'w-10'}>
                <input checked={task.completed} onChange={onStatusChange} type={"checkbox"} className={'mb-[2px] h-4 w-4 form-checkbox bg-white  rounded-full'}/>
            </div>
            <div className={'text-task outline-0  flex-grow text-gray-600 focus:border-none focus:ring-0 border-none'}>
                <div>{task.name}</div>
                <div className={`flex items-center justify-start ${(new Date(task.date) > new Date())?"":"text-red-700"}`}>
                    <div className={`mb-[1px] mr-1 text-ss `}><HiCalendar/></div>
                    <div className={`text-ss`}>{task.date ? format(new Date(task.date), "dd MMM YYY") : null}</div>
                </div>
            </div>
            <div className={'w-32 ml-auto flex-shrink-0 text-xs text-right text-gray-400'}>
                {task.date ? format(new Date(task.date), "w") : null}
            </div>
            <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={task}/>
        </div>
    )
}

export default Task
