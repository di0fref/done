import {useEffect, useState} from "react";
import {getIcon} from "./helper"
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import Sort from "./Taskviews/Sort";

export default function TaskHeader() {

    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const params = useParams()

    const project = useSelector(state => state.projects.find(
        project => params.id ? (params.id === project.id) : null
    ))


    useEffect(() => {
        if (params.path === "project") {
            setName(project.name.charAt(0).toUpperCase() + project.name.slice(1));
            setIcon(
                <div style={{
                    background: project.color
                }} className={'w-2 h-2 rounded-full'}/>
            )
        } else {
            switch (params.path) {
                case "all":
                    setName(params.path.charAt(0).toUpperCase() + params.path.slice(1) + " Tasks")
                    break
                default:
                    setName(params.path.charAt(0).toUpperCase() + params.path.slice(1));
            }

            setIcon(getIcon(params.path))
        }
    }, [params.path, params.id])

    return (
        <div>
            <div className={'flex items-center justify-start pb-1'}>
                <div className={'mr-3 '}>{icon}</div>
                <div className={'font-semibold text-2xl flex-grow'}>{name}</div>
                <span className={''}><Sort/></span>
            </div>
        </div>
    )
}
