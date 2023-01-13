import Collapse from "@kunukn/react-collapse";
import {BsChevronRight} from "react-icons/bs";
import {useLocalStorage} from "usehooks-ts";
import {capitalize} from "../helper";

export default function TaskGroup(props) {

    const [open, setOpen] = useLocalStorage(props.view + props.title, true)

    return (
        <div className={'z-10'}>
            <button onClick={() => setOpen(!open)} className={'mt-6 mb-2 w-full'}>
                <div className={'flex items-center space-x-1 border-b_'}>
                    <div><BsChevronRight className={`${open ? "rotate-90" : "rotate-0"} h-3 w-4`}/></div>
                    <div className={'flex-grow text-left'}>
                        <div className={'text-neutral-600 dark:text-neutral-300 font-semibold text-sm'}>{capitalize(props.title)} <span className={'text-neutral-400 ml-2 font-normal text-sm'}>{props.count}</span></div>
                    </div>
                </div>
            </button>
            <Collapse style={{
                overflow: open?"visible":"hidden"
            }} isOpen={open}>
                {props.children}
            </Collapse>
        </div>

    )
}
