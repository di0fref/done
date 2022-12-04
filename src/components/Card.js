import {forwardRef, useEffect, useRef, useState} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from './ItemTypes.js'
import {GrDrag} from "react-icons/gr";
import {HiCalendar, HiEllipsisHorizontal, HiOutlineFlag} from "react-icons/hi2";
import {format} from "date-fns";
import TaskModal from "./TaskModal";
import {CiCalendar} from "react-icons/ci";
import DatePicker from "react-datepicker";
import {formatDate} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted} from "../redux/taskSlice";
import {motion, AnimatePresence} from "framer-motion"
import {toast} from "react-toastify";


export const Card = ({id, card, index, moveCard}) => {

    const [modelOpen, setModalOpen] = useState(false)
    const [task, setTask] = useState(card)
    const [taskDate, setTaskDate] = useState(false)

    const project = useSelector(state => state.projects.find(
        project => task.project_id === project.id
    ))

    const __task = useSelector(state => state.tasks.find(
        task => task.id === card.id
    ))
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
        setTask(
            {...task, completed: !task.completed}
        )
        const id = task.id
        delay(500).then(() => {
            dispatch(toggleCompleted(task))
            toast.success(<div>1 task was completed <button className={'ml-4 hover:underline text-red-700'} onClick={() => {undo(id)}}>undo</button></div>)
        })
    }

    const onDateChange = (date) => {
        setTask({
            ...task,
            due: format(new Date(date), "Y-M-d")
        })
    }

    const delay = (time) => {
        return new Promise(resolve => setTimeout(resolve, time));
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
            <div className={`flex hover:cursor-pointer group ${task.completed ? "opacity-40" : ""}`}>
                <div ref={dragRef} data-handler-id={handlerId} className={`cursor-move w-6 py-4 group-hover:visible invisible`}>
                    <GrDrag className={'mt-[4px]'}/>
                </div>
                <div className={'border-b_ py-4'}>
                    <input checked={task.completed} onChange={onStatusChange} type={"checkbox"} className={'focus:ring-0 mb-[5px] h-4 w-4 form-checkbox bg-white rounded-full'}/>
                </div>
                <div onClick={clickHandler} className={'ml-4 pt-4 outline-0 flex-grow text-gray-600 focus:border-none focus:ring-0 border-none'}>
                    <div>
                        <p className={''}>{task.name}</p>
                        <p className={'text-sm mt-1 text-gray-400 whitespace-pre-wrap'}>{task.text ? task.text.substring(0, 100) : null}</p>
                        {/*{task.id}*/}
                    </div>
                    <div className={`pb-4 border-b mt-1 flex items-center justify-start 
                        ${(new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) ? "text-red-600" : ""}`}
                    >
                        <div className={`mb-[1px] mr-1 text-sm `}>
                            {task.due ? <HiCalendar/> : null}
                        </div>
                        <div className={`text-sm`}>{task.due ? formatDate(task.due) : null}</div>
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
                        <div className={'flex justify-end items-center space-x-1'}>
                            <div style={{background: task.project_color}} className={`w-2 h-2 rounded-full`}></div>
                            <div className={'text-sm text-gray-500'}>{task.project}</div>
                        </div>
                    </div>
                </div>

                <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={task} project={project}/>
            </div>
        </div>
    )
}
