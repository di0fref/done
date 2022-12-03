import {useEffect, useState} from "react";
import {getIcon} from "./helper"

export default function TaskHeader(props) {

    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")

    useEffect(() => {
        setName(props.path.charAt(0).toUpperCase() + props.path.slice(1));
        setIcon(getIcon(props.path))
    }, [props.path])

    return (
        <div className={'flex items-center justify-start pb-1 mb- ml-2'}>
            <div className={'mr-2'}>{icon}</div>
            <div className={'font-semibold text-xl'}>{name}</div>
        </div>
    )
}
