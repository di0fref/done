import {useEffect, useState} from 'react'

import {delay, paths} from "../helper";
import {useDispatch, useSelector} from "react-redux";
import {toggleCompleted, updateTask} from "../../redux/taskSlice";
import {toast} from "react-toastify";
import {format} from 'date-fns'

import {useNavigate, useParams} from "react-router-dom";
import CardMenu from "./CardMenu";
import PrioBadge from "../badges/PrioBadge";
import {useReadLocalStorage} from "usehooks-ts";
import Editor from "../TextEditor";
import ProjectBadge from "../project/ProjectBadge";
import {getAuth} from "firebase/auth";

export const Card4 = ({card}) => {

    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [name, setName] = useState(card.name);
    const params = useParams()
    const [link, setLink] = useState("")
    const [text, setText] = useState(card.text)
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)

    const showDetails = useReadLocalStorage("showDetails")

    const nav = useNavigate()

    const currentTask = useSelector(state => state.current.task)
    const currentProject = useSelector(state => state.current.project)

    const taskProject = useSelector(state => state.projects).find(project => project.id === card.project_id)

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
                    completed: event.target.checked,
                    completed_at: event.target.checked ? format(new Date(), "Y-MM-dd H:mm:ss") : null,
                    changes: [
                        {
                            field: "completed",
                            old: card.completed?1:0,
                            new: event.target.checked?1:0,
                            user_id: getAuth().currentUser.uid,
                            assigned_user_id: card.assigned_user_id,
                            type: "bool"
                        }
                    ]
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
        <>
            <div className={`${card.completed ? "opacity-50 " : ""} ${currentTask.id === card.id ? "sidebar-active" : ""} flex space-x-2 px-3 _items-center hover:cursor-pointer border-b dark:border-gray-800 border-b-gray-100  hover:bg-hov dark:hover:bg-gray-800  dark:text-neutral-200`}>
                <div className={'py-2.5 mr-2'}>
                    <input disabled={!!card.deleted} onChange={(checked) => onStatusChange(checked)} className={`${(card.prio === "high" && !card.completed) ? "border-red-600_" : ""} checkbox ml-2 mb-1`} type={"checkbox"} checked={taskCompleted}/>
                </div>

                <div onClick={clickHandler} className={'flex-grow py-2.5'}>
                    <span className={`${card.completed ? "line-through " : ""} font-medium_ text-sm`}>{name}</span>
                    {/*<div className={'flex items-center space-x-2 mt-1'}>*/}
                    {/*    <div><img src={card.image_url} className={'rounded-full h-4 w-4'}/></div>*/}
                    {/*    <div className={'text-xs text-neutral-500'}>{card.assigned_user_name}</div>*/}
                    {/*</div>*/}
                    {showDetails ? <div className={'text-sm mt-1 text-neutral-400'}>
                        <Editor onTextChange={(e) => setText(JSON.stringify(e))} initial={text} editable={true} small={true}/>
                    </div> : ""}
                </div>
                {!card.completed ?

                    <>

                        <div className={'py-2.5'}>
                            {(!currentProject.id && card.project) ? <ProjectBadge project={taskProject}/> : ""}
                        </div>
                        <div className={'py-2.5'}>
                            <span className={'text-xs text-neutral-500'}>{card.assigned_user_name}</span>
                        </div>
                        <div className={'py-2.5'}>
                            <PrioBadge value={card.prio}/>
                        </div>
                        <div className={'py-2.5'}>
                            <CardMenu disabled={card.deleted} card={card}/>
                        </div>
                    </>
                    : ""}
            </div>


            {/*<div*/}
            {/*    // style={{borderLeft: _project_?`1px solid ${_project_.color}`:"none"}}*/}

            {/*    className={` pl-3_ flex items-center_ py-3_  group ${card.completed ? "opacity-50 " : ""} ${currentTask.id === card.id ? "sidebar-active" : ""} border-b dark:border-gray-800 border-b-gray-100  hover:bg-hov dark:hover:bg-gray-800  dark:text-neutral-200  hover:cursor-pointer`}>*/}
            {/*    <div onClick={clickHandler} className={'flex items-center_ flex-grow space-x-4  pl-3  py-3 '}>*/}
            {/*        <div>*/}
            {/*            <input disabled={!!card.deleted} onChange={(checked) => onStatusChange(checked)} className={`${(card.prio === "high" && !card.completed) ? "border-red-600_" : ""} checkbox ml-2 mb-1`} type={"checkbox"} checked={taskCompleted}/>*/}
            {/*        </div>*/}
            {/*        <div className={'w-full'}>*/}
            {/*            <div>*/}
            {/*                <div className={`${card.completed ? "line-through " : ""} font-medium text-sm `}>*/}
            {/*                    <div className={'text-neutral-700 dark:text-neutral-300'}>*/}
            {/*                        <div className={'mt-0.5'}>{name} old</div>*/}
            {/*                        {showDetails*/}
            {/*                            ? <div className={'text-sm mt-2 text-neutral-400'}>*/}
            {/*                                <Editor initial={card.text} editable={true} small={true}/>*/}
            {/*                            </div>*/}
            {/*                            : ""}*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}

            {/*    {!card.completed ? (*/}
            {/*            <div className={'flex items mr-4 space-x-3'}>*/}
            {/*                {(!currentProject.id && card.project) ? <ProjectBadge project={taskProject}/> : ""}*/}
            {/*                <div className={''}><PrioBadge value={card.prio}/></div>*/}
            {/*                <div className={''}><CardMenu disabled={card.deleted} card={card}/></div>*/}
            {/*            </div>)*/}
            {/*        : ""}*/}
            {/*           </div>*/}
            {/*</div>*/}
        </>
    )
}
