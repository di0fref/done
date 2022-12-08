import {forwardRef, useEffect, useRef, useState} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from './ItemTypes.js'
import {GrDrag} from "react-icons/gr";
import {HiCalendar, HiEllipsisHorizontal, HiOutlineFlag} from "react-icons/hi2";
import {format} from "date-fns";
import TaskModal from "./TaskModal";
import {CiCalendar} from "react-icons/ci";
import DatePicker from "react-datepicker";
import {delay, formatDate, getDateColor} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../redux/taskSlice";
import {toast} from "react-toastify";
import {useReadLocalStorage} from "usehooks-ts";
import DateBadge from "./DateBadge";

export const Card2 = ({id, card, index, moveCard}) => {

    const [modelOpen, setModalOpen] = useState(false)
    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [taskDate, setTaskDate] = useState(false)

    const error = useSelector(state => state.error)

    const _task_ = useSelector(state => state.tasks.find(
        task => task.id === card.id
    ))
    const project = useSelector(state => state.projects.find(
        project => _task_.project_id === project.id
    ))
    const showCompleted = useReadLocalStorage("showCompletedTasks")

    const dispatch = useDispatch()


    const dragRef = useRef(null)
    const previewRef = useRef(null)

    const clickHandler = (e) => {
        if (e.target.type !== "checkbox") {
            setModalOpen(true)
        }
    }

    const undo = (id) => {
        dispatch(toggleCompleted({
            id: id,
            completed: 1
        }))
    }
    const _onStatusChange = (e) => {

        setTaskCompleted(!_task_.completed);
        const id = _task_.id

        dispatch(toggleCompleted(_task_))

        toast.success(
            <div>1 task was completed <button className={'ml-4 hover:underline text-red-700'} onClick={() => {
                undo(id)
            }}>undo</button></div>)
    }


    const onStatusChange = async (userId) => {
        try {
            setTaskCompleted(!_task_.completed);
            const id = _task_.id
            const task = await dispatch(toggleCompleted(_task_)).unwrap()

            task.completed && toast.success(
                <div>1 task was completed
                    <button className={'ml-4 hover:underline text-red-700'} onClick={() => {
                        undo(id)
                    }}>undo
                    </button>
                </div>)


        } catch (err) {
            console.log(err);
            toast.error(`Something went wrong. Please contact support`)
        }
    }

    const onDateChange = (date) => {
        dispatch(updateTask({
            ..._task_, due: format(new Date(date), "Y-M-dd")
        }))
    }


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className={'flex items-center'} onClick={onClick}>
            {/*<div className={'text-green-600 pl-2 mr-1'}><CiCalendar/></div>*/}
            <div className={'text-black/70 px-2 text-sm'}>
                <CiCalendar className={'h-5 w-5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded'}/>
            </div>
        </button>
    ))

    if (error) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <div className={'flex items-center w-full h-16 border-b mb-3 bg-white rounded-2xl shadow'}>
            <input className={'ml-4 mr-4 check'} type={"checkbox"}/>
            <div className={`flex-grow ${_task_.completed ? "line-through" : ""}`}>{_task_.name}</div>
            <div><DateBadge date={_task_.due}/></div>
            <div style={{backgroundColor: _task_.project_color}} className={'h-3 w-3 rounded-full ml-3 mr-6'}> </div>
        </div>
    )
}
