import {useTranslation} from "react-i18next";


const colors = {
    // "low": "",
    // "normal": "text-blue-300",
    "high": "text-red-500"
}

export default function PrioBadge({value, ...props}) {
    const {t} = useTranslation();

    return (
        <div className={`${colors[value]||"text-neutral-400 dark:text-gray-400 "} px-1 py-1.5 rounded-md text-xs`}>{t(value)}</div>
    )
}
