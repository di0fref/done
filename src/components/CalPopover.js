import {Popover} from '@headlessui/react'
import {format} from "date-fns";
import {BsCalendar, BsList} from "react-icons/bs";


export default function CalPopover({eventInfo}) {
    console.log(eventInfo)
    return (
        <div className="¨">
            <Popover className="relative_">
                {({open}) => (
                    <>
                        <Popover.Button as={"div"} className={` ${open ? '' : 'text-opacity-90'} z-10 `}>
                            <div className={'font-bold'}>{eventInfo.timeText}</div>
                            <div className={'whitespace-normal'}>{eventInfo.event.title}</div>
                        </Popover.Button>
                        <Popover.Panel className="z-50 absolute right-28  top-0 px-4 sm:px-0 w-[24rem]">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="relative bg-white p-7 ">
                                    <div className={'text-neutral-700'}>
                                        <div className={'flex space-x-2'}>
                                            <div className={'rounded-full h-3 w-3 bg-[#3788d8] mt-2'}/>
                                            <div className={'text-lg font-bold'}>{eventInfo.event.title}</div>
                                        </div>
                                        <div className={'text-sm my-1'}>{format(eventInfo.event.start, "EEEE MMMM d, Y H:mm")}</div>
                                        <div className={'flex items-center space-x-2 my-4'}>
                                            <div><BsList/></div>
                                            <div>{eventInfo.event.extendedProps.description}</div>
                                        </div>
                                        <div className={'flex items-center space-x-2 text-sm'}>
                                            <div><BsCalendar/></div>
                                            <div>{eventInfo.event.extendedProps.organizer.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
        </div>
    )
}
