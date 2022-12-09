import update from 'immutability-helper'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Card} from './Card.js'
import ReactTooltip from "react-tooltip";
import TaskForm from "./TaskForm";
import {useSelector} from "react-redux";
import {formatDate} from "./helper";
import {motion, AnimatePresence} from "framer-motion"
import {useReadLocalStorage} from "usehooks-ts";
import {Card2} from "./Card2";
import AddTask from "./AddTask";

export const Container = (props) => {
    {
        const [data, setData] = useState([])
        const showCompleted = useReadLocalStorage("showCompletedTasks")

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

        useEffect(() => {
            ReactTooltip.rebuild();
        });

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
                    exit={{opacity: 0}}
                >
                    <AnimatePresence>
                        <Card2
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
            <div>
                {/*<TaskForm/>*/}

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
                                                <div className={'ml-6_ font-bold text-lg mb-3  mt-6 ml-2'}>
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
        )
    }
}
