import {HiArchiveBox, HiCalendar, HiInbox, HiStar} from "react-icons/hi2";
import {format} from "date-fns";

export function getIcon(path) {
    switch (path || "upcoming") {
        case "today":
            return <HiStar className={'text-yellow-300'}/>
        case "upcoming":
            return <HiCalendar className={'text-red-400'}/>
        case "anytime":
            return <HiArchiveBox className={'text-green-500'}/>
        case "inbox":
            return <HiInbox className={'text-sky-600'}/>
    }
}
export const dateFormat = "dd MMM"


export function formatDate(date, includeDay) {
    if(!date){
        return null;
    }
    date = new Date(date);
    return format(
        new Date(date),
        dateFormat +
            (date.getFullYear() === new Date().getFullYear() ? '' : ' YYY') +
            (includeDay?" ‧ EEEE":"")
    )
}
