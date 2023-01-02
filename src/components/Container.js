import {useCallback, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion"
import {Card4} from "./Card4";
import LargeModal from "./LargeModal";
import All from "./Taskviews/All";
import Upcoming from "./Taskviews/Upcoming";
import Inbox from "./Taskviews/Inbox";
import Project from "./Taskviews/Project";
import Today from "./Taskviews/Today";
import Trash from "./Taskviews/Trash";
import Completed from "./Taskviews/Completed";

export const Container = (props) => {
    {
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
                            oM={setOpen}
                            key={card.name + card.id}
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
                <div className={'flex-grow px-8'}>
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
                <LargeModal card={{...selectedTask}} key={selectedTask.id} open={open} setModalOpen={setOpen}/>
            </div>
        )
    }
}
