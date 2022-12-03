import {forwardRef, useEffect, useRef, useState} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from './ItemTypes.js'
import {GrDrag} from "react-icons/gr";
import {HiCalendar, HiEllipsisHorizontal, HiOutlineFlag} from "react-icons/hi2";
import {format} from "date-fns";
import TaskModal from "./TaskModal";
import {CiCalendar} from "react-icons/ci";
import DatePicker from "react-datepicker";
import {dateFormat} from "../service/config";
import {formatDate} from "./helper";
import {useSelector} from "react-redux";


export const Card = ({id, card, index, moveCard}) => {

    const [modelOpen, setModalOpen] = useState(false)
    const [task, setTask] = useState(card)
    const [isHovering, setIsHovering] = useState(false)

    const project = useSelector(state => state.projects.filter(
        project => task.project_id === project.id
    ))

    const [taskDate, setTaskDate] = useState(false)

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
        setIsHovering(false)
    }

    const onStatusChange = (e) => {
        setTask({
            ...task,
            completed: !task.completed
        })
    }

    const onDateChange = (date) => {
        setTask({
            ...task,
            due: format(new Date(date), "Y-M-d")
        })
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
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={'flex hover:cursor-pointer'}>
                <div ref={dragRef} data-handler-id={handlerId} className={`cursor-move w-6 py-4 ${isHovering ? "visible" : "invisible"}`}>
                    <GrDrag className={'mt-[4px]'}/>
                </div>
                <div className={'border-b_ py-4'}>
                    <input checked={task.completed} onChange={onStatusChange} type={"checkbox"} className={'mb-[5px] h-4 w-4 form-checkbox bg-white rounded-full'}/>
                </div>
                <div onClick={clickHandler} className={'ml-4 pt-4 outline-0 flex-grow text-gray-600 focus:border-none focus:ring-0 border-none'}>
                    <div>
                        <p className={'text-task font-medium_'}>{task.name}</p>
                        <p className={'text-s2 mt-1 text-gray-400 whitespace-pre-wrap'}>{task.text ? task.text.substring(0, 100) : null}</p>
                    </div>
                    <div className={`pb-4 border-b mt-1 flex items-center justify-start 
                        ${(new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) ? "text-red-600" : ""}`}
                    >
                        <div className={`mb-[1px] mr-1 text-ss `}>
                            {task.due ? <HiCalendar/> : null}
                        </div>
                        <div className={`text-ss`}>{task.due ? formatDate(task.due) : null}</div>
                    </div>
                </div>

                <div className={`flex flex-col border-b`}>
                    <div className={`flex h-1/2 items-center pt-4  ${isHovering ? "visible" : "invisible"}`}>
                        <div className={`flex-grow`}>
                            {/*<button data-tip={"Set due date"}>*/}
                            <DatePicker
                                selected={taskDate}
                                onChange={onDateChange}
                                customInput={
                                    <DateCustomInput/>
                                }
                                dateFormat={"yyyy-MM-dd"}
                            />
                            {/*</button>*/}
                        </div>
                        <div className={'flex-grow'}>
                            <button>
                                <HiEllipsisHorizontal data-tip={"Task actions"} className={'h-5 w-5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded'}/>
                            </button>
                        </div>
                    </div>
                    <div className={'mt-1 w-20'}>
                        {/*<div className={'flex justify-end items-center space-x-1'}>*/}
                        {/*    <div className={'text-project text-gray-600'}>{task.project.name}</div>*/}
                        {/*    <div style={{background: task.project.color}} className={`w-2 h-2 rounded-full`}></div>*/}
                        {/*</div>*/}
                    </div>
                </div>

                <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={task} project={project[0]}/>
            </div>
        </div>
    )
}
