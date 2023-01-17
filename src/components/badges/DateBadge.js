import {useEffect, useState} from "react";
import {formatDate} from "../helper";
import {BsCalendar} from "react-icons/bs";

export default function DateBadge(props) {

    const [date, setDate] = useState(props.date)

    useEffect(() => {

    }, [props.date])


    if (!date) {
        return <></>
    }

    const color = new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
        ? "whitespace-nowrap text-warning  "
        : new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            ? "whitespace-nowrap text-green-600 "
            : "whitespace-nowrap text-primary "

    return (
        <div className={'flex items-center space-x-1'}>
            <BsCalendar className={`${color} h-2.5 w-2.5`}/>
            <div className={`${color} text-xs `}>{formatDate(date)}</div>
        </div>
    )
}
// <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Red</span>
