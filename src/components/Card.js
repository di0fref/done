import {useRef, useState} from 'react'
import {useDrag, useDrop} from 'react-dnd'
import {ItemTypes} from './ItemTypes.js'
import {GrDrag} from "react-icons/gr";
import {HiCalendar, HiEllipsisHorizontal, HiOutlineFlag} from "react-icons/hi2";
import {format} from "date-fns";
import TaskModal from "./TaskModal";
import {CiCalendar} from "react-icons/ci";


export const Card = ({id, card, index, moveCard}) => {

    const [modelOpen, setModalOpen] = useState(false)
    const [task, setTask] = useState(card)
    const [isHovering, setIsHovering] = useState(false)


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

    const opacity = isDragging ? 0 : 1

    const style = {}
    drag(dragRef)
    drop(preview(previewRef))


    return (
        <div ref={previewRef}
             style={{...style, opacity}}
        >
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={'flex _px-4 _py-2.5 hover:bg-gray-100_ _border-b hover:cursor-pointer'}>
                <div ref={dragRef} data-handler-id={handlerId}  className={`cursor-move w-6 py-4 ${isHovering ? "visible" : "invisible"}`}>
                    <GrDrag className={'mt-[4px]'}/>
                </div>
                <div className={'w-7 border-b py-4'}>
                    <input checked={task.completed} onChange={onStatusChange} type={"checkbox"} className={'mb-[2px] h-4 w-4 form-checkbox bg-white rounded-full'}/>
                </div>
                <div onClick={clickHandler} className={'pt-4 text-task outline-0 flex-grow text-gray-600 focus:border-none focus:ring-0 border-none'}>
                    <div className={''}>{task.name}</div>
                    <div className={`pb-4 border-b mt-1 flex items-center justify-start ${(new Date(task.date) > new Date()) ? "" : "text-red-600"}`}>
                        <div className={`mb-[1px] mr-1 text-ss `}><HiCalendar/></div>
                        <div className={`text-ss `}>{task.date ? format(new Date(task.date), "dd MMM YYY") : null}</div>
                    </div>
                </div>
                <div className={`border-b ${1 || isHovering ? "visible" : "invisible"} flex space-x-4 items-center`}>
                    {task.sort}
                    <button data-tip={"Set due date"}><CiCalendar className={'h-5 w-5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded'}/></button>
                    <button><HiEllipsisHorizontal data-tip={"Task actions"} className={'h-5 w-5 text-gray-400 hover:text-gray-500 hover:bg-gray-200 rounded'}/></button>
                </div>
                <TaskModal setModalOpen={setModalOpen} open={modelOpen} task={task}/>
            </div>
        </div>
    )
}
