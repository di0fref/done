import update from 'immutability-helper'
import {useCallback, useEffect, useState} from 'react'
import {Card} from './Card.js'

const style = {
    width: 400,
}
export const Container = (props) => {
    {
        const [cards, setCards] = useState([])

        useEffect(() => {
            setCards([...props.tasks])
        },[])

        const moveCard = useCallback((dragIndex, hoverIndex) => {
            setCards((prevCards) =>
                update(prevCards, {
                    $splice: [
                        [dragIndex, 1],
                        [hoverIndex, 0, prevCards[dragIndex]],
                    ],
                }),
            )
        }, [])
        const renderCard = useCallback((card, index) => {
            console.log(card);
            return (
                <Card
                    key={card.id}
                    index={index}
                    id={card.id}
                    text={card.name}
                    moveCard={moveCard}
                />
            )
        }, [])
        return (
            <>
                <div style={style}>{cards.map((card, i) => renderCard(card, i))}</div>
            </>
        )
    }
}
