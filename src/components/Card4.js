import {useEffect, useState} from 'react'

import {paths} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../redux/taskSlice";
import {toast} from "react-toastify";
import DateBadge from "./DateBadge";

import {Link, useParams} from "react-router-dom";

export const Card4 = ({id, card, index, moveCard,}) => {

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
                id:card.id,
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

        <Link to={link}>
            <div className={`${currentTask.id === card.id ? "bg-hov" : ""} hover:bg-hov w-full h-[40px] flex items-center border-b space-x-2`}>
                <div className={'mr-2'}>
                    <input className={'checkbox ml-2'} type={"checkbox"}/>
                </div>
                <div className={'text-neutral-900 flex-grow'}>
                    <div>
                        {/*<input onBlur={saveNameHandler} onChange={(e) => setName(e.target.value)} className={'focus:ring-0 p-0 border-none bg-transparent w-full'} type={"text"} value={name}/>*/}
                        {/*<div className={'text-xs'}> 25 oct</div>*/}
                        <div className={''}>{name}</div>
                    </div>

                </div>
                <div className={'text-neutral-500 text-sm ml-6 text-gray-500'}>{card.project}</div>
                <div className={'flex-shrink-0 pr-2'}><DateBadge date={card.due}/></div>
            </div>

        </Link>
    )
}
