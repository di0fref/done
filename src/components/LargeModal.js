import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Editor from "./TextEditor";
import ProjectSelect from "./ProjectSelect";
import CustomDatePicker from "./CustomDatePicker";
import {HiXMark} from "react-icons/hi2";
import {updateTask} from "../redux/taskSlice";
import {format} from "date-fns";
import {toast} from "react-toastify";

export default function LargeModal(props) {

    const _project_ = useSelector(state => state.projects.find(
        project => props.card ? (props.card.project_id === project.id) : null
    ))

    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(props.card.name);
    const [due, setDue] = useState(props.card.due ? new Date(props.card.due) : null);
    const [text, setText] = useState(props.card.text);
    const [project, setProject] = useState(_project_);
    const [taskCompleted, setTaskCompleted] = useState(props.card.completed)
    const dispatch = useDispatch()

    useEffect(() => {
        setShowModal(props.open)
    }, [props.open])


    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setShowModal(false)
                props.setModalOpen(false)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    const closeModal = () => {
        setShowModal(false)
        props.setModalOpen(false)
    }

    const saveHandler = () => {

        /* Save the task to db */
        (async () => {
            try {
                const task = {
                    id: props.card.id,
                    name: name,
                    due: due ? format(new Date(due), "Y-M-dd") : null,
                    prio: "high",
                    project_id: project.id,
                    completed: taskCompleted,
                    text: text
                }
                await dispatch(updateTask(task)).unwrap();
                closeModal()
            } catch (err) {
                console.log(err);
                toast.error(`Something went wrong. Please contact support`)
            }
        })()
    }
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex  fixed top-[15vh] left-0 right-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6_ mx-auto w-[56rem]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between py-3 px-4 border-b border-solid border-slate-200 rounded-t">

                                    <div className={'flex justify-center items-center space-x-3'}>
                                        <div className={'h-2 w-2 rounded-full'} style={{backgroundColor: _project_ ? _project_.color : ""}}/>
                                        <div className={'text-sm text-neutral-500'}>{project ? project.name : ""}</div>
                                    </div>
                                    <button
                                        className="hover:bg-gray-200 rounded"
                                        onClick={closeModal}>
                                        <HiXMark className={'h-5 w-5 text-neutral-500'}/>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 flex ">
                                    <div className="w-2/3 ">
                                        <div className="flex items-center space-x-3 w-full pt-3 ">
                                            <div>
                                                <input checked={taskCompleted} onChange={(e) => setTaskCompleted(!taskCompleted)} type={"checkbox"} className={'checkbox mb-1'}/>
                                            </div>
                                            <div className={'w-full'}>
                                                <input onChange={(e) => setName(e.target.value)} className={'w-full text-lg_ font-semibold border-none focus:border-none focus:ring-0 p-0 m-0'} type={"text"} value={name}/>
                                            </div>
                                        </div>
                                        <div className={'py-4'}>
                                            <Editor initial={text} onTextChange={(e) => setText(JSON.stringify(e))}/>
                                        </div>
                                    </div>
                                    <div className={'w-1/3 border-l px-4'}>

                                        <div className={'my-4 border-b pb-3'}>
                                            <span className={'text-md text-neutral-600 2'}>Project</span>
                                            <ProjectSelect bg={true} initial={{...project}} onProjectChange={(project) => setProject(project)}/>
                                        </div>
                                        <div className={'border-b pb-3'}>
                                            <span className={'text-md text-neutral-600'}>Due date</span>
                                            <CustomDatePicker bg={true} onClick={false} date={due} onDateChange={(date) => setDue(date)}/>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="space-x-3 flex items-center justify-end px-6 py-4 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="cancel-btn"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="save-btn"
                                        type="button"
                                        onClick={saveHandler}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
                </>
            ) : null}
        </>
    );
}