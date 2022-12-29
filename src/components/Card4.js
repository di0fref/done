import {useEffect, useState} from 'react'

import {delay, paths, sendMessage} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../redux/taskSlice";
import {toast} from "react-toastify";

import {Link, useNavigate, useParams} from "react-router-dom";
import CustomDatePicker from "./CustomDatePicker";
import {format} from "date-fns";
import {BsList} from "react-icons/bs";
import PrioSelector from "./PrioSelector";
import CardMenu from "./CardMenu";
import PrioBadge from "./PrioBadge";
import ProjectBadge from "./ProjectBadge";

export const Card4 = ({id, card, index, moveCard, oM}) => {

    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [due, setDue] = useState(card.due ? new Date(card.due) : null);
    const [name, setName] = useState(card.name);
    const params = useParams()
    const [link, setLink] = useState("")
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    const _project_ = useSelector(state => state.projects.find(
        project => card ? (card.project_id === project.id) : null
    ))
    const nav = useNavigate()

    const currentTask = useSelector(state => state.current.task)

    const clickHandler = (e) => {
        if (e.target.type !== "checkbox") {
            oM(true)
            nav(link)
        }
    }

    const undo = (id) => {
        dispatch(toggleCompleted({
            id: id,
            completed: 1
        })).unwrap()

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
            await delay(500);
            try {
                const id = card.id
                const task = await dispatch(toggleCompleted({
                    id: card.id,
                    completed: taskCompleted
                })).unwrap()


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
    const onDueChange = (date) => {
        setDue(date)
        dispatch(updateTask({
            id: card.id,
            due: date ? format(new Date(date), "Y-M-dd") : null
        }))

    }
    useEffect(() => {
        if (paths.find(p => params.path === p)) {
            setLink("/" + params.path + "/task/" + card.id)
        }
        if (params.path === "project") {
            setLink("/project/" + card.project_id + "/task/" + card.id)
        }
    }, [])


    const setProject = (project) => {
        dispatch(updateTask({
            id: card.id,
            project_id: project.id
        }))
    }
    if (error || !card) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <div className={`flex items-center ${card.completed ? "opacity-50 " : ""} ${currentTask.id === card.id ? "sidebar-active_" : ""} border-b dark:border-gray-800 border-b-gray-100 flex items-center  hover:bg-hov dark:hover:bg-gray-800 text-neutral-700 dark:text-neutral-200 py-4 hover:cursor-pointer`}>
            <div className={'flex items-center_ flex-grow space-x-4'} onClick={clickHandler}>
                <div>
                    <input onChange={onStatusChange} className={`${(card.prio === "high" && !card.completed) ? "ring-1_ ring-red-400_ border-none_ " : ""} checkbox ml-2 mb-1`} type={"checkbox"} checked={taskCompleted}/>
                </div>
                <div className={'w-full'}>
                    <div>
                        <div className={`${card.completed ? "line-through " : ""} font-medium `}>{name}</div>
                        <div className={'text-sm text-neutral-400 mt-1'}><ProjectBadge project={_project_}/></div>
                    </div>
                </div>
            </div>
            {!card.completed ? (
                    <div className={'flex items-center mr-4 space-x-3'}>
                        <div><PrioBadge value={card.prio}/></div>
                        <div><CardMenu card={card}/></div>
                    </div>)
                : ""}
            {/*{!card.completed ? (*/}
            {/*        <div className={'flex items-center space-x-2'}>{project && params.path !== "project" ?*/}
            {/*            <Link to={'/project/' + project.id} className={'text-xs pl-4 text-neutral-500 hover:text-neutral-600 hover:underline'}>{project ? project.name : ""}</Link> : ""}*/}
            {/*            <div className={'mr-3 text-xs text-right'}>*/}
            {/*                <CustomDatePicker onClick={false} date={card.due} onDateChange={onDueChange} bg={false}/>*/}
            {/*            </div>*/}
            {/*        </div>)*/}
            {/*    : ""}*/}
        </div>

    )
}
