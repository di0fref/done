import {useEffect, useState} from "react";
import {getIcon} from "./helper"
import {useSelector} from "react-redux";

export default function TaskHeader(props) {

    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")

    const project = useSelector(state => state.projects.find(
        project => props.id ? (props.id === project.id) : null
    ))


    useEffect(() => {
        if (props.path === "project") {
            setName(project.name.charAt(0).toUpperCase() + project.name.slice(1));
            // setIcon(
            //     <div style={{
            //         background: project.color
            //     }} className={'w-4 h-4 rounded-full'}> </div>
            // )
        } else {
            setName(props.path.charAt(0).toUpperCase() + props.path.slice(1));
            // setIcon(getIcon(props.path))
        }
    }, [props.path, props.id])

    return (
        <div>
            <div className={'flex items-center justify-start pb-1'}>
                {/*<div className={'mr-2 ml-3'}>{icon}</div>*/}
                <div className={'font-semibold text-2xl'}>{name}</div>
            </div>
            <span className={'text-2xl text-gray-500'}>It's wednesday, feb 22</span>
        </div>
    )
}
