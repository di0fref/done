import {Avatar} from "../BaseListbox";

export default function UserBadge({name, image, ...props}) {
    return (
        <div className={'flex items-center space-x-1'}>
            <Avatar img={image} className={`text-neutral-400 dark:text-gray-400 "} h-2.5 w-2.5`}/>
            <div className={`text-neutral-400 dark:text-gray-400 text-xs whitespace-nowrap`}>{name}</div>
        </div>
    )
}
