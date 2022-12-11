import update from 'immutability-helper'
import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {formatDate} from "./helper";
import {motion, AnimatePresence} from "framer-motion"
import {useReadLocalStorage} from "usehooks-ts";
import AddTask from "./AddTask";
import {Card4} from "./Card4";
import TaskDetail from "./TaskDetail";
import TaskHeader from "./TaskHeader";
import {useParams} from "react-router-dom";
// import {setCurrent} from "../redux/currentSlice"

export const Container = (props) => {
    {
        const params = useParams()
        const [data, setData] = useState([])
        const showCompleted = useReadLocalStorage("showCompletedTasks")

        const selectedTask = useSelector(state => state.current.task)

        const dispatch = useDispatch()

        const _data_ = {

            today: [...useSelector(state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) && (showCompleted ? true : !task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
            }),

            inbox: [...useSelector(
                state => state.tasks.filter(
                    task => (task.due === null && !task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.created_at) < new Date(a.created_at) ? 1 : -1;
            }),

            overdue: [...useSelector(
                state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0) && task.due != null) && (showCompleted ? true : !task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            }),

            upcoming: [...useSelector(
                state => state.tasks.filter(
                    task => (new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)) && (showCompleted ? true : !task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            }),

            anytime: [...useSelector(
                state => state.tasks.filter(
                    task => (showCompleted ? true : !task.completed)
                )
            )].sort((a, b) => {
                return new Date(b.due) < new Date(a.due) ? 1 : -1;
            }),

            project: [...useSelector(
                state => state.tasks.filter(
                    task => task.project_id === props.id && (showCompleted ? true : !task.completed)
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

        // const onClickCard = (e, card) => {
        //     dispatch(setCurrentTask(card))
        // }

        const renderCard = useCallback((card, index) => {
            return (
                <motion.div
                    // onClick={(e) => dispatch(setCurrentTask(card))}
                    key={card.id}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <AnimatePresence>
                        <Card4
                            key={card.id}
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
            <div className={'flex h-full '}>
                <div className={'flex-grow px-8 mt-6 '}>
                    <TaskHeader/>
                    <AddTask/>
                    {(() => {
                        switch (props.filter) {
                            case "upcoming":
                                return (
                                    Object.values(_data_.upcoming).map((card, i) => {
                                        if (prev !== card.due) {
                                            prev = card.due;
                                            return (
                                                <div key={card.id}>
                                                    <div className={'font-medium mb-2 mt-8'}>
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
                                    })
                                )
                            case "inbox":
                                return (
                                    <div>
                                        {Object.values(_data_.inbox).map((card, i) => renderCard(card, i))}
                                    </div>
                                )
                            case "anytime":
                                return (
                                    <div>
                                        {Object.values(_data_.anytime).map((card, i) => renderCard(card, i))}
                                    </div>
                                )
                            case "project":
                                return (
                                    <div>
                                        {Object.values(_data_.project).map((card, i) => renderCard(card, i))}
                                    </div>
                                )
                            default:
                                return (
                                    <div>
                                        {Object.keys(_data_.overdue).length ? (
                                                <div className={''}>
                                                    <div className={'ml-6_ font-bold text-lg mt-4_ border-b_ pb-1'}>
                                                        Overdue
                                                    </div>
                                                    {Object.values(_data_.overdue).map((card, i) => renderCard(card, i))}
                                                </div>
                                            )
                                            : null}
                                        {Object.keys(_data_.overdue).length ? (
                                            <div className={'ml-6_ font-bold text-lg mt-4_ border-b_ pb-1'}>
                                                Today
                                            </div>
                                        ) : null}
                                        {Object.values(_data_.today).map((card, i) => renderCard(card, i))}
                                    </div>
                                )
                        }
                    })()}

                </div>
                {/*<div className={'border-r md:relative absolute p-6 pt-10 w-1/2 h-screen bg-gray-100 _z-20 fixed top-0 -left-96 md:left-0 md:w-90  peer-focus:left-0 peer:transition ease-out delay-150 duration-200'}>*/}
                {/*    <TaskDetail card={selectedTask}/>*/}
                {/*</div>*/}
                <TaskDetail card={selectedTask}/>
            </div>
        )
    }
}
