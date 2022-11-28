import {useEffect, useRef, useState} from "react";
import _Datepicker from "./_Datepicker";
import {format, formatRelative} from "date-fns";
import enGB from 'date-fns/locale/en-GB';
import {HiBars2, HiBars4, HiCalendar, HiDocument} from "react-icons/hi2";

import TaskModal from "./TaskModal";
import {GrDrag} from "react-icons/gr";

function Task(props) {

    const [modelOpen, setModalOpen] = useState(false)
    const [task, setTask] = useState(props.task)
    const [isHovering, setIsHovering] = useState(false)

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
        setIsHovering(false)
    }

    return (

        <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}  className={'flex _px-4 _py-2.5 hover:bg-gray-100_ _border-b hover:cursor-pointer'}>
            <div className={`w-6 py-4 ${isHovering?"visible":"invisible"}`}>
                <GrDrag className={'mt-[4px]'}/>
            </div>
            <div className={'w-7 border-b py-4'}>
                <input checked={task.completed} onChange={onStatusChange} type={"checkbox"} className={'mb-[2px] h-4 w-4 form-checkbox bg-white rounded-full'}/>
            </div>
            <div onClick={clickHandler} className={'pt-4 text-task outline-0 flex-grow text-gray-600 focus:border-none focus:ring-0 border-none'}>
                <div className={''}>{task.name}</div>
                <div className={`pb-4 border-b mt-1 flex items-center justify-start ${(new Date(task.date) > new Date())?"":"text-red-700"}`}>
                    <div className={`mb-[1px] mr-1 text-ss `}><HiCalendar/></div>
                    <div className={`text-ss `}>{task.date ? format(new Date(task.date), "dd MMM YYY") : null}</div>
                </div>
            </div>
            {/*<div className={'border-b w-32 ml-auto flex-shrink-0 text-xs text-right text-gray-400'}>*/}
            {/*    {task.date ? format(new Date(task.date), "w") : null}*/}
            {/*</div>*/}
            <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={task}/>
        </div>
    )
}

export default Task
