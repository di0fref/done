import {Avatar} from "./BaseListbox";
import {useSelector} from "react-redux";
import {capitalize, formatDate, paths} from "./helper";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Popover} from '@headlessui/react'

const getLink = (card, params) => {

    let link = ""
    if (card.project_id) {
        link = ("/project/" + card.project_id + "/task/" + card.id)
    } else {
        link = ("/" + params.path + "/task/" + card.id)
    }

    return link
}

const NotificationType = ({notification}) => {

    const params = useParams()
    const card = useSelector(state => state.tasks.find(task => notification.module_id === task.id))

    const [data, setData] = useState({})


    useEffect(() => {

        switch (notification.action) {
            case "assign":
                setData({
                    0: "assigned ",
                    1: notification.module_name,
                    2: " to you.",
                })
                break;
            case "unassign":
                setData({
                    0: "unassigned you on",
                    1: notification.module_name,
                    2: ".",
                })
                break;
            case "share":
                setData({
                    0: "joined the shared project ",
                    1: notification.module_name,
                    2: ".",
                })
                break;
            case "remove_share":
                setData({
                    0: "",
                    1: notification.module_name,
                    2: "",
                })
                break;
        }
    }, [])



// return link
    return (
        <div>
            {data[0]} <Popover.Button className={"text-sky-600 font-semibold hover:text-sky-800"} as={Link} href={"/"}>{data[1]}</Popover.Button>{data[2]}
        </div>
    )

}


export default function Activity({notification}) {

    const user = useSelector(state => state.current.user)

    return (
        <div key={notification.module_id} className={'w-full border-b py-3'}>
            <div className={'flex space-x-2 '}>
                <div className={'w-12'}>
                    <Avatar img={user.image_url} className={'w-10 h-10'}/>
                </div>
                <div className={'flex w-full  justify-between'}>
                    <div className={'text-sm text-neutral-700'}>
                        <div>{notification.action_user_name}</div>
                        <div className={'text-xs mt-2'}><NotificationType notification={notification}/></div>
                    </div>
                    <div className={'text-xs text-neutral-400'}>{formatDate(notification.created_at)}</div>
                </div>
            </div>
        </div>
    )
}

