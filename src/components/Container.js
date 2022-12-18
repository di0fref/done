import update from 'immutability-helper'
import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {formatDate} from "./helper";
import {motion, AnimatePresence} from "framer-motion"
import {useReadLocalStorage} from "usehooks-ts";
import AddTask from "./AddTask";
import {Card4} from "./Card4";
import TaskHeader from "./TaskHeader";
import {useParams} from "react-router-dom";
import Rez from "./Rez";
import TaskDetail from "./TaskDetail";

export const Container = (props) => {
    {
        const params = useParams()
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
                    return a.due&&b.due?(new Date(b.due) < new Date(a.due) ? 1 : -1):-1
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
                    // onClick={() => setOpen(true)}

                    key={card.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
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

        let prev = "";

        return (
            <div className={'flex h-full dark:text-neutral-300 '}>
                <div className={'flex-grow px-8 mt-6'}>
                    {/*<TaskHeader/>*/}
                    <AddTask/>
                    {(() => {
                        switch (props.filter) {
                            case "upcoming":
                                return (

                                    <>
                                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                                            <TaskHeader/></div>

                                        {Object.values(_data_.upcoming.tasks).map((card, i) => {
                                            if (prev !== card.due) {
                                                prev = card.due;
                                                return (
                                                    <div key={card.id}>
                                                        <div className={'mb-2 mt-7 text-sm font-bold border-b p-2 dark:border-gray-700 mb-5 _sub-header '}>
                                                            {formatDate(card.due, true)}
                                                        </div>
                                                        {renderCard(card, i)}
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div key={card.id}>
                                                        {renderCard(card, i)}
                                                    </div>
                                                )
                                            }
                                        })}
                                        {_data_.upcoming.completed.length ?
                                            (
                                                <div>
                                                    <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                                                    {Object.values(_data_.upcoming.completed).map((card, i) => {
                                                        return renderCard(card, i)
                                                    })}
                                                </div>
                                            )
                                            : ""}
                                    </>


                                )
                            case "inbox":
                                return (
                                    <>
                                        <div>
                                            <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                                                <TaskHeader/></div>

                                            {Object.values(_data_.inbox.tasks).map((card, i) => renderCard(card, i))}
                                        </div>
                                        {_data_.inbox.completed.length ?
                                            (
                                                <div>
                                                    <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                                                    {Object.values(_data_.inbox.completed).map((card, i) => renderCard(card, i))}
                                                </div>
                                            )
                                            : ""}
                                    </>
                                )
                            case "all":
                                return (
                                    <>
                                        <div>
                                            <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                                                <TaskHeader/></div>

                                            {Object.values(_data_.all.tasks).map((card, i) => renderCard(card, i))}
                                        </div>
                                        {_data_.all.completed.length ?
                                            (
                                                <div>
                                                    <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                                                    {Object.values(_data_.all.completed).map((card, i) => renderCard(card, i))}
                                                </div>
                                            )
                                            : ""}
                                    </>
                                )
                            case "project":
                                return (
                                    <>
                                        <div>
                                            <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                                                <TaskHeader/></div>
                                            {Object.values(_data_.project.tasks).map((card, i) => renderCard(card, i))}
                                        </div>
                                        {_data_.project.completed.length ?
                                            (
                                                <div>
                                                    <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                                                    {Object.values(_data_.project.completed).map((card, i) => renderCard(card, i))}
                                                </div>
                                            )
                                            : ""}
                                    </>
                                )
                            default:
                                return (
                                    <div>
                                        {/*{Object.keys(_data_.overdue).length ? (*/}
                                        {/*        <div className={''}>*/}
                                        {/*            <div className={'font-bold text-lg mt-4_ border-b_ pb-1'}>*/}
                                        {/*                Overdue*/}
                                        {/*            </div>*/}
                                        {/*            {Object.values(_data_.overdue).map((card, i) => renderCard(card, i))}*/}
                                        {/*        </div>*/}
                                        {/*    )*/}
                                        {/*    : null}*/}
                                        {/*{Object.keys(_data_.overdue).length ? (*/}
                                        {/*    <div className={'ml-6_ font-bold text-lg mt-4_ border-b_ pb-1'}>*/}
                                        {/*        Today*/}
                                        {/*    </div>*/}
                                        {/*) : null}*/}
                                        <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>
                                            <TaskHeader/></div>

                                        {Object.values(_data_.today.tasks).map((card, i) => renderCard(card, i))}

                                        {_data_.today.completed.length ?
                                            (
                                                <div>
                                                    <div className={'mb-2 mt-7 font-bold_ border-b p-2 dark:border-gray-700 mb-5 sub-header'}>Completed</div>
                                                    {Object.values(_data_.today.completed).map((card, i) => renderCard(card, i))}
                                                </div>
                                            )
                                            : ""}

                                    </div>
                                )
                        }
                    })()}
                </div>
                <TaskDetail card={selectedTask} key={selectedTask.id} open={open} setOpen={setOpen}/>
                {/*<TaskModal open={open} setModalOpen={setOpen} task={{...selectedTask}}/>*/}
{/*<Rez card={selectedTask} key={selectedTask.id} open={open} setOpen={setOpen}/>*/}
            </div>
        )
    }
}
