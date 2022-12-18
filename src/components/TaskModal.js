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
import {createPortal} from "react-dom";

export default function TaskModal(props) {
    const [isOpen, setIsOpen] = useState(false)

    const [task, setTask] = useState({})
    const [isChanged, setIsChanged] = useState(false)
    const dispatch = useDispatch()

    const _project_ = useSelector(state => state.projects.find(
        project => task.project_id ? (task.project_id === project.id) : null
    ))

    useEffect(() => {
        setTask(props.task)
    }, [props.task])
    //
    useEffect(() => {
        setIsOpen(props.open)
    }, [props.open])

    function onTextChange(editorState) {
        setTask({
            ...task,
            text: editorState
        })
        changeHandler()
    }

    function closeModal() {
        if(typeof props.setModalOpen === "function"){
            props.setModalOpen(false)
        }
        setIsOpen(false)
        if(typeof props.closeSearch === 'function') {
            props.closeSearch(false)
        }
        setIsChanged(false);
    }

    const changeHandler = (e) => {
        console.log("changeHandler")
        setIsChanged(true);
    }


    const saveHandler = () => {
        console.log("save")
        dispatch(updateTask({
            ...task,
            due: task.due ? format(new Date(task.due), "Y-M-dd") : null
        }))
        closeModal()
    }

    const onDueChange = (date) => {
        setTask({
            ...task,
            due: date ? format(date, "yyyy-MM-dd") : null
        })
        changeHandler()
    }
    return (
        <Dialog
            unmount={true}
            open={isOpen}
            onClose={closeModal}
            className="relative z-50">
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center text-gray-600 ">
                {/* The actual dialog panel  */}
                <Dialog.Panel style={{
                    minHeight: "400px"
                }} className="h-4/5 md:w-[864px] w-11/12 transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title>
                        <div className={'border-b h-1_ py-4'}>
                            <div className={'flex items-center justify-between'}>
                                <div className={'ml-4'}>
                                    {task.project}
                                </div>
                                <button onClick={closeModal}>
                                    <HiOutlineXMark className={'h-6 w-6 text-gray-400 mx-4 hover:bg-gray-200 rounded'}/>
                                </button>
                            </div>
                        </div>
                    </Dialog.Title>

                    <div className={'flex border h-full justify-between space-x-0 md:space-x-4 md:flex-row flex-col'}>
                        <div className={'flex-grow _slate md:pr-0  pr-2'}>
                            <div className={'flex mt-2'}>
                                <div className={'ml-8 mr-2 mt-4'}>
                                    <input onChange={(e) => {
                                        setTask({
                                            ...task,
                                            "completed": !task.completed
                                        })
                                        changeHandler()
                                    }} checked={task.completed} onClick={changeHandler} className={'checkbox h-5 w-5 mt-2 mr-2'} type={'checkbox'}/>
                                </div>

                                <div onClick={() => setIsChanged(true)} className={`${isChanged ? "ring-1" : ""} w-full overflow-auto rounded-lg`}>
                                    <div className={'px-4 pt-4'}>
                                        <input className={'p-0 tracking-wide w-full font-medium text-xl border-none focus:border-none focus:ring-0'}
                                               onChange={
                                                   (e) => {
                                                       setTask({
                                                           ...task,
                                                           name: e.currentTarget.value
                                                       })
                                                       changeHandler()
                                                   }
                                               } type={"text"} value={task.name}/>
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

                        <div className={'md:flex-shrink-0 md:w-80 bg-gray-50 border-l md:h-full _w-full'}>
                            <div className={'md:p-4 p-6'}>
                                {/*<p className={'text-black/50 font-medium text-[14px]'}>List</p>*/}

                                <div className={'flex items-center mt-2'}>
                                    <ProjectSelect initial={{..._project_}} onProjectChange={
                                        (project) => {
                                            {
                                                setTask({
                                                    ...task,
                                                    project_id: project.id
                                                })
                                                changeHandler()
                                            }
                                        }}

                                    />
                                </div>
                            </div>
                            <div className={'md:p-4 p-6'}>
                                <p className={'ml-2 text-tgray/60 font-sm text-[14px]'}>Due Date</p>
                                <div className={'flex items-center mt-2'}>
                                    <div className={'text-gray-600 text-sm ml-2'}>
                                        <CustomDatePicker onClick={false} date={task.due} onDateChange={onDueChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
