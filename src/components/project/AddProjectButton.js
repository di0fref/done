import {useState} from "react";
import {HiPlus} from "react-icons/hi2";
import SmallModal from "../modals/SmallModal";
import ProjectForm from "./ProjectForm";
import {Tooltip} from "react-tooltip";
import {useTranslation} from "react-i18next";

export default function AddProjectButton() {
    const [open, setOpen] = useState(false)
    const {t} = useTranslation();

    function closeModal() {
        setOpen(false)
    }

    return (

        <div>
            <Tooltip className={'!text-sm'} anchorId={`addProjectButton`} content={t("Create project")}/>

            <button id={"addProjectButton"}  className={'flex group items-center justify-start p-1 rounded'} onClick={() => setOpen(true)}>
                <div className={'mr-1_ text-red-600 group-hover:bg-red-600 group-hover:text-white rounded-full p-0.5'}><HiPlus className={'h-5 w-5'}/></div>
            </button>
            <SmallModal open={open} closeModal={closeModal} title={t("New project")}>
                <ProjectForm closeModal={closeModal}/>
            </SmallModal>
        </div>
    )

}
