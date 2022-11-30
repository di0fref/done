import {HiPlus, HiSun} from "react-icons/hi2";
import {forwardRef, useEffect, useState} from "react";
import {CiCalendar, CiInboxIn} from "react-icons/ci";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {taskTemplate} from "./ItemTypes";
import {format} from "date-fns";

export default function TaskForm() {

    const [isEditing, setIsEditing] = useState(false)
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskProject, setTaskProject] = useState("");
    const [displayDate, setDisplayDate] = useState("");

    const saveHandler = () => {
        const task = {
            name: taskName,
            id: null,
            description: taskDescription,
            sort: 0,
            date: taskDate ? format(taskDate, "Y-MM-dd") : null
        }


        console.log(format(new Date(taskDate), "Y-MM-dd"));
        console.log(format(new Date(), "Y-MM-dd"));
    }


    useEffect(() => {

        if (taskDate !== "") {
            const today = format(new Date(), "Y-MM-dd")
            const date = format(new Date(taskDate), "Y-MM-dd")

            if (today === date) {
                setDisplayDate("Today")
            }
            else{
                setDisplayDate(date)
            }
        }else {
            setDisplayDate("Due Date")
        }

    }, [taskDate])

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button className={'ring-btn flex items-center'} onClick={onClick}>
            <div className={'text-green-600 pl-2 mr-1'}><CiCalendar/></div>
            <div className={'text-black/70 pr-2 text-sm'}>
                {displayDate}
            </div>
        </button>
    ))


    return (
        <div className={'mt-3'}>
            {!isEditing ? (
                <div className={'flex items-center justify-end ml-5 mb-2 text-sm'}>
                    <button className={'flex items-center justify-start hover:text-red-600'} onClick={() => {
                        setIsEditing(true)
                    }}>
                        <div className={'mr-3 text-red-600'}><HiPlus/></div>
                        <div>Add task</div>
                    </button>
                </div>
            ) : (
                <div className={'ml-4'}>
                    <div className={'border border-gray-300 rounded-lg p-1 mb-2'}>
                        <div className={'w-full mb-2'}>
                            <input onChange={(e) => setTaskName(e.currentTarget.value)} placeholder={"Task title"} className={'focus:border-none focus:ring-0 w-full border-none ring-0 rounded placeholder:text-sm'} type={"text"}/>
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
                    <div className={'flex space-x-2 justify-end'}>
                        <button className={'cancel-btn'} onClick={() => {
                            setIsEditing(false)
                        }}>Cancel
                        </button>
                        <button className={'save-btn'} onClick={saveHandler}>Save</button>
                    </div>
                </div>
            )}
        </div>
    )
}
