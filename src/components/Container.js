import update from 'immutability-helper'
import {useCallback, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import {motion, AnimatePresence} from "framer-motion"
import AddTask from "./AddTask";
import {Card4} from "./Card4";
import LargeModal from "./LargeModal";
import All from "./Taskviews/All";
import Upcoming from "./Taskviews/Upcoming";
import Inbox from "./Taskviews/Inbox";
import Project from "./Taskviews/Project";
import Today from "./Taskviews/Today";

export const Container = (props) => {
    {
        const [open, setOpen] = useState(false)
        const selectedTask = useSelector(state => state.current.task)

        // const currentProject = useSelector(state => state.current.project)


        useEffect(() => {
            console.log(selectedTask.id);
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
            <div className={'flex h-full dark:text-neutral-300 '}>
                <div className={'flex-grow px-8 mt-6'}>
                    <AddTask/>
                    {(() => {
                        switch (props.filter) {
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
