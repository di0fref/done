import {HiArchiveBox, HiCalendar, HiInbox, HiStar} from "react-icons/hi2";
import {format, formatRelative} from "date-fns";
import {FaArchive, FaCalendar, FaInbox, FaStar} from "react-icons/fa";
import {BsCalendar, BsList} from "react-icons/bs";
import {enGB} from "date-fns/locale";
import PrioFlag from "./PrioFlag";
import {socket} from "../App";


export const priorities = [
    {
        "prio": "low",
        "name": "Low",
        "icon": "BsFlag",
        "css": "text-neutral-500",
        "id": "1"
    },
    {
        "prio": "normal",
        "name": "Normal",
        "icon": "BsFlag",
        "css": "text-blue-600",
        "id": "2"

    },
    {
        "prio": "high",
        "name": "High",
        "icon": "BsFlag",
        "css": "text-red-500",
        "id": "3"
    }
]

export function getIcon(path) {

    switch (path) {
        case "today":
            return <FaStar className={'text-gray-500'}/>
        case "upcoming":
            return (
                <div className={'relative_'}>
                    <BsCalendar className={'text-gray-500'}/>
                </div>
            )
        case "all":
            return <FaArchive className={'text-gray-500'}/>
        case "inbox":
            return <FaInbox className={'text-gray-500'}/>
        case "lists":
            return <BsList className={'text-gray-500'}/>
    }
}

export const dateFormat = "d MMM"

export const paths = [
    "today",
    "upcoming",
    "inbox",
    "all"
];

function getFormat(date, token) {

    const format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY');

    const formatRelativeLocale = {
        lastWeek: format,
        yesterday: "'Yesterday'",
        today: "'Today'",
        tomorrow: "'Tomorrow'",
        nextWeek: format,
        other: format,
    }
    return formatRelativeLocale[token]
}

export function formatRelativeDate(date) {

    const locale = {
        ...enGB,
        formatRelative: (token) => getFormat(date, token)//formatRelativeLocale[token],
    };
    date = new Date(date);
    return formatRelative(date, new Date(), {locale});
}

export function formatDate(date, includeDay) {

    return formatRelativeDate(date);

    // if (!date) {
    //     return null;
    // }
    // date = new Date(date);
    // return format(
    //     new Date(date),
    //     dateFormat +
    //     (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY') +
    //     (includeDay ? " ‧ EEEE" : "")
    // )
}


export const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function getDateColor(date) {
    if (!date) {
        return "text-gray-500"
    }
    return new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
        ? "whitespace-nowrap text-warning  "
        : new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            ? "whitespace-nowrap text-green-600 "
            : "whitespace-nowrap text-primary "
}
