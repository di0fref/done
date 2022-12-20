import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Editor from "./TextEditor";
import ProjectSelect from "./ProjectSelect";
import CustomDatePicker from "./CustomDatePicker";
import {HiXMark} from "react-icons/hi2";

export default function LargeModal(props) {
    const [showModal, setShowModal] = useState(false);
    const [task, setTask] = useState({})

    useEffect(() => {
        setShowModal(props.open)
    }, [props.open])

    const _project_ = useSelector(state => state.projects.find(
        project => task.project_id ? (task.project_id === project.id) : null
    ))

    useEffect(() => {
        setTask(props.task)
    }, [props.task])

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

    function onTextChange(editorState) {

    }

    const onProjectChange = () => {

    }
    const onDueChange = () => {

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
                                        <div className={'h-2 w-2 rounded-full'} style={{backgroundColor:_project_.color}}></div>
                                        <div className={'text-sm text-neutral-500'}>{task.project}</div>
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
                                                <input type={"checkbox"} className={'checkbox mb-1'}/>
                                            </div>
                                            <div className={'w-full'}>
                                                <input className={'w-full text-lg_ font-semibold border-none focus:border-none focus:ring-0 p-0 m-0'} type={"text"} value={task.name}/>
                                            </div>
                                        </div>
                                        <div className={'py-4'}>
                                            <Editor initial={task.text} onTextChange={onTextChange}/>
                                        </div>
                                    </div>
                                    <div className={'w-1/3 border-l px-4'}>

                                            <div className={'my-4 flex items-center space-x-2'}>
                                               <ProjectSelect initial={{..._project_}} onProjectChange={onProjectChange}/>
                                            </div>
                                            <div className={'flex items-center space-x-2'}>
                                               <CustomDatePicker onClick={false} date={task.due} onDateChange={onDueChange}/>
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
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
