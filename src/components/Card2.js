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
        <button className={'ring-btn_ flex items-center'} onClick={onClick}>
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
        <div className={'border-b hover:cursor-pointer hover:bg-gray-50 px-4'} onClick={clickHandler} >
            <div className={'flex items-center h-20 mb-2'}>
                <div className={'flex-grow flex-row'}>
                    <div className={'flex space-x-4'}>
                        <div>
                            <input checked={_task_.completed && taskCompleted} onChange={onStatusChange} className={'focus:ring-0 mb-[1px] h-5 w-5 form-checkbox bg-white rounded-full'} type={"checkbox"}/>
                        </div>
                        <div>{_task_.name}</div>
                    </div>
                    <div className={`ml-9 mt-2 text-sm ${getDateColor(_task_.due)} flex items-center space-x-1`}>
                        <div>{_task_.due ? <HiCalendar/> : null}</div>
                        <div>{_task_.due ? formatDate(_task_.due) : null}</div>
                    </div>
                </div>
                <div className={'flex justify-end items-center space-x-2'}>
                    <div style={{background: _task_.project_color}} className={`w-2 h-2 rounded-full`}></div>
                    <div className={'text-sm text-gray-500'}>{_task_.project}</div>
                </div>
            </div>
            <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={{..._task_}}/>
        </div>
    )
}
