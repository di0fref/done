import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion"
import {Card4} from "./task/Card4";
import LargeModal from "./modals/LargeModal";
import All from "./task/All";
import Upcoming from "./task/Upcoming";
import Inbox from "./task/Inbox";
import Project from "./task/Project";
import Today from "./task/Today";
import Trash from "./task/Trash";
import Completed from "./task/Completed";
import md5 from "md5";
import useWebSocket from "react-use-websocket";
import {isChangeEvent, WS_URL} from "./helper";
import {fetchNewTask, fetchUpdatedTask} from "../redux/taskSlice";
import TopHeader from "./task/TopHeader";
import {getAuth} from "firebase/auth";

export const Container = (props) => {
    {
        const dispatch = useDispatch()
        const allProjects = useSelector(state => state.projects)
        const {lastJsonMessage, sendJsonMessage} = useWebSocket(WS_URL, {
            share: true,
            filter: isChangeEvent
        });

        useEffect(() => {

            console.log(lastJsonMessage?.data.editorContent)

                /* Check if I have access to the project in question */
                const user_access = allProjects.find(project => project.users.find(user => user.id === getAuth().currentUser.uid))
            console.log(user_access)
                if (user_access) {
                    switch (lastJsonMessage?.data.editorContent.action) {
                        case "new":
                            dispatch(fetchNewTask(lastJsonMessage?.data.editorContent.id))
                            break;
                        case "update":
                            dispatch(fetchUpdatedTask(lastJsonMessage?.data.editorContent.id))
                            break;
                        default:
                            return

                    }
                }
            }, [lastJsonMessage]
        )


        const [open, setOpen] = useState(false)
        const selectedTask = useSelector(state => state.current.task)

        useEffect(() => {
            if (selectedTask.id) {
                setOpen(true)
            }
        }, [selectedTask])

        const renderCard = useCallback((card, index) => {
            return (
                <motion.div
                    key={card.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}>
                    <AnimatePresence>
                        <Card4
                            sendJsonMessage={sendJsonMessage}
                            oM={setOpen}
                            key={md5(card.name + card.text + card.id + card.assigned_user_id + card.prio + card.project_id)}
                            index={index}
                            id={card.id}
                            card={card}
                        />
                    </AnimatePresence>
                </motion.div>
            )
        }, [])

        return (
            <div className={'flex h-full dark:text-neutral-300 bg-gray-50_ '}>
                <div className={'flex-grow pl-12 px-4'}>

                    <TopHeader overdue={[]} sendJsonMessage={sendJsonMessage}/>
                    {(() => {
                        switch (props.filter) {
                            case "trash":
                                return (
                                    <Trash renderCard={renderCard}/>
                                )
                            case "upcoming":
                                return (
                                    <Upcoming renderCard={renderCard}/>
                                )
                            case "inbox":
                                return (
                                    <Inbox renderCard={renderCard}/>
                                )
                            case "all":
                                return (
                                    <All renderCard={renderCard}/>
                                )
                            case "project":
                                return (
                                    <Project id={props.id} renderCard={renderCard}/>
                                )
                            case "completed":
                                return (
                                    <Completed id={props.id} renderCard={renderCard}/>
                                )
                            default:
                                return (
                                    <Today renderCard={renderCard}/>
                                )
                        }
                    })()}
                </div>
                <LargeModal sendJsonMessage={sendJsonMessage} card={{...selectedTask}} key={selectedTask.id} open={open} setModalOpen={setOpen}/>
            </div>
        )
    }
}
