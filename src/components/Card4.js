import {useEffect, useState} from 'react'

import {delay, paths} from "./helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../redux/taskSlice";
import {toast} from "react-toastify";

import {useNavigate, useParams} from "react-router-dom";
import CardMenu from "./CardMenu";
import PrioBadge from "./PrioBadge";

export const Card4 = ({card}) => {

    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [name, setName] = useState(card.name);
    const params = useParams()
    const [link, setLink] = useState("")
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    const nav = useNavigate()

    const currentTask = useSelector(state => state.current.task)
    const currentProject = useSelector(state => state.current.project)

    const clickHandler = (e) => {
        if (e.target.type !== "checkbox") {
            nav(link)
        }
    }

    const undo = (id) => {
        dispatch(updateTask({
            id: id,
            completed: false
        })).unwrap()

    }


    const onStatusChange = (event) => {

        (async () => {
            setTaskCompleted(event.target.checked)
            await delay(500);
            try {
                const id = card.id
               await dispatch(updateTask({
                    id: card.id,
                    completed: event.target.checked
                })).unwrap()


                event.target.checked && toast.success(
                    <div>{card.name} was completed
                        <button className={'ml-4 hover:underline text-red-700'} onClick={() => {
                            undo(id)
                        }}>undo
                        </button>
                    </div>)

            } catch (err) {
                console.log(err);
                toast.error(`Uh oh, something went wrong. Please try again`)
            }
        })(event)

    }

    useEffect(() => {
        if (paths.find(p => params.path === p)) {
            setLink("/" + params.path + "/task/" + card.id)
        }
        if (params.path === "project") {
            setLink("/project/" + card.project_id + "/task/" + card.id)
        }
    }, [])


    if (error || !card) {
        return (
            <div>{error}</div>
        )
    }

    return (
        <div
            // style={{borderLeft: _project_?`1px solid ${_project_.color}`:"none"}}

            className={` pl-3 flex items-center bg-whit_e _shadow _rounded-md py-3  group ${card.completed ? "opacity-50 " : ""} ${currentTask.id === card.id ? "sidebar-active" : ""} border-b dark:border-gray-800 border-b-gray-100 flex items-center  hover:bg-hov dark:hover:bg-gray-800  dark:text-neutral-200  hover:cursor-pointer`}>
            <div className={'flex items-center_ flex-grow space-x-4'} onClick={clickHandler}>
                <div>
                    <input disabled={!!card.deleted} onChange={(checked) => onStatusChange(checked)} className={`${(card.prio === "high" && !card.completed) ? "border-red-600_" : ""} checkbox ml-2 mb-2`} type={"checkbox"} checked={taskCompleted}/>
                </div>
                <div className={'w-full'}>
                    <div>
                        <div className={`${card.completed ? "line-through " : ""} font-medium text-sm `}>
                            <div className={'text-neutral-700 dark:text-neutral-300'}>
                                {name}
                                {(!currentProject.id && card.project) ?
                                    <span className={'text-neutral-400 pl-2'}>in {card.project}</span> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!card.completed ? (
                    <div className={'flex items-center mr-4 space-x-3'}>
                        <div className={''}><PrioBadge value={card.prio}/></div>
                        <div className={''}><CardMenu disabled={card.deleted} card={card}/></div>
                    </div>)
                : ""}
        </div>

    )
}
