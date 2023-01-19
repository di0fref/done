import {useEffect, useState} from "react";
import {capitalize, getIcon} from "../helper"
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import DynamicMenu from "../DynamicMenu";
import {useTranslation} from "react-i18next";
import SortMenu from "../SortMenu";

export default function TaskHeader({overdue, sendJsonMessage}) {

    const [icon, setIcon] = useState("")
    const [name, setName] = useState("")
    const params = useParams()
    const {t} = useTranslation();

    const project = useSelector(state => state.projects.find(
        project => params.id ? (params.id === project.id) : null
    ))


    useEffect(() => {
        if (params.path === "project") {
            setName(project.name);
            setIcon(
                <div style={{
                    background: project.color
                }} className={'w-2 h-2 rounded-full'}/>
            )
        } else {
            switch (params.path) {
                case "all":
                    setName(t(capitalize(params.path)) + " " + t("Tasks"))
                    break
                default:
                    setName(t(capitalize(params.path)));
            }

            setIcon(getIcon(params.path))
        }
    }, [params.path, params.id])

    return (

        <div className={'flex items-center justify-start flex-wrap  space-x-2'}>
            <div className={'md:ml-0 ml-4'}>{icon}</div>
            <div className={'font-semibold text-xl flex-grow'}>{name}</div>
            <div className={'flex space-x-4'}>
                <div className={'text-sm flex items-center space-x-2'}>
                    <SortMenu/>
                    <DynamicMenu sendJsonMessage={sendJsonMessage} p={project} overdue={overdue}/>
                </div>
            </div>
        </div>
    )
}
