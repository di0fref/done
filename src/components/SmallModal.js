import {Dialog} from "@headlessui/react";
import {HiOutlineXMark} from "react-icons/hi2";
import {useEffect, useState} from "react";

export default function SmallModal(props) {
    const [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
        props.closeModal(false)
    }

    useEffect(() => {
        setIsOpen(props.open)
    }, [props.open])

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            className="relative z-50"
        >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex items-center justify-center text-gray-600 ">
                {/* The actual dialog panel  */}
                <Dialog.Panel className="h-48_ md:max-w-sm w-11/12 transform overflow-hidden rounded-lg bg-white  text-left align-middle shadow-xl transition-all">
                    <Dialog.Title>
                        <div className={'border-b h-10 flex justify-between items-center'}>
                                <div className={'ml-3 font-semibold text-sm'}>{props.title}</div>
                                <button onClick={closeModal}>
                                    <HiOutlineXMark className={'h-6 w-6 text-gray-400 mx-3 hover:bg-gray-200 rounded'}/>
                                </button>
                        </div>
                    </Dialog.Title>

                    {props.children}

                </Dialog.Panel>
            </div>
        </Dialog>
    )
}
