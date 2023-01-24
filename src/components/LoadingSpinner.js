import {CgSpinner} from "react-icons/cg";

export default function LoadingSpinner({text}) {

    return (
        <div className={'flex items-center space-x-2 justify-center pt-20'}>
            <div><CgSpinner className={'loading-spinner text-neutral-500'}/></div>
            <div className={'text-neutral-500 text-sm'}>Loading...</div>
        </div>
    )
}
