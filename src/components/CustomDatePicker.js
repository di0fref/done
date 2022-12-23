import {formatDate, getDateColor} from "./helper";
import {forwardRef} from "react";
import DatePicker from "react-datepicker";
import {AiOutlineCalendar} from "react-icons/ai";
import {HiChevronDown} from "react-icons/hi";

export default function CustomDatePicker(props) {


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button onClick={onClick} className={` ${props.bg?"bg-neutral-100_":""} hover:bg-neutral-100 group cursor-pointer rounded-md w-full`}>
            <div className={'text-md py-1 px-2 flex items-center space-x-2'}>
                {/*<AiOutlineCalendar className={''}/>*/}
                <div className={`${getDateColor(props.date)} flex-grow text-left `}>{props.date ? formatDate(new Date(props.date)) : "--"}</div>
                <HiChevronDown className={'group-hover:visible invisible'}/>
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
