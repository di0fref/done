import {useEffect, useRef, useState} from "react";
import {TwitterPicker} from "react-color";
import {useDispatch} from "react-redux";
import {toast} from "react-toastify";
import {addProject, updateProject} from "../../redux/projectSlice";
import {useTranslation} from "react-i18next";

export default function EditProjectForm({p, ...props}) {

    const [name, setName] = useState(p.name)
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [color, setColor] = useState(p.color)
    const dispatch = useDispatch()
    const [project, setProject] = useState(p)
    const {t} = useTranslation();

    const ref = useRef(null)

    const saveProject = () => {
        dispatch(updateProject(
            {
                id: project.id,
                name: name,
                color: color,
            }
        )).then((result) => {
            toast.success(`Project ${name} updated`)
            props.closeModal()
        })
    }
    useEffect(() => {
        ref.current.focus()
    }, [])

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    }
    const handleClose = () => {
        setDisplayColorPicker(false)
    }

    const onColorChange = (color) => {
        setColor(color.hex)
        // handleClose()
    }

    return (
        <div className={''}>
            <div className={'p-4'}>
                <label htmlFor={"name"} className={'text-label'}>{t("Name")}</label>
                <input ref={ref} value={name} placeholder={""} className={`text-input`} id="name" type={"text"} onChange={(e) => setName(e.currentTarget.value)}/>
            </div>
            <div>
                <div className={'px-4'}>

                    <button className={'mb-3 ring-btn flex items-center space-x-2 hover:bg-gray-100'} onClick={handleClick}>
                        <div style={{
                            background: color
                        }} className={`h-3 w-3 rounded-full`}> </div>
                        <div className={'text-sm font-medium'}>{t("Choose Color")}</div>
                    </button>

                    {displayColorPicker ?
                        <div>
                            <TwitterPicker width={"100%"} onChange={onColorChange}/>
                        </div> : null}
                </div>

            </div>
            <div className={'rounded-b-lg border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 flex justify-end space-x-2 p-4'}>
                <button onClick={props.closeModal} className={'cancel-btn'}>{t("cancel")}</button>
                <button disabled={!name ? true : ""} className={'save-btn'} onClick={saveProject}>{t("save")}</button>
            </div>
        </div>
    )
}
