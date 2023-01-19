import {GoogleHead} from "../helper";

export default function SmallUserCard({user}) {
    console.log(user);
    return (
        <div className={'flex items-center space-x-4'}>
            <GoogleHead className={"h-6 w-6 rounded-full"}/>
            <div className={'text-left'}>
                <div className={'font-bold'}>{user.displayName}</div>
                <div className={'text-xs'}>{user.email}</div>
            </div>
        </div>
    )
}