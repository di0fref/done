import {formatDate, getDateColor} from "../helper";
import {forwardRef} from "react";
import DatePicker from "react-datepicker";
import {HiChevronDown} from "react-icons/hi";

export default function CustomDatePicker({disabled, ...props}) {


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button disabled={disabled} onClick={onClick} className={`${disabled?"hover:cursor-not-allowed":""} ${props.bg?"bg-neutral-100":""} z-20 w-full dark:hover:bg-gray-700 hover:bg-neutral-100 group cursor-pointer rounded-md `}>
            <div className={'py-1 px-2 flex items-center space-x-2'}>
                {/*<AiOutlineCalendar className={''}/>*/}
                <div className={`${getDateColor(props.date)} flex-grow text-left`}>{props.date ? formatDate(new Date(props.date)) : "Due"}</div>
                <HiChevronDown className={'group-hover:visible _invisible'}/>
            </div>
        </button>
    ))

    const onChange = (value) => {
        props.onDateChange(value)
    }

    return (
        <DatePicker
            selected={props.date ? new Date(props.date) : null}
            onChange={onChange}
            customInput={
                <DateCustomInput/>
            }
            todayButton={"Today"}
            dateFormat={"yyyy-MM-dd"}>
        </DatePicker>
    )
}
