import {useState} from "react";
import {HiPlus} from "react-icons/hi2";
import SmallModal from "./SmallModal";
import ProjectForm from "./ProjectForm";

export default function AddProjectButton() {
    const [open, setOpen] = useState(false)

    function closeModal() {
        setOpen(false)
    }

    return (

        <div>
            <button  className={'flex items-center justify-start hover:bg-gray-200 p-1 rounded'} onClick={() => setOpen(true)}>
                <div className={'mx-1'}><HiPlus/></div>
            </button>
            <SmallModal open={open} closeModal={closeModal} title={"Add project"}>
                <ProjectForm closeModal={closeModal}/>
            </SmallModal>
        </div>
    )

}
