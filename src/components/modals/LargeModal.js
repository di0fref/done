import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Editor from "../TextEditor";
import CustomDatePicker from "../badges/CustomDatePicker";
import {updateTask} from "../../redux/taskSlice";
import {format} from "date-fns";
import {toast} from "react-toastify";
import BaseListbox from "../BaseListbox";
import {dbDateFormat, priorities} from "../helper";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

export default function LargeModal(props) {

    const _project_ = useSelector(state => state.projects.find(
        project => props.card ? (props.card.project_id === project.id) : null
    ))
    const nav = useNavigate()

    const projects = useSelector(state => state.projects)

    const [showModal, setShowModal] = useState(false)
    const [name, setName] = useState(props.card.name);
    const [prio, setPrio] = useState(props.card.prio);

    const [due, setDue] = useState(props.card.due ? new Date(props.card.due) : null);
    const [text, setText] = useState(props.card.text);
    const [project, setProject] = useState(_project_);
    const [taskCompleted, setTaskCompleted] = useState(props.card.completed)
    const [dirty, setDirty] = useState(false);
    const [users, setUsers] = useState([])
    const [assignedUser, setAssignedUser] = useState({
        id: props.card.assigned_user_id,
        name: props.card.assigned_user_name
    })
    const params = useParams();
    const dispatch = useDispatch()


    useEffect(() => {
        setShowModal(props.open)
    }, [props.open])


    useEffect(() => {
        /* Load users that can be assigned */
        project && axios.get("/projects_users/" + project.id).then(response => {
            setUsers(response.data)
        })
    }, [])

    useEffect(() => {
        console.log(users)
    }, [users])

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                closeModal()
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [])

    const closeModal = () => {
        nav("/" + params.path + "/" + (params.id === undefined ? "" : params.id))
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
                    due: due ? format(new Date(due), dbDateFormat) : null,
                    prio: prio,
                    project_id: project ? project.id : null,
                    completed: taskCompleted,
                    text: text,
                    assigned_user_id: assignedUser.id
                }
                await dispatch(updateTask(task)).unwrap();
                closeModal()
            } catch (err) {
                console.log(err);
                toast.error(`Uh oh, something went wrong. Please try again`)
            }
        })()
    }
    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex  fixed top-[15vh] left-0 right-0 z-40 outline-none focus:outline-none">
                        <div className="relative w-auto my-6_ mx-auto w-[56rem]">
                            {/*content*/}
                            <div className="border-0 rounded shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-800 outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between py-3 px-4 dark:border-gray-700 border-b border-solid border-slate-200 rounded-t">

                                    <div className={'flex justify-center items-center space-x-3'}>
                                        <div className={'h-2 w-2 rounded-full'} style={{backgroundColor: _project_ ? _project_.color : ""}}/>
                                        <div className={'text-sm text-neutral-500'}>{project ? project.name : ""}</div>
                                    </div>
                                    <button
                                        className=""
                                        onClick={closeModal}>
                                        {/*<HiXMark className={'h-5 w-5 text-neutral-500'}/>*/}
                                        <kbd className="hover:bg-hov px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100_ border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">esc</kbd>

                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 flex ">
                                    <div className="w-2/3 ">
                                        <div className="flex items-center space-x-3 w-full pt-3 ">
                                            <div>
                                                <input disabled={!!props.card.deleted} checked={taskCompleted} onChange={(e) => {
                                                    setTaskCompleted(!taskCompleted)
                                                    setDirty(true)
                                                }} type={"checkbox"} className={'checkbox mb-1'}/>
                                            </div>
                                            <div className={'w-full'}>
                                                <input disabled={!!props.card.deleted} onChange={(e) => {
                                                    setName(e.target.value)
                                                    setDirty(true)
                                                }} className={'w-[calc(100%-45px)] bg-transparent font-semibold border-none focus:border-none focus:ring-0 p-0 m-0'} type={"text"} value={name}/>
                                            </div>
                                        </div>
                                        <div className={'pl-8 pr-4 py-4'}>
                                            <Editor editable={!!props.card.deleted} initial={text} onTextChange={(e) => {
                                                setText(JSON.stringify(e));
                                                setDirty(true);
                                            }}/>
                                        </div>
                                    </div>
                                    <div className={'w-1/3 border-l px-4 dark:border-gray-700'}>

                                        <div className={'py-4 border-b dark:border-gray-700 text-sm'}>
                                            <div className={'text-md text-neutral-400 dark:text-neutral-200 font-medium mb-2'}>Assigned
                                                user
                                            </div>
                                            <div className={'text-md'}>
                                                <BaseListbox
                                                    disabled={!!props.card.deleted || !props.card.project_id} onChange={(user) => {
                                                    setAssignedUser({
                                                        id: user.user_id,
                                                        name: user.name
                                                    })
                                                    setDirty(true)
                                                }} items={users} selected={assignedUser}/>
                                            </div>

                                        </div>

                                        <div className={'py-4 border-b dark:border-gray-700 text-sm'}>
                                            <div className={'text-md text-neutral-400 dark:text-neutral-200 font-medium mb-2'}>Due
                                                date
                                            </div>
                                            <div className={'text-md'}>
                                                <CustomDatePicker disabled={!!props.card.deleted} bg={false} onClick={false} date={due} onDateChange={(date) => {
                                                    setDue(date)
                                                    setDirty(true)
                                                }}/>
                                            </div>
                                        </div>

                                        <div className={'py-4 border-b dark:border-gray-700 text-sm'}>
                                            <div className={'text-md text-neutral-400 dark:text-neutral-200  font-medium mb-2'}>Project</div>
                                            <BaseListbox disabled={!!props.card.deleted} onChange={(project) => {
                                                setProject(project)
                                                setDirty(true)
                                            }} items={[{
                                                "name": "Inbox",
                                                "id": null
                                            }, ...projects]} selected={project || {"name": "Inbox", "id": null}}/>
                                        </div>


                                        <div className={'py-4 text-sm mb-4'}>
                                            <div className={'text-md text-neutral-400 dark:text-neutral-200 font-medium mb-2'}>Priority</div>
                                            <BaseListbox disabled={!!props.card.deleted} onChange={(prio) => {
                                                setPrio(prio.prio)
                                                setDirty(true)
                                            }} items={priorities} selected={priorities.find(p => p.prio === prio)}/>
                                        </div>

                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="space-x-3 flex items-center justify-end px-6 py-4 dark:border-gray-700 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="cancel-btn"
                                        type="button"

                                        onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button
                                        className="save-btn"
                                        type="button"
                                        disabled={!dirty}
                                        onClick={saveHandler}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-30 bg-black"/>
                </>
            ) : null}
        </>
    );
}
