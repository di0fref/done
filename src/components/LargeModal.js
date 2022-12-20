import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Editor from "./TextEditor";
import ProjectSelect from "./ProjectSelect";
import CustomDatePicker from "./CustomDatePicker";

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
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

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
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto w-[56rem]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <input type={"checkbox"} className={'checkbox'}/>
                                        </div>
                                        <div>
                                            <input className={'text-xl font-semibold border-none focus:border-none focus:ring-0'} type={"text"} value={task.name}/>
                                        </div>
                                    </div>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">

                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 flex ">
                                    <div className="w-2/3 ">
                                        <div className={'py-4'}>
                                        <Editor initial={task.text} onTextChange={onTextChange}/>
                                            </div>
                                    </div>
                                    <div className={'w-1/3 border-l px-4'}>

                                        <div className={'flex_ items-center justify-between space-x-3 mb-4 py-4'}>
                                            <div>List</div>
                                            <div>
                                                <ProjectSelect initial={{..._project_}} onProjectChange={onProjectChange}/>
                                            </div>
                                        </div>
                                        <div className={'flex_ items-center justify-between space-x-3'}>
                                            <div>Due</div>
                                            <div>
                                                <CustomDatePicker onClick={false} date={task.due} onDateChange={onDueChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
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