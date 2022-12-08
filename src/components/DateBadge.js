import {useState} from "react";
import {formatDate} from "./helper";

export default function DateBadge(props){

    const [date, setDate] = useState(props.date)

    if(!date){
        return <></>
    }

    const color = new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
        ? "whitespace-nowrap bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900 "
        : new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            ? "whitespace-nowrap bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900"
            : "whitespace-nowrap text-xs font-semibold mr-2 px-2.5 py-0.5 "

    return(
        <div className={`${color} `}>{formatDate(date)}</div>
    )
}
// <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Red</span>
