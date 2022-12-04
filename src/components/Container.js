import update from 'immutability-helper'
import {useCallback, useEffect, useRef, useState} from 'react'
import {Card} from './Card.js'
import ReactTooltip from "react-tooltip";
import TaskForm from "./TaskForm";
import {useSelector} from "react-redux";
import {formatDate} from "./helper";
import { motion, AnimatePresence } from "framer-motion"

export const Container = (props) => {
    {
        const [data, setData] = useState([])

        const [showCompleted, setShowCompleted] = useState(false)

        const _data_ = {
            today: useSelector(state => state.tasks.filter(
                task => new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) && !task.completed
            )),
            inbox: useSelector(state => state.tasks.filter(
                task => (task.due === null && !task.completed)
            )),
            overdue: useSelector(state => state.tasks.filter(
                task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && task.due != null && !task.completed
            )),
            upcoming: useSelector(state => state.tasks.filter(
                task => new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0) && !task.completed
            )),
            anytime: useSelector((state) => state.tasks),
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Card
                        key={card.id}
                        index={index}
                        id={card.id}
                        moveCard={moveCard}
                        card={card}
                    />
                </motion.div>
            )
        }, [])

        let prev = "";

        switch (props.filter) {
            case "upcoming":
                return (
                    <div>
                        <div><TaskForm/></div>
                        {
                            Object.values(_data_.upcoming).map((card, i) => {
                                if (prev !== card.due) {
                                    prev = card.due;
                                    return (
                                        <div key={card.id}>
                                            <div className={'ml-6 font-bold text-sm mt-4 border-b_ pb-1'}>
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
                    </div>
                );
            case "inbox":
                return (
                    <div>
                        <div><TaskForm/></div>
                        <AnimatePresence>
                            {Object.values(_data_.inbox).map((card, i) => renderCard(card, i))}
                        </AnimatePresence>
                    </div>
                );
            case "anytime":
                return (
                    <div>
                        <div><TaskForm/></div>
                        {Object.values(_data_.anytime).map((card, i) => renderCard(card, i))}
                    </div>
                );
            default:
                return (
                    <div>
                        <div><TaskForm/></div>
                        {Object.keys(_data_.overdue).length ? (
                                <div className={''}>
                                    <div className={'ml-6 font-bold text-sm mt-4 border-b_ pb-1'}>
                                        Overdue
                                    </div>
                                    {Object.values(_data_.overdue).map((card, i) => renderCard(card, i))}
                                </div>
                            )
                            : null}

                        {Object.keys(_data_.overdue).length ? (
                            <>
                                <div className={'ml-6 font-bold text-sm mt-4 border-b_ pb-1'}>
                                    Today
                                </div>
                            </>
                        ) : null}
                        {Object.values(_data_.today).map((card, i) => renderCard(card, i))}

                    </div>
                );
        }
    }
}
