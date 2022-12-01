import {useState} from "react";
import {HiOutlineXMark, HiPlus} from "react-icons/hi2";
import {Dialog, Transition} from '@headlessui/react'
import SmallModal from "./SmallModal";
import ProjectForm from "./ProjectForm";

export default function AddProjectButton() {
    const [open, setOpen] = useState(false)

    const [isEditing, setIsEditing] = useState(false)

    function closeModal() {
        setOpen(false)
    }

    return (

        <div>
            <button data-tip={"Add project"} className={'flex items-center justify-start hover:bg-gray-200 p-1 rounded'} onClick={() => setOpen(true)}>
                <div className={'mx-1'}><HiPlus/></div>
            </button>
            <SmallModal open={open} closeModal={closeModal} title={"Add project"}>
                <ProjectForm closeModal={closeModal}/>
            </SmallModal>
        </div>
    )

}
