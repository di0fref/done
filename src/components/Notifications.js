import {BsBellFill} from "react-icons/bs";
import {Popover} from '@headlessui/react'
import {useEffect, useState} from "react";
import Activity, {NotificationType} from "./Activity";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Avatar} from "./BaseListbox";
import {formatDate} from "./helper";
import {toast} from "react-toastify";

export function ShareDecider({share, reload}) {
    const onClick = (share, status) => {
        axios.put("projects_users/" + share.id, {
            "status": status,
            "module_id": share.project_id,
            "module_name": share.name
        }).then(response => {
            console.log(response)
            reload()
            toast.success("You have joined project " + share.project_name)
        }).catch(err => {
            toast.error(err)
        })
    }

    return (
        <div key={share.module_id} className={'w-full border-b py-3'}>
            <div className={'flex space-x-2 '}>
                <div className={'w-12'}>
                    <Avatar img={share.image_url} className={'w-10 h-10'}/>
                </div>
                <div className={'flex w-full  justify-between'}>
                    <div className={'text-sm text-neutral-700'}>
                        <div>{share.action_user_name}</div>
                        <div className={'text-xs mt-2'}>

                            <p>invited you to join project <span className={'font-semibold'}>{share.project_name}</span>
                            </p>

                            <div className={'mt-3'}>
                                <div className={'flex items-center space-x-4'}>
                                    <button onClick={e => onClick(share, "rejected")} className={'cancel-btn'}>Reject</button>
                                    <button onClick={e => onClick(share, "accepted")} className={'save-btn'}>Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'text-xs text-neutral-400'}>{formatDate(share.created_at)}</div>
                </div>
            </div>
        </div>
    )
}

export default function Notifications() {

    const [data, setData] = useState({notifications: [], shares: []})
    const [loading, setLoading] = useState(false)
    const [o, setOpen] = useState(false)

    const getNotifications = async () => {
        setLoading(true)
        const response = await axios.get("notifications");
        setData(response.data)
        setLoading(false)
        setOpen(false)
    }
    const reload = () => {
        getNotifications()
    }

    useEffect(() => {
        o && getNotifications()
    }, [o])

    return (
        <>

            <div className="z-40 relative">
                <Popover className="relative">
                    <Popover.Button onClick={e => setOpen(true)} className={'active:border-none active:ring-0 text-gray-400 hover:text-gray-600 focus:border-0 focus:ring-0'}>
                        <div className="flex items-center justify-center">
                            <div className={'cursor-pointer'}>
                                <BsBellFill className={'w-6 h-6'}/>
                            </div>
                        </div>
                    </Popover.Button>
                    <Popover.Panel static={false} className="z-30 absolute left-5 _mt-3 w-screen max-w-sm ">
                        <div className="z-30 bg-white scrollbar-hide  p-4 overflow-auto rounded-md shadow-xl ring-1 ring-black ring-opacity-5">

                            <div className={'pb-4'}>
                                <div className={'w-fit  mx-auto text-xs bg-blue-100 text-blue-500 rounded-2xl py-1 px-2'}>Notifications</div>
                            </div>
                            <div className={'z-50 scrollbar-hide  min-h-[20rem] max-h-[20rem] overflow-auto'}>

                                {!loading ?
                                    <>
                                        {data?.shares.map(share => (
                                            <ShareDecider reload={reload} key={share.id} share={share}/>
                                        ))}

                                        {data?.notifications.map(notification => (
                                            <Activity key={notification.id} notification={notification}/>
                                        ))}
                                    </>
                                    : "Loading notifications..."}

                            </div>
                        </div>


                    </Popover.Panel>
                </Popover>
            </div>
        </>
    )
}
