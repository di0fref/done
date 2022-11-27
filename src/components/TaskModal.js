import {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import task from "./Task";
import _Datepicker from "./_Datepicker";
import ForcedLayoutExample from "./EditForm";
import {HiBars4, HiCalendar, HiOutlineXMark} from "react-icons/hi2";

export default function TaskModal(props) {
    const [isOpen, setIsOpen] = useState(false)
    const [task, setTask] = useState(props.task)

    useEffect(() => {
        setIsOpen(props.open)
    }, [props.open])

    function closeModal() {
        setIsOpen(false)
        props.setModalOpen(false)
    }

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center ">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="h-4/5 w-full max-w-4xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title>
                        <div className={'border-b h-10 flex items-center justify-end'}>
                            <div className={'flex items-center justify-end'}>
                                <button><HiOutlineXMark className={'h-6 w-6 text-gray-400 mx-3 hover:bg-gray-200 rounded'}/></button>
                            </div>
                        </div>
                    </Dialog.Title>

                    <div className={'flex justify-between space-x-4'}>
                        <div className={'w-full slate'}>
                            <div className={'flex mt-2'}>
                                <div className={'ml-5 mr-2 mt-3'}><input className={'h-5 w-5 form-checkbox border-none bg-gray-300 rounded rounded-md'} type={'checkbox'}/></div>
                                <div className={''}><ForcedLayoutExample task={task}/></div>
                            </div>
                            <div className={'p-4 flex space-x-2 items-center justify-end mt-2'}>
                                <div>
                                    <button className={'w-20 bg-gray-200 p-1 rounded hover:bg-gray-300'}>Cancel</button>
                                </div>
                                <div>
                                    <button className={'w-20 bg-blue-500 p-1 rounded hover:bg-blue-600 text-white'}>Save</button>
                                </div>
                            </div>
                        </div>
                        <div className={'w-72 bg-gray-100 h-screen'}>
                            <div className={'p-4'}>
                                <p className={'tracking-wide text-[13px] font-semibold text-gray-500'}>Project</p>
                            </div>
                            <div className={'p-4'}>
                                <p className={'tracking-wide text-[13px] font-semibold text-gray-500'}>Due Date</p>
                                <div className={'flex items-center mt-2'}>
                                    <div><HiCalendar/></div>
                                    <div className={'text-gray-600 text-sm font-thin ml-1'}>19 Dec 2022</div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
