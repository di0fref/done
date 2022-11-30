import update from 'immutability-helper'
import {useCallback, useEffect, useState} from 'react'
import {Card} from './Card.js'
import ReactTooltip from "react-tooltip";
import TaskForm from "./TaskForm";

const style = {
    // width: 400,
}
export const Container = (props) => {
    {
        const [cards, setCards] = useState(props.cards)

        useEffect(() => {
            setCards(props.cards)
        }, [props])

        useEffect(() => {
            ReactTooltip.rebuild();
        });

        const moveCard = useCallback((dragIndex, hoverIndex) => {

            setCards((prevCards) => {

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
        return (
            <>
                <div>
                    <div className={''}><TaskForm/></div>
                    <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
                </div>
            </>
        )
    }
}
