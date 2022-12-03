import update from 'immutability-helper'
import {useCallback, useEffect, useState} from 'react'
import {Card} from './Card.js'
import ReactTooltip from "react-tooltip";
import TaskForm from "./TaskForm";
import {useSelector} from "react-redux";
import {format} from "date-fns";
import {formatDate} from "./helper";

export const Container = (props) => {
    {
        const [data, setData] = useState([])


        const _data_ = {
            today: useSelector(state => state.tasks.filter(
                task => new Date(task.due).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            )),
            inbox: useSelector(state => state.tasks.filter(
                task => task.due === null
            )),
            overdue: useSelector(state => state.tasks.filter(
                task => (new Date(task.due).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) && task.due != null
            )),
            upcoming: useSelector(state => state.tasks.filter(
                task => new Date(task.due).setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0)
            )),
            anytime: useSelector((state) => state.tasks),
        }

        console.log(_data_.upcoming)


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
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    moveCard={moveCard}
                    card={card}
                />
            )
        }, [])

        let prev = "";

        switch (props.filter) {
            case "upcoming":
                return (
                    <div>
                        <div><TaskForm/></div>
                        {/*{Object.values(_data_.upcoming).map((card, i) => renderCard(card, i))}*/}

                        {
                            Object.values(_data_.upcoming).map((card, i) => {

                                if (prev !== card.due) {
                                    prev = card.due;
                                    return (
                                        <>
                                            <div className={'ml-4 font-bold text-sm_ mt-4 border-b pb-1'}>
                                                {formatDate(card.due)}
                                            </div>
                                            {renderCard(card, i)}
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            {renderCard(card, i)}
                                        </>
                                    )
                                }
                            })}


                    </div>
                );
            case "inbox":
                return (
                    <div>
                        <div><TaskForm/></div>
                        {Object.values(_data_.inbox).map((card, i) => renderCard(card, i))}
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
                        {_data_.overdue ? (
                                <div className={'mb-12'}>
                                    <div className={'ml-4 font-bold text-sm_ mt-4 border-b pb-1'}>
                                        Overdue
                                    </div>
                                    {Object.values(_data_.overdue).map((card, i) => renderCard(card, i))}
                                </div>
                            )
                            : null}

                        {_data_.overdue ? (
                            <>
                                <div className={'ml-4 font-bold text-sm_ mt-6 border-b pb-1'}>
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
