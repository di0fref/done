import update from 'immutability-helper'
import {useCallback, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion"
import {useReadLocalStorage} from "usehooks-ts";
import AddTask from "./AddTask";
import {Card4} from "./Card4";
import {useParams} from "react-router-dom";
import LargeModal from "./LargeModal";
import All from "./Taskviews/All";
import Upcoming from "./Taskviews/Upcoming";
import Inbox from "./Taskviews/Inbox";
import Project from "./Taskviews/Project";
import Default from "./Taskviews/Default";

export const Container = (props) => {
    {
        const [data, setData] = useState([])
        const showCompleted = useReadLocalStorage("showCompletedTasks")
        const [open, setOpen] = useState(false)
        const selectedTask = useSelector(state => state.current.task)

        const _data_ = {

            today: {
                tasks: [...useSelector(state => state.tasks.filter(
                        task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                    )
                )].sort((a, b) => {
                    return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
                }),
                completed: [...useSelector(state => state.tasks.filter(
                        task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (task.completed)
                    )
                )].sort((a, b) => {
                    return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
                }),
            },

            inbox: {
                tasks: [...useSelector(
                    state => state.tasks.filter(
                        task => (task.due === null && !task.completed)
                    )
                )].sort((a, b) => {
                    return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
                }),
                completed: [...useSelector(
                    state => state.tasks.filter(
                        task => (task.due === null && task.completed)
                    )
                )].sort((a, b) => {
                    return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
                })
            },

            overdue: [...useSelector(
                state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) && task.due != null) && (!task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            }),

            upcoming:
                {
                    tasks: [...useSelector(
                        state => state.tasks.filter(
                            task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (!task.completed)
                        ))].sort((a, b) => {
                        return new Date(b.due) < new Date(a.due) ? 1 : -1;
                    }),
                    completed: [...useSelector(
                        state => state.tasks.filter(
                            task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (task.completed === true)
                        ))].sort((a, b) => {
                        return new Date(b.due) < new Date(a.due) ? 1 : -1;
                    })
                },

            all:
                {
                    tasks: [...useSelector(
                        state => state.tasks.filter(
                            task => (!task.completed)
                        )
                    )].sort((a, b) => {
                        return new Date(b.due) < new Date(a.due) ? 1 : -1;
                    }),

                    completed: [...useSelector(
                        state => state.tasks.filter(
                            task => (task.completed === true)
                        )
                    )].sort((a, b) => {
                        return new Date(b.due) < new Date(a.due) ? 1 : -1;
                    })
                },

            project: {
                tasks: [...useSelector(
                    state => state.tasks.filter(
                        task => task.project_id === props.id && (!task.completed)
                    )
                )].sort((a, b) => {
                    return a.due && b.due ? (new Date(b.due) < new Date(a.due) ? 1 : -1) : -1
                }),
                completed: [...useSelector(
                    state => state.tasks.filter(
                        task => task.project_id === props.id && (task.completed)
                    )
                )].sort((a, b) => {
                    return new Date(b.due) < new Date(a.due) ? 1 : -1;
                })
            },


            completed: [...useSelector(
                state => state.tasks.filter(
                    task => task.completed === true
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            }),
        }

        const moveCard = useCallback((dragIndex, hoverIndex) => {

            setData((prevCards) => {

                    prevCards[dragIndex].sort = hoverIndex;
                    prevCards[hoverIndex].sort = dragIndex;

                    return update(prevCards, {
                        $splice: [
                            [dragIndex, 1],
                            [hoverIndex, 0, prevCards[dragIndex]],
                        ],
                    })
                }
            )
        }, [])

        const renderCard = useCallback((card, index) => {
            return (
                <motion.div
                    key={card.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}>
                    <AnimatePresence>
                        <Card4
                            oM={setOpen}
                            key={card.name + card.id}
                            index={index}
                            id={card.id}
                            moveCard={moveCard}
                            card={card}
                        />
                    </AnimatePresence>
                </motion.div>
            )
        }, [])

        return (
            <div className={'flex h-full dark:text-neutral-300 '}>
                <div className={'flex-grow px-8 mt-6'}>
                    {/*<TaskHeader/>*/}
                    <AddTask/>
                    {(() => {
                        switch (props.filter) {
                            case "upcoming":
                                return (
                                    <Upcoming _data_={_data_} renderCard={renderCard}/>
                                )
                            case "inbox":
                                return (
                                    <Inbox _data_={_data_} renderCard={renderCard}/>
                                )
                            case "all":
                                return (
                                    <All _data_={_data_} renderCard={renderCard}/>
                                )
                            case "project":
                                return (
                                    <Project _data_={_data_} renderCard={renderCard}/>

                                )
                            default:
                                return (
                                    <Default _data_={_data_} renderCard={renderCard}/>
                                )
                        }
                    })()}
                </div>
                <LargeModal card={{...selectedTask}} key={selectedTask.id} open={open} setModalOpen={setOpen}/>
            </div>
        )
    }
}
