import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {HiBars4, HiCalendar, HiOutlineXMark} from "react-icons/hi2";
import TextareaAutosize from 'react-textarea-autosize';
import {delay, formatDate} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../redux/taskSlice";

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

    useEffect(() => {
        setIsOpen(props.open)
    }, [props.open])

    function closeModal() {
        setIsOpen(false)
        props.setModalOpen(false)
        setIsChanged(false);
    }

    const changeHandler = (e) => {
        setIsChanged(true);
    }

    const onStatusChange = (e) => {
        setTask(
            {...task, completed: !task.completed}
        )
        dispatch(toggleCompleted(task))
    }

    const saveHandler = () => {
        dispatch(updateTask({...task, "completed":task.completed?1:0}))
        closeModal()
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
                        <div className={'border-b h-10 flex items-center justify-end'}>
                            <div className={'flex items-center justify-end'}>
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
                                    })} checked={task.completed} onClick={changeHandler} className={'h-4 w-4 form-checkbox bg-gray-white rounded-full'} type={'checkbox'}/>
                                </div>
                                <div className={'flex-grow'}>
                                    <div className={'w-full'}>
                                        <input onClick={changeHandler} onChange={(e) => setTask({
                                            ...task,
                                            "name": e.currentTarget.value
                                        })} placeholder={"Title"} className={`${task.completed ? "line-through" : ""} tracking-wide w-full font-medium text-lg border-none focus:border-none focus:ring-0`} type={"text"} value={task.name}/>
                                    </div>
                                    <div className={'w-full mt-2'}>
                                        <label htmlFor={"description"} className={"ml-3 tracking-wide text-[13px] font-semibold text-gray-500"}>Description</label>
                                        <TextareaAutosize id={"description"} onClick={changeHandler} placeholder={"Description"} className={'resize-none w-full border-none focus:border-none focus:ring-1 focus:ring-gray-300 rounded '} defaultValue={task.text}/>
                                    </div>
                                </div>
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

                        <div className={'md:w-72 bg-gray-100 md:h-screen w-full'}>
                            <div className={'md:p-4 p-6'}>
                                <p className={'text-black/50 font-medium text-[14px]'}>Project</p>

                                {_project_ ? (
                                    <div className={'flex items-center mt-2'}>
                                        <span style={{background: _project_.color}} className={'ml-2 w-2 h-2 rounded-full'}></span>
                                        <span className={'ml-2 text-gray-600 text-sm'}>{_project_.name}</span>
                                    </div>) : null}


                            </div>
                            <div className={'md:p-4 p-6'}>
                                <p className={'text-black/50 font-medium text-[14px]'}>Due Date</p>
                                <div className={'flex items-center mt-2'}>
                                    <div><HiCalendar className={'mr-2 mb-[2px]'}/></div>
                                    <div className={'text-gray-600 text-sm'}>{formatDate(task.due)}</div>
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
