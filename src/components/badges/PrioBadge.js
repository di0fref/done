import {useTranslation} from "react-i18next";
import {BsFlag} from "react-icons/bs";


const colors = {
    // "low": "",
    // "normal": "text-blue-300",
    "high": "text-red-500"
}

export default function PrioBadge({value, ...props}) {
    const {t} = useTranslation();


    return (
        <div className={'flex items-center space-x-1'}>
            <BsFlag className={`${colors[value] || "text-neutral-400 dark:text-gray-400 "} h-2.5 w-2.5`}/>
            <div className={`${colors[value] || "text-neutral-400 dark:text-gray-400 "} text-xs `}>{t(value)}</div>
        </div>
    )
}
