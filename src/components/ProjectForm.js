import {useState} from "react";
import {CirclePicker, GithubPicker, SketchPicker, TwitterPicker} from "react-color";

export default function ProjectForm(props) {

    const [value, setValue] = useState("")
    const [displayColorPicker, setDisplayColorPicker] = useState(false)
    const [color, setColor] = useState("#abb8c3")

    const saveTask = () => {

    }

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
                <label htmlFor={"name"} className={'text-label'}>Name</label>
                <input placeholder={""} className={`text-input`} id="name" type={"text"} onChange={(e) => setValue(e.currentTarget.value)}/>
            </div>
            <div>
                <div className={'px-4'}>

                    <button className={'mb-3 ring-btn flex items-center space-x-2 hover:bg-gray-100'} onClick={handleClick}>
                        <div style={{
                            background: color
                        }} className={`h-3 w-3 rounded-full`}></div>
                        <div className={'text-sm font-medium'}>Choose Color</div>
                    </button>

                    {displayColorPicker ?
                        <div>
                            <TwitterPicker width={"100%"} onChange={onColorChange}/>
                        </div> : null}
                </div>

            </div>
            <div className={'bg-gray-50 flex justify-end space-x-2 p-4'}>
                <button onClick={props.closeModal} className={'cancel-btn'}>Cancel</button>
                <button disabled={!value ? true : ""} className={'save-btn'} onClick={saveTask}>Save</button>
            </div>
        </div>
    )
}
