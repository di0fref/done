import {forwardRef, Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {HiBars4, HiCalendar, HiOutlineXMark} from "react-icons/hi2";
import TextareaAutosize from 'react-textarea-autosize';
import {delay, formatDate, getDateColor} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../redux/taskSlice";
import Editor from "./TextEditor";
import ProjectSelect from "./ProjectSelect";
import {FaCalendarAlt} from "react-icons/fa";
import {format} from "date-fns";
import DatePicker from "react-datepicker";
import CustomDatePicker from "./CustomDatePicker";

export default function TaskModal(props) {
    const [isOpen, setIsOpen] = useState(false)

    const [task, setTask] = useState({})
    const [isChanged, setIsChanged] = useState(false)
    const dispatch = useDispatch()
    const inputReference = useRef(null);

    const _project_ = useSelector(state => state.projects.find(
        project => task.project_id ? (task.project_id === project.id) : null
    ))

    useEffect(() => {
        setTask(props.task)
    }, [props.task])

    useEffect(() => {
        setIsOpen(props.open)
        inputReference.current && inputReference.current.focus()
    }, [props.open])

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={`${getDateColor(task.due)} flex items-center space-x-2 hover:cursor-pointer hover:underline mt-1 mr-2`}>
            <FaCalendarAlt/>
            <div className={`whitespace-nowrap text-center text-sm`}>{task.due ? format(new Date(task.due), "EEE, d MMM") : null}</div>
        </div>
    ))

    function onTextChange(editorState) {
        setTask({
            ...task,
            text: editorState
        })
    }

    function closeModal() {
        setIsOpen(false)
        props.setModalOpen(false)
        setIsChanged(false);
    }

    const changeHandler = (e) => {
        setIsChanged(true);
    }


    const saveHandler = () => {

        dispatch(updateTask(task))
        closeModal()
    }

    const onDueChange = (date) => {
        setTask({
            ...task,
            due: date?format(date, "yyyy-MM-dd"):null
        })
        console.log(date);
    }
    return (
        <Dialog
            unmount={true}
            open={isOpen}
            onClose={closeModal}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center text-gray-600 ">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="h-4/5  md:max-w-4xl w-11/12 transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title>
                        <div className={'border-b h-10_ py-2'}>
                            <div className={'flex items-center justify-between'}>
                                <div className={'ml-4'}>
                                    {task.project}
                                </div>
                                <button onClick={closeModal}>
                                    <HiOutlineXMark className={'h-6 w-6 text-gray-400 mx-3 hover:bg-gray-200 rounded'}/>
                                </button>
                            </div>


                        </div>
                    </Dialog.Title>

                    <div className={'flex justify-between space-x-0 md:space-x-4 md:flex-row flex-col'}>
                        <div className={'w-full slate md:pr-0  pr-2'}>
                            <div className={'flex mt-2'}>
                                <div className={'ml-5 mr-2 mt-2'}>
                                    <input onChange={(e) => setTask({
                                        ...task,
                                        "completed": !task.completed
                                    })} checked={task.completed} onClick={changeHandler} className={'check h-5 w-5 mt-2 mr-2'} type={'checkbox'}/>
                                </div>

                                <div onClick={() => setIsChanged(true)} className={`${isChanged ? "ring-1" : ""} w-full rounded-lg`}>
                                    <
                                        div className={'px-4 pt-4'}>
                                        <input className={'p-0 tracking-wide w-full font-medium text-lg border-none focus:border-none focus:ring-0'}
                                               onChange={
                                                   (e) => setTask({
                                                       ...task,
                                                       name: e.currentTarget.value
                                                   })
                                               }
                                               onClick={changeHandler} type={"text"} value={task.name}/>
                                    </div>
                                    <div className={'px-4 pb-4 pt-4'}>
                                        <Editor initial={task.text} onTextChange={onTextChange}/>
                                    </div>
                                </div>
                                {/*<div className={'flex-grow'}>*/}
                                {/*    <div className={'w-full'}>*/}
                                {/*        <input ref={inputReference}  onClick={changeHandler} onChange={(e) => setTask({*/}
                                {/*            ...task,*/}
                                {/*            "name": e.currentTarget.value*/}
                                {/*        })} placeholder={"Title"} className={`${task.completed ? "line-through" : ""} tracking-wide w-full font-medium text-lg border-none focus:border-none rounded focus:ring-blue-400/30`} type={"text"} value={task.name}/>*/}
                                {/*    </div>*/}
                                {/*    <div className={'w-full mt-2 pl-4'}>*/}

                                {/*        <Editor initial={task.text} onTextChange={onTextChange}/>*/}

                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            {isChanged ? (
                                <div className={'p-4 flex space-x-2 items-center justify-end mt-2'}>
                                    <div>
                                        <button onClick={closeModal} className={'cancel-btn'}>Cancel</button>
                                    </div>
                                    <div>
                                        <button onClick={saveHandler} className={'save-btn'}>Save</button>
                                    </div>
                                </div>
                            ) : ""}
                        </div>

                        <div className={'md:w-72 bg-gray-100_ border-l md:h-screen w-full'}>
                            <div className={'md:p-4 p-6'}>
                                {/*<p className={'text-black/50 font-medium text-[14px]'}>List</p>*/}

                                <div className={'flex items-center mt-2'}>
                                    <ProjectSelect initial={{..._project_}} onProjectChange={
                                        (project) => {
                                            setTask({
                                                ...task,
                                                project_id: project.id
                                            })
                                        }}

                                    />
                                </div>


                            </div>
                            <div className={'md:p-4 p-6'}>
                                <p className={'ml-2 text-tgray/60 font-sm text-[14px]'}>Due Date</p>
                                <div className={'flex items-center mt-2'}>
                                    <div className={'text-gray-600 text-sm ml-2'}>
                                        {/*<DatePicker*/}
                                        {/*    selected={task.due ? new Date(task.due) : null}*/}
                                        {/*    onChange={(value) => setTask({*/}
                                        {/*        ...task,*/}
                                        {/*        due: value ? format(new Date(value), "Y-MM-dd") : null*/}
                                        {/*    })}*/}
                                        {/*    customInput={*/}
                                        {/*        <DateCustomInput/>*/}
                                        {/*    }*/}
                                        {/*    todayButton={"Today"}*/}
                                        {/*    dateFormat={"yyyy-MM-dd"}>*/}

                                        {/*    <div onClick={() => setTask({*/}
                                        {/*        ...task,*/}
                                        {/*        due: null*/}
                                        {/*    })} className={'font-bold py-2 bg-gray-300 text-center hover:cursor-pointer hover:underline'}>*/}
                                        {/*        Clear date*/}
                                        {/*    </div>*/}
                                        {/*</DatePicker>*/}
                                        <CustomDatePicker onClick={false} date={task.due} onDateChange={onDueChange}/>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
