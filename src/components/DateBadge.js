import {useEffect, useState} from "react";
import {formatDate} from "./helper";

export default function DateBadge(props){

    const [date, setDate] = useState(props.date)

    useEffect(()=>{

    },[props.date])


    if(!date){
        return <></>
    }

    const color = new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
        ? "whitespace-nowrap text-warning text-xs "
        : new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            ? "whitespace-nowrap text-green-800 text-xs"
            : "whitespace-nowrap text-xs text-primary "

    return(
        <div className={`${color} text-center hover:underline hover:cursor-pointer`}>{formatDate(date)}</div>
    )
}
// <span className="bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">Red</span>
