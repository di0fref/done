import {BsBellFill} from "react-icons/bs";
import {Popover} from '@headlessui/react'
import {useEffect, useState} from "react";
import Activity, {NotificationType} from "./Activity";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Avatar} from "./BaseListbox";
import {delay, formatDate} from "./helper";
import {toast} from "react-toastify";
import {FaSpinner} from "react-icons/fa";
import {CgSpinner} from "react-icons/cg";
import LoadingSpinner from "./LoadingSpinner";
import {getProjects} from "../redux/projectSlice";
import {ws_join} from "./ws";
import {getTasks} from "../redux/taskSlice";
import {join} from "../socket/socket.io";
import {getNotifications} from "../redux/notificationSlice";
import Badge from "./badges/Badge";

export function ShareDecider({share}) {

    const dispatch = useDispatch()

    const onClick = (share, status) => {

        axios.put("projects_users/" + share.id, {
            "status": status,
            "module_id": share.project_id,
            "module_name": share.name
        }).then(response => {

            if (status === "accept") {
                /* Get project and tasks */
                dispatch(getProjects()).then(response => {
                    /* Subscribe */
                    join(share.project_id)
                    toast.success("You have joined project " + share.project_name)
                    dispatch(getTasks())
                    dispatch(getNotifications())
                })
            } else {
                toast.success("You have rejected to join project " + share.project_name)
                dispatch(getNotifications())
            }

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
                                    <button onClick={e => onClick(share, "rejected")} className={'cancel-btn text-xs'}>Reject</button>
                                    <button onClick={e => onClick(share, "accepted")} className={'save-btn text-xs'}>Accept</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={'text-xs text-neutral-400 relative'}>
                        {share?.status === "pending"
                            ? <div className={'bg-red-500 h-1.5 w-1.5 rounded-full absolute -left-2.5'}/>
                            : ""
                        }
                        <div>{formatDate(share.created_at)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Notifications() {

    const [data, setData] = useState({notifications: [], shares: []})
    const [loading, setLoading] = useState(false)
    const [o, setOpen] = useState(true)
    const [count, setCount] = useState(0);
    const notifications = useSelector(state => state.notifications)

    const new_count = useSelector(state => state.notifications.notifications?.filter(notification => notification.status === "new"))
    const new_count_shares = useSelector(state => state.notifications.shares?.filter(share => share.status === "pending"))

    // console.log(new_count_shares.length)

    useEffect(() => {
        setCount(new_count_shares.length + new_count.length)
    }, [new_count_shares.length, new_count.length])

    // console.log(Object.keys(new_count))


    return (
        <>

            <div className="z-40 relative">
                <Popover className="relative">
                    <Popover.Button onClick={e => setOpen(true)} className={'text-neutral-500 dark:text-gray-400 hover:text-neutral-700'}>
                        <BsBellFill className={'w-6 h-6'}/>
                        {count > 0 ?
                            <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-1.5 dark:border-gray-900">{count}</div>
                            : ""}
                    </Popover.Button>
                    <Popover.Panel static={false} className="z-30 absolute left-5 _mt-3 w-screen max-w-sm ">
                        <div className="z-30 bg-white scrollbar-hide  p-4 overflow-auto rounded-md shadow-xl ring-1 ring-black ring-opacity-5">

                            <div className={'pb-4'}>
                                <div className={'w-fit  mx-auto text-xs bg-blue-100 text-blue-500 rounded-2xl py-1 px-2'}>Notifications</div>
                            </div>
                            <div className={'z-50 scrollbar-hide  min-h-[20rem] max-h-[20rem] overflow-auto'}>
                                {!loading ?
                                    <>
                                        {notifications?.shares.map(share => (
                                            <ShareDecider key={share.id} share={share}/>
                                        ))}

                                        {notifications?.notifications.map(notification => (
                                            <Activity key={notification.id} notification={notification}/>
                                        ))}
                                    </>
                                    : <LoadingSpinner/>
                                }

                            </div>
                        </div>

                    </Popover.Panel>
                </Popover>
            </div>
        </>
    )
}
