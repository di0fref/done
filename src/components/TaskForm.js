import {HiPlus, HiSun} from "react-icons/hi2";
import {forwardRef, useEffect, useRef, useState} from "react";
import {CiCalendar, CiInboxIn} from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {format} from "date-fns";
import {formatDate} from "./helper";
import {useDispatch} from "react-redux";
import {addTask} from "../redux/taskSlice";
import {toast} from "react-toastify";

export default function TaskForm() {

    const [isEditing, setIsEditing] = useState(false)
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskProject, setTaskProject] = useState("");
    const [displayDate, setDisplayDate] = useState("");
    const inputReference = useRef(null);

    const dispatch = useDispatch()

    const saveHandler = () => {
        const task = {
            name: taskName,
            id: null,
            text: taskDescription,
            sort: 0,
            due: taskDate ? format(taskDate, "Y-MM-dd") : null,
            prio: "high"
        }

        dispatch(addTask(task)).then((result) => {
            setIsEditing(false)
            resetState();
            toast.success("Task added")
        })
    }

    const resetState = () => {
        setTaskName("")
        setTaskDate("")
        setTaskDescription("")
        setTaskProject("")
        setDisplayDate("")
    }

    useEffect(() => {

        if (taskDate !== "") {
            const today = format(new Date(), "Y-MM-dd")
            const date = formatDate(taskDate)

            if (today === date) {
                setDisplayDate("Today")
            } else {
                setDisplayDate(date)
            }
        } else {
            setDisplayDate("Due Date")
        }

    }, [taskDate])


    useEffect(() => {
        if (isEditing)
            inputReference.current.focus()
    }, [isEditing])

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className={'ring-btn flex items-center'} onClick={onClick}>
            <div className={'text-green-600 pl-2 mr-1'}><CiCalendar/></div>
            <div className={'text-black/70 pr-2 text-sm'}>
                {displayDate}
            </div>
        </button>
    ))


    return (
        <div className={'mt-3_'}>
            {!isEditing ? (
                <div className={'flex items-center justify-end ml-5 mb-2_ text-sm_'}>
                    <button className={'flex items-center justify-start group mr-2  p-1 rounded'} onClick={() => {
                        setIsEditing(true)
                    }}>
                        <div className={'mr-1 text-red-600 group-hover:bg-red-600 group-hover:text-white rounded-full p-0.5'}><HiPlus className={'h-5 w-5'}/></div>
                        <div>Task</div>
                    </button>
                </div>
            ) : (
                <div className={'ml-4 mt-8'}>
                    <div className={'border border-gray-300 rounded-lg p-1 _mb-2'}>
                        <div className={'w-full mb-2'}>
                            <input ref={inputReference} onChange={(e) => setTaskName(e.currentTarget.value)} placeholder={"Title"} className={'focus:border-none focus:ring-0 w-full border-none ring-0 rounded placeholder:text-sm'} type={"text"}/>
                        </div>
                        <div className={'w-full'}>
                            <textarea onChange={(e) => setTaskDescription(e.currentTarget.value)} placeholder={"Description"} className={'focus:border-none focus:ring-0 w-full h-12 form-textarea w-full border-none ring-0 rounded resize-none placeholder:text-sm'}></textarea>
                        </div>
                        <div className={'flex items-center space-x-2 m-2'}>
                            <div>
                                <DatePicker
                                    selected={taskDate}
                                    onChange={(date) => setTaskDate(date)}
                                    customInput={<DateCustomInput/>}
                                    dateFormat={"yyyy-MM-dd"}
                                />
                            </div>
                            <button className={'ring-btn flex items-center'}>
                                <div className={'pl-2 mr-1 text-blue-600'}><CiInboxIn/></div>
                                <div className={'text-black/70 pr-2'}>Inbox</div>
                            </button>

                        </div>
                    </div>
                    <div className={'flex space-x-2 justify-end mt-4'}>
                        <button className={'cancel-btn'} onClick={() => {
                            setIsEditing(false)
                        }}>Cancel
                        </button>
                        <button disabled={!taskName ? true : false} className={'save-btn'} onClick={saveHandler}>Save</button>
                    </div>
                </div>
            )}
        </div>
    )
}
