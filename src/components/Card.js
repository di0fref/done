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


export const Card = ({id, card, index, moveCard}) => {

    const [modelOpen, setModalOpen] = useState(false)
    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [taskDate, setTaskDate] = useState(false)

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

    const [{handlerId}, drop] = useDrop({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!dragRef.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = dragRef.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })
    const [{isDragging}, drag, preview] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return {id, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

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
    const onStatusChange = (e) => {
        // setTask(
        //     {...task, completed: !_task_.completed}
        // )

        setTaskCompleted(!_task_.completed);
        const id = _task_.id
        dispatch(toggleCompleted(_task_))
        toast.success(
            <div>1 task was completed <button className={'ml-4 hover:underline text-red-700'} onClick={() => {
                undo(id)
            }}>undo</button></div>)
    }

    const onDateChange = (date) => {
        // setTask({
        //     ...task,
        //     due: format(new Date(date), "YYY-MM-dd")
        // })

        dispatch(updateTask({
            ..._task_, due: format(new Date(date), "Y-M-dd")
        }))

    }

    const opacity = isDragging ? 0 : 1

    const style = {}
    drag(dragRef)
    drop(preview(previewRef))

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className={'ring-btn_ flex items-center'} onClick={onClick}>
            {/*<div className={'text-green-600 pl-2 mr-1'}><CiCalendar/></div>*/}
            <div className={'text-black/70 px-2 text-sm'}>
                <CiCalendar className={'h-5 w-5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded'}/>
            </div>
        </button>
    ))

    return (

        <div ref={previewRef}
             style={{...style, opacity}}
        >
            <div className={`flex hover:cursor-pointer group ${_task_.completed ? "opacity-60" : ""}`}>
                <div ref={dragRef} data-handler-id={handlerId} className={`cursor-move w-6 py-4 group-hover:visible invisible`}>
                    <GrDrag className={'mt-[4px]'}/>
                </div>
                <div className={'border-b_ py-4'}>
                    <input checked={_task_.completed&&taskCompleted} onChange={onStatusChange} type={"checkbox"} className={'focus:ring-0 mb-[5px] h-4 w-4 form-checkbox bg-white rounded-full'}/>
                </div>
                <div onClick={clickHandler} className={'ml-4 pt-4 outline-0 flex-grow text-gray-600 focus:border-none focus:ring-0 border-none'}>
                    <div>
                        <p className={`${_task_.completed ? "line-through" : ""}`}>{_task_.name}</p>
                        <p className={'text-sm mt-1 text-gray-400 whitespace-pre-wrap'}>{_task_.text ? _task_.text.substring(0, 100) : null}</p>
                        {/*{_task_.id}*/}
                    </div>
                    <div className={`pb-4 border-b mt-1 flex items-center justify-start 
                        ${getDateColor(_task_.due)}`}
                    >
                        <div className={`mb-[1px] mr-1 text-sm `}>
                            {_task_.due ? <HiCalendar/> : null}
                        </div>
                        <div className={`text-sm`}>{_task_.due ? formatDate(_task_.due) : null}</div>
                    </div>
                </div>

                <div className={`flex flex-col border-b`}>
                    <div className={`flex h-1/2 items-center pt-4 group-hover:visible invisible`}>
                        <div className={`flex-grow`}>
                            {/*<button data-tip={"Set due date"}>*/}
                            <DatePicker
                                selected={""}
                                onChange={onDateChange}
                                customInput={
                                    <DateCustomInput/>
                                }
                                dateFormat={"yyyy-MM-dd"}
                            />
                            {/*</button>*/}
                        </div>
                        <div className={'flex-grow group-hover:visible invisible'}>
                            <button>
                                <HiEllipsisHorizontal data-tip={"Task actions"} className={'h-5 w-5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded'}/>
                            </button>
                        </div>
                    </div>
                    <div className={'mt-1 w-20_'}>
                        <div className={'flex justify-end items-center space-x-2'}>
                            <div style={{background: _task_.project_color}} className={`w-2 h-2 rounded-full`}></div>
                            <div className={'text-sm text-gray-500'}>{_task_.project}</div>
                        </div>
                    </div>
                </div>

                <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={{..._task_}}/>
            </div>
        </div>
    )
}
