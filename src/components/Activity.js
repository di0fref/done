import {Avatar} from "./BaseListbox";
import {useSelector} from "react-redux";
import {capitalize, formatDate, paths} from "./helper";
import {forwardRef, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {Popover} from '@headlessui/react'

const getLink = (card, params) => {
    let link = ""

    if (card.module === "Project") {
        link = ("/project/" + card.bean.id)
    }

    else {
        link = ("/" + params.path + "/task/" + card.id)
    }

    return link
}

const MyLink = forwardRef(({onClick, href, ...props}, ref) => {
    return (
        <Link className={"text-sky-600 font-semibold hover:text-sky-800"} to={href} onClick={onClick} ref={ref}>{props.children}</Link>
    )
})

export const NotificationType = ({notification}) => {

    const params = useParams()

    const [data, setData] = useState({})

    useEffect(() => {

        switch (notification.action) {
            case "assigned":
                setData({
                    0: "assigned ",
                    1: notification.bean.name,
                    2: " to " + notification.to_user.name,
                })
                break;
            case "joined":
                setData({
                    0: "joined project ",
                    1: notification.bean.name,
                    2: ".",
                })
                break;
            case "rejected":
                setData({
                    0: "rejected to join project ",
                    1: notification.bean.name,
                    2: ".",
                })
                break;
        }
    }, [])

    console.log()

// return link
    return (
        <div>
            {data[0]}
            <Popover.Button as={MyLink} href={getLink(notification, params)}>
                {data[1]}
            </Popover.Button>
            {data[2]}
        </div>
    )

}


export default function Activity({notification}) {

    const user = useSelector(state => state.current.user)

    return (
        <div key={notification.module_id} className={'w-full border-b py-3'}>
            <div className={'flex space-x-2 '}>
                <div className={'w-12'}>
                    <Avatar img={notification.by_user.image_url} className={'w-10 h-10'}/>
                </div>
                <div className={'flex w-full  justify-between'}>
                    <div className={'text-sm text-neutral-700'}>

                        <div>{(notification.by_user_id === user.id) ? "You" : notification.to_user.name}</div>
                        {/*<div>{notification.by_user.name}</div>*/}
                        <div className={'text-xs mt-2'}><NotificationType notification={notification}/></div>
                    </div>
                    <div className={'text-xs text-neutral-400'}>{formatDate(notification.created_at)}</div>
                </div>
            </div>
        </div>
    )
}

