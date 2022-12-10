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
import {BsCalendar} from "react-icons/bs";
import ProjectSelect from "./ProjectSelect";
import {Listbox} from '@headlessui/react'

export const Card2 = ({id, card, index, moveCard}) => {

    const [modelOpen, setModalOpen] = useState(false)
    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [due, setDue] = useState(new Date(card.due));

    const error = useSelector(state => state.error)

    const _task_ = useSelector(state => state.tasks.find(
        task => task.id === card.id
    ))
    const project = useSelector(state => state.projects.find(
        project => _task_.project_id === project.id
    ))
    const showCompleted = useReadLocalStorage("showCompletedTasks")

    const dispatch = useDispatch()


    const clickHandler = (e) => {
        if (e.target.classList.contains("click")) {
            setModalOpen(true)
        }
    }

    const undo = (id) => {
        dispatch(toggleCompleted({
            id: id,
            completed: 1
        }))
    }

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onStatusChange = () => {

        (async () => {
            setTaskCompleted(!taskCompleted)
            await timeout(500);
            try {
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

        })()

    }

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={'flex items-center space-x-2 hover:cursor-pointer hover:underline'}>
            <div className={`whitespace-nowrap text-center text-sm `}>
                <DateBadge date={due}/>
            </div>

        </div>
    ))


    const outsideClicked = () => {

    }

    const onProjectChange = (selected) => {
        if (selected.id) {
            dispatch(updateTask({
                ..._task_,
                project_id: selected.id
            }))
        }
    }

    const onDateChange = (date) => {
        dispatch(updateTask({
            ..._task_, due: format(new Date(date), "Y-M-dd")
        }))
    }

    if (error) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <div onClick={clickHandler} className={`click hover:cursor-pointer hover:bg-gray-50_ flex items-center w-full h-16 border-b mb-3 bg-white rounded-xl shadow-sm ${taskCompleted ? "opacity-40" : ""}`}>
            <input checked={taskCompleted} onChange={onStatusChange} className={'ml-4 mr-4 check'} type={"checkbox"}/>
            <div className={`flex-grow hover:cursor-pointer click ${_task_.completed ? "line-through" : ""}`}>{_task_.name}</div>
            <div>
                <DatePicker
                    selected={due}
                    onChange={onDateChange}
                    customInput={
                        <DateCustomInput/>
                    }
                    todayButton={"Today"}
                    dateFormat={"yyyy-MM-dd"}>

                    <div onClick={() => setDue(null)} className={'font-bold py-2 bg-gray-300 text-center hover:cursor-pointer hover:underline'}>
                        Clear date
                    </div>

                </DatePicker>
            </div>

            <ProjectSelect outsideClicked={outsideClicked} onProjectChange={onProjectChange}>
                <Listbox.Button>
                    <div style={{backgroundColor: _task_.project_color}} className={'h-2 w-2 rounded-full ml-3 mr-6'}></div>
                </Listbox.Button>
            </ProjectSelect>
            <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={{..._task_}}/>
        </div>
    )
}
