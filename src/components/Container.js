import {useCallback, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion"
import {Card4} from "./task/Card4";
import LargeModal from "./modals/LargeModal";
import All from "./task/All";
import Upcoming from "./task/Upcoming";
import Inbox from "./task/Inbox";
import Project from "./task/Project";
import Today from "./task/Today";
import Trash from "./task/Trash";
import Completed from "./task/Completed";
import md5 from "md5";

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
                            key={md5(card.text)}
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
