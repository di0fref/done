import {useEffect, useState} from 'react'

import {paths} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../redux/taskSlice";
import {toast} from "react-toastify";
import DateBadge from "./DateBadge";

import {Link, useParams} from "react-router-dom";

export const Card4 = ({id, card, index, moveCard, oM}) => {

    const [modelOpen, setModalOpen] = useState(false)
    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [due, setDue] = useState(new Date(card.due));
    const [name, setName] = useState(card.name);
    const params = useParams()
    const [link, setLink] = useState("")
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)


    const currentTask = useSelector(state => state.current.task)

    const project = useSelector(state => state.projects.find(
        project => card.project_id === project.id
    ))

    const clickHandler = (e) => {
        if (e.target.classList.contains("click")) {
            setModalOpen(true)
        }
    }

    const undo = (id) => {
        dispatch(toggleCompleted({
            id: id,
            completed: 1
        }))
    }

    const timeout = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const saveNameHandler = (e) => {
        if (e.currentTarget.value !== card.name) {
            dispatch(updateTask({
                id: card.id,
                name: name
            }))
        }
    }

    const onStatusChange = () => {

        (async () => {
            setTaskCompleted(!taskCompleted)
            await timeout(500);
            try {
                const id = card.id
                const task = await dispatch(toggleCompleted(card)).unwrap()

                task.completed && toast.success(
                    <div>1 task was completed
                        <button className={'ml-4 hover:underline text-red-700'} onClick={() => {
                            undo(id)
                        }}>undo
                        </button>
                    </div>)

            } catch (err) {
                console.log(err);
                toast.error(`Something went wrong. Please contact support`)
            }
        })()

    }

    useEffect(() => {
        if (paths.find(p => params.path === p)) {
            setLink("/" + params.path + "/task/" + card.id)
        }
        if (params.path === "project") {
            setLink("/project/" + card.project_id + "/task/" + card.id)
        }
    }, [])


    if (error) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <>
            {/*<div className={`${card.completed ? "opacity-50 _bg-green-100" : ""} ${currentTask.id === card.id ? "sidebar-active" : ""}  hover:bg-hov w-full h-[40px] flex items-center border-b space-x-2 overflow-hidden`}>*/}
            {/*    <div className={'mr-1'}>*/}
            {/*        <input onChange={onStatusChange} className={'checkbox ml-2 mb-1'} type={"checkbox"} checked={taskCompleted}/>*/}
            {/*    </div>*/}

            {/*    <div className={'text-neutral-900 flex-grow'}>*/}
            {/*        <div className={''}>*/}
            {/*            <Link to={link} onClick={() => oM(true)}>*/}
            {/*                <div className={`${card.completed ? "line-through" : ""}`}>{name}</div>*/}
            {/*            </Link>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className={'text-neutral-500 text-sm ml-6 text-gray-500'}>{card.project}</div>*/}
            {/*    <div className={'flex-shrink-0 pr-2'}><DateBadge date={card.due}/></div>*/}
            {/*</div>*/}

            <div className={'flex items-center space-x-4 mb-3 hover:bg-hov text-neutral-700 py-2 hover:cursor-pointer'}>
                <div>
                    <input onChange={onStatusChange} className={'checkbox ml-2 mb-1'} type={"checkbox"} checked={taskCompleted}/>
                </div>
                <div className={`${card.completed ? "line-through_" : ""} flex-grow`}>{name}</div>
                <div className={'text-xs bg-gray-200 py-0.5 px-1 rounded-md'}>{project.name}</div>
                <div className={'pr-4'}><DateBadge date={due}/></div>
            </div>
        </>
    )
}
