import {HiArchiveBox, HiCalendar, HiInbox, HiStar} from "react-icons/hi2";

export default function getIcon(path){
        switch (path||"upcoming") {
            case "today":
                return <HiStar className={'text-yellow-400'}/>
            case "upcoming":
                return <HiCalendar className={'text-red-400'}/>
            case "anytime":
                return <HiInbox className={'text-green-500'}/>
            case "someday":
                return <HiArchiveBox className={'text-sky-500'}/>
        }
    }
