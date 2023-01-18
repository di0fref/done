import Board from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";


export default function Kanban({project_id}) {

    const dispatch = useDispatch()

    const tasks = useSelector(state => state.tasks.filter(task => task.project_id === project_id))

    const [board, setBoard] = useState({
        columns: [
            {
                id: 1,
                title: 'Backlog',
                cards: tasks || []
            },
            {
                id: 2,
                title: 'Doing',
                cards: [
                    {
                        id: 2,
                        title: 'Drag-n-drop support',
                        description: 'Move a card between the columns'
                    },
                ]
            }
        ]
    })

    const onCardDragEnd = (card, source, destination) => {

        console.log(source);
        console.log(destination);
    }

    useEffect(() => {
        setBoard({
            columns: [
                {
                    id: 1,
                    title: 'Backlog',
                    cards: tasks || []
                },
                {
                    id: 2,
                    title: 'Doing',
                    cards: [
                        {
                            id: 2,
                            title: 'Drag-n-drop support',
                            description: 'Move a card between the columns'
                        },
                    ]
                }
            ]
        })
    }, [project_id])


    // return <></>
    return <Board onCardDragEnd={onCardDragEnd}>{board}</Board>
}