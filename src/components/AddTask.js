import {forwardRef, useEffect, useRef, useState} from "react";
import {BsCalendar} from "react-icons/bs";
import ProjectSelect from "./ProjectSelect";
import DatePicker from "react-datepicker";
import {formatDate, getDateColor} from "./helper";
import DateBadge from "./DateBadge";

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export default function AddTask() {

    const [editing, setEditing] = useState(true)
    const inputReference = useRef(null)
    const ref = useRef();

    const [date, setDate] = useState(new Date());

    useOnClickOutside(ref, () => handleClickOutside());

    useEffect(() => {
        if (editing) {
            inputReference.current.focus()
        }
    }, [editing])

    const handleClickOutside = (e) => {
        // setEditing(false)
        // setDate(null)
    }

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={'flex items-center space-x-2'}>
            <div className={`absolute_ whitespace-nowrap text-center text-sm `}><DateBadge date={value}/></div>
            <div className={'h-8 w-10 rounded-lg bg-gray-200/70 relative hover:cursor-pointer'}>
                <BsCalendar className={'h-4 w-4 text-gray-500 absolute top-2 left-3'}/>
            </div>
        </div>
    ))


    if (editing) {
        return (
            <div onClick={() => setEditing(true)} ref={ref} className={'my-4 h-[50px] rounded-xl bg-white flex items-center space-x-2 px-2'}>
                <div className={'flex-grow'}>
                    <input
                        ref={inputReference}
                        className={'w-full border-0 focus:ring-0 focus:border-0'} type={"text"}/>
                </div>
                <div className={'mt-1_'}>
                    <DatePicker
                        selected={date}
                        onChange={setDate}
                        customInput={
                            <DateCustomInput/>
                        }
                        todayButton={"Today"}
                        dateFormat={"yyyy-MM-dd"}>

                        <div onClick={() => setDate(null)} className={'font-bold py-2 bg-gray-300  text-center hover:cursor-pointer hover:underline'}>Clear date</div>

                    </DatePicker>

                </div>
                <div className={''}>
                    <ProjectSelect outsideClicked={editing}/>
                </div>
            </div>
        )
    }

    return (
        <div className={'w-full my-4'} onClick={() => setEditing(true)}>
            <input placeholder={"Write a new task"} className={'h-[50px] rounded-xl bg-gray-300 w-full border-0 focus:ring-0 focus:border-0'} type={"text"}/>
        </div>
    )
}

