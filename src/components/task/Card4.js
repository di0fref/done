import {useEffect, useState} from 'react'

import {delay,paths} from "../helper";
import {useDispatch, useSelector} from "react-redux";
import {updateTask} from "../../redux/taskSlice";
import {toast} from "react-toastify";
import {format} from 'date-fns'

import {useNavigate, useParams} from "react-router-dom";
import CardMenu from "./CardMenu";
import PrioBadge from "../badges/PrioBadge";
import {useReadLocalStorage} from "usehooks-ts";
import Editor from "../TextEditor";
import {getAuth} from "firebase/auth";
import {useTranslation} from "react-i18next";
import DateBadge from "../badges/DateBadge";
import {ws_broadcast} from "../ws";
import {Transition} from "@headlessui/react";

export const Card4 = ({card, sendJsonMessage, showing}) => {
    const {t} = useTranslation();
    const [isShowing, setIsShowing] = useState(showing||false)

    const [taskCompleted, setTaskCompleted] = useState(card.completed)
    const [name, setName] = useState(card.name);
    const params = useParams()
    const [link, setLink] = useState("")
    const [text, setText] = useState(card.text)
    const dispatch = useDispatch()
    const error = useSelector(state => state.error)
    const [isHovering, setIsHovering] = useState(false)
    const showDetails = useReadLocalStorage("showDetails")
    const showAssignedUser = useReadLocalStorage("showAssignedUser")

    const nav = useNavigate()

    const currentTask = useSelector(state => state.current.task)

    const clickHandler = (e) => {

        if (e.target.type !== "checkbox") {
            nav(link)
        }
    }

    const undo = (id) => {
        dispatch(updateTask({
            id: id,
            completed: false,
            changes: []
        })).then(response => {
            if (card.project_id) {
                ws_broadcast({
                    room: card.project_id,
                    type: "update",
                    module: "tasks",
                    params: {
                        id: card.id
                    }
                })
            }
        })


    }
    useEffect(() => {
        setTaskCompleted(card.completed)
    }, [card.completed])

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
                            old: card.completed ? 1 : 0,
                            new: event.target.checked ? 1 : 0,
                            user_id: getAuth().currentUser.uid,
                            assigned_user_id: card.assigned_user_id,
                            type: "bool"
                        }
                    ]
                })).unwrap()

                if (card.project_id) {
                    ws_broadcast({
                        room: card.project_id,
                        type: "update",
                        module: "tasks",
                        params: {
                            id: card.id
                        }
                    })
                }

                event.target.checked && toast.success(
                    <div>{card.name} {t("was completed")}
                        <button className={'ml-4 hover:underline text-red-700'} onClick={() => {
                            undo(id)
                        }}>{t("undo")}
                        </button>
                    </div>)

            } catch (err) {
                console.log(err);
                toast.error(t("axios_error"))
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
        <Transition
            appear={true}
            show={isShowing}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
        <div className={'z-10 group flex items-center'}>
            <div onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)} className={`${card.completed ? "opacity-50 " : ""} ${currentTask.id === card.id ? "sidebar-active" : ""} shadow hover:shadow-md flex-grow  mb-2 bg-white rounded-xl flex space-x-2 px-3 _items-center hover:cursor-pointer _border-b dark:border-gray-800 border-b-gray-100  _hover:bg-hov dark:hover:bg-gray-800  dark:text-neutral-200`}>
                <div className={'py-2.5 mr-2'}>
                    <input disabled={!!card.deleted} onChange={(checked) => onStatusChange(checked)} className={`${(card.prio === "high" && !card.completed) ? "border-red-600_" : ""} checkbox ml-2 _mb-1`} type={"checkbox"} checked={taskCompleted}/>
                </div>

                <div onClick={clickHandler} className={'flex-grow py-3'}>
                    <span className={`${card.completed ? "line-through " : ""} text-neutral-500 font-medium text-sm`}>{name}</span>

                    {showDetails ? <div className={'text-sm mt-1 text-neutral-400'}>
                        <Editor onTextChange={(e) => setText(JSON.stringify(e))} initial={text} editable={true} small={true}/>
                    </div> : ""}

                    {/*{(card.project_id && card.assigned_user_name && showAssignedUser) ? (*/}
                    {/*    <div className={'flex items-center space-x-2 my-2'}>*/}
                    {/*        <Avatar className={"h-4 w-4 rounded-full"} img={card.image_url}/>*/}
                    {/*        <div className={'text-xs'}>{card.assigned_user_name}</div>*/}
                    {/*    </div>*/}

                    {/*) : ""}*/}

                </div>
                {/*<div className={'md:flex flex-none md:items-center md:space-x-4 md:py-0 py-2'}>*/}

                {/*    /!*{!card.completed ?*!/*/}

                {/*    /!*      <>*!/*/}

                {/*    /!*          <div className={'md:py-2.5 py-1'}>*!/*/}
                {/*    /!*              {(!currentProject.id && card.project) ?*!/*/}
                {/*    /!*                  <ProjectBadge project={taskProject}/>*!/*/}
                {/*    /!*                  : ""}*!/*/}
                {/*    /!*          </div>*!/*/}

                {/*    /!*      </>*!/*/}
                {/*    /!*      : ""}*!/*/}
                {/*    {(card.project_id && card.assigned_user_name && showAssignedUser) ? (*/}
                {/*        <div className={'flex items-center space-x-2 my-2'}>*/}
                {/*            <Avatar className={"h-4 w-4 rounded-full"} img={card.image_url}/>*/}
                {/*            <div className={'text-xs text-neutral-600'}>{card.assigned_user_name}</div>*/}
                {/*        </div>*/}

                {/*    ) : ""}*/}
                {/*    <div className={'md:py-2.5 py-1'}>*/}
                {/*        <PrioBadge value={card.prio}/>*/}
                {/*    </div>*/}
                {/*    <div className={'md:py-2.5 py-1'}>*/}
                {/*        <DateBadge date={card.due}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className={'md:grid grid-flow-col py-3.5 gap-x-2_ '}>
                    <div className={'w-16 md:p-0 py-1 text-right'}><PrioBadge value={card.prio}/></div>
                    <div className={'w-16 md:p-0 py-1 text-right'}><DateBadge date={card.due}/></div>
                    <div className={'w-28 md:p-0 py-1 text-xs text-neutral-600 text-right'}>{card.assigned_user_name}</div>
                </div>

            </div>
            <div className={'w-12 bg-red-300_ py-2.5 mb-2'}>
                <CardMenu sendJsonMessage={sendJsonMessage} disabled={card.deleted} card={card} hover={isHovering}/>
            </div>

        </div>
        </Transition>
    )
}
