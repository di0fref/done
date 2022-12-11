import {useEffect, useState} from "react";
import {getIcon} from "./helper"
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {format} from "date-fns";

export default function TaskHeader(props) {

    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const params = useParams()

    const project = useSelector(state => state.projects.find(
        project => params.id ? (params.id === project.id) : null
    ))

    useEffect(()=> {
        console.log(params)

    },[params])

    useEffect(() => {
        if (params.path === "project") {
            setName(project.name.charAt(0).toUpperCase() + project.name.slice(1));
            // setIcon(
            //     <div style={{
            //         background: project.color
            //     }} className={'w-4 h-4 rounded-full'}> </div>
            // )
        } else {
            setName(params.path.charAt(0).toUpperCase() + params.path.slice(1));
            // setIcon(getIcon(props.path))
        }
    }, [params.path, params.id])

    return (
        <div>
            <div className={'flex items-center justify-start pb-1'}>
                {/*<div className={'mr-2 ml-3'}>{icon}</div>*/}
                <div className={'font-semibold text-2xl'}>{name}</div>
            </div>
            {params.path==="today"?
                <span className={'text-xl text-gray-500'}>It's {format(new Date(), "EEEE MMMM, d ")}</span>
                :""}
        </div>

    // wednesday, feb 22
    )
}
