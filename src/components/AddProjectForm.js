import {useState} from "react";
import {HiOutlineXMark, HiPlus} from "react-icons/hi2";
import {Dialog, Transition} from '@headlessui/react'

export default function AddProjectForm() {
    const [isOpen, setIsOpen] = useState(false)

    const [isEditing, setIsEditing] = useState(false)

    function closeModal() {
        setIsOpen(false)

    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={closeModal}
                className="fixed z-50 top-1/2 left-1/2"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
                <Dialog.Panel className="h-4/5 w-full max-w-xl transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title>
                        <div className={'border-b h-10 flex items-center justify-end'}>
                            <div className={'flex items-center justify-end'}>
                                <button onClick={closeModal}>
                                    <HiOutlineXMark className={'h-6 w-6 text-gray-400 mx-3 hover:bg-gray-200 rounded'}/>
                                </button>
                            </div>
                        </div>
                    </Dialog.Title>
                    <div className={'w-96 flex justify-between space-x-0 md:space-x-4 md:flex-row flex-col'}>
                        <div className={'w-full slate md:pr-0  pr-2'}>
                            <div className={'flex mt-2'}>
                                <div className={'ml-5 mr-2 mt-2'}>
                                    <input type={"text"} className={'w-full'}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>


            </Dialog>
            <div>
                <button data-tip={"Add project"} className={'flex items-center justify-start hover:bg-gray-200 p-1 rounded'} onClick={() => setIsOpen(true)}>
                    <div className={'mx-1'}><HiPlus/></div>
                </button>
            </div>
        </>
    )

}