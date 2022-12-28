import {formatDate, getDateColor} from "./helper";
import {forwardRef} from "react";
import DatePicker from "react-datepicker";
import {HiChevronDown} from "react-icons/hi";
import {BsCalendarCheckFill} from "react-icons/bs";

export default function DatePickerIcon(props) {


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button onClick={onClick}>
                <BsCalendarCheckFill className={'h-4 w-4'}/>
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
