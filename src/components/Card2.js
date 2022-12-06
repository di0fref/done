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
        <div className={`${_task_.completed?"line-through opacity-40":""} hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b h-14 text-center px-3`}>
            <div className={'w-72 text-left whitespace-nowrap overflow-hidden text-ellipsis flex items-center space-x-4'}>
                <input checked={_task_.completed} type={"checkbox"} className={'focus:ring-0 h-5 w-5 form-checkbox bg-white rounded-full'}/>
                <div>{_task_.name}</div>
            </div>
            <div className={'w-32'}>High</div>
            <div className={'w-32'}>{_task_.prio}</div>
            <div className={`w-32 flex items-center justify-start opacity-60 ${getDateColor(_task_.due)}`}>
                <div className={`mb-[1px] mr-1 `}>
                    {_task_.due ? <HiCalendar/> : null}
                </div>
                <div className={`text-sm_`}>{_task_.due ? formatDate(_task_.due) : null}</div>

            </div>
            <div className={'w-32'}>{_task_.project}</div>
        </div>
        // <div>
        //     <div className={`flex hover:cursor-pointer group ${_task_.completed ? "opacity-60" : ""}`}>
        //         <div  className={`cursor-move w-6 py-4 group-hover:visible invisible`}>
        //             <GrDrag className={'mt-[4px]'}/>
        //         </div>
        //         <div className={'mt-0.5 py-4'}>
        //             <input checked={_task_.completed && taskCompleted} onChange={onStatusChange} type={"checkbox"} className={'focus:ring-0 mb-[5px] h-5 w-5 form-checkbox bg-white rounded-full'}/>
        //         </div>
        //         <div onClick={clickHandler} className={'ml-4 pt-4 outline-0 flex-grow text-gray-600 focus:border-none focus:ring-0 border-none'}>
        //             <div>
        //                 <p className={`text-md ${_task_.completed ? "line-through" : ""}`}>{_task_.name}</p>
        //                 {/*<p className={'text-sm mt-1 text-gray-400 whitespace-pre-wrap'}>{_task_.text ? _task_.text.substring(0, 100)+"..." : null}</p>*/}
        //             </div>
        //             <div className={`pb-4 border-b mt-1 flex items-center justify-start opacity-60
        //                 ${getDateColor(_task_.due)}`}
        //           >
        //                 <div className={`mb-[1px] mr-1 text-sm `}>
        //                     {_task_.due ? <HiCalendar/> : null}
        //                 </div>
        //                 <div className={`text-sm`}>{_task_.due ? formatDate(_task_.due) : null}</div>
        //             </div>
        //         </div>
        //
        //         <div className={`flex flex-col border-b`}>
        //             <div className={`flex h-1/2 items-center pt-4 group-hover:visible invisible`}>
        //                 <div className={`flex-grow`}>
        //                     {/*<button data-tip={"Set due date"}>*/}
        //                     <DatePicker
        //                         selected={""}
        //                         onChange={onDateChange}
        //                         customInput={
        //                             <DateCustomInput/>
        //                         }
        //                         dateFormat={"yyyy-MM-dd"}
        //                     />
        //                     {/*</button>*/}
        //                 </div>
        //                 <div className={'flex-grow group-hover:visible invisible'}>
        //                     <button>
        //                         <HiEllipsisHorizontal data-tip={"Task actions"} className={'h-5 w-5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded'}/>
        //                     </button>
        //                 </div>
        //             </div>
        //             <div className={'mt-1 w-20_'}>
        //                 <div className={'flex justify-end items-center space-x-2'}>
        //                     <div style={{background: _task_.project_color}} className={`w-2 h-2 rounded-full`}></div>
        //                     <div className={'text-sm text-gray-500'}>{_task_.project}</div>
        //                 </div>
        //             </div>
        //         </div>
        //
        //         <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={{..._task_}}/>
        //     </div>
        // </div>
    )
}
