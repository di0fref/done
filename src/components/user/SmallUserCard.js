import {GoogleHead} from "../helper";
import {useSelector} from "react-redux";

export default function SmallUserCard() {

    const user = useSelector(state => state.current.user)

    return (
        <div className={'flex items-center space-x-4'}>
            <GoogleHead className={"h-6 w-6 rounded-full"}/>
            <div className={'text-left'}>
                <div className={'font-bold'}>{user.displayName}</div>
                <div className={'text-xs'}>{user.email}</div>
                <div>{user.id}</div>
            </div>
        </div>
    )
}