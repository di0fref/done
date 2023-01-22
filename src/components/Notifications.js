import {BsBellFill} from "react-icons/bs";
import {Popover} from '@headlessui/react'
import {useEffect} from "react";
import Activity from "./Activity";
import {useSelector} from "react-redux";

export default function Notifications() {


    const notifications = useSelector((state => state.notifications||[]))

    useEffect(() => {

    }, [])

    const openModal = () => {

    }

    return (
        <div className="z-40 relative">
            <Popover className="relative">
                <Popover.Button className={'active:border-none active:ring-0 text-gray-400 hover:text-gray-600 focus:border-0 focus:ring-0'}>
                    <div className="flex items-center justify-center">
                        <div onClick={openModal} className={'cursor-pointer'}>
                            <BsBellFill className={'w-6 h-6'}/>
                        </div>
                    </div>
                </Popover.Button>
                <Popover.Panel static={false} className="z-30 absolute left-0  mt-3 w-screen max-w-sm ">
                    <div className="z-30 overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className={'z-50 bg-white p-4'}>
                            {notifications?.map(notification => (
                                <Activity key={notification.module_id} notification={notification}/>
                            ))}
                        </div>
                    </div>
                </Popover.Panel>
            </Popover>
         </div>
    )
}
