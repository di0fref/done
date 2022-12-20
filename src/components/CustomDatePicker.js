import {formatDate, getDateColor} from "./helper";
import {forwardRef} from "react";
import DatePicker from "react-datepicker";
import {AiOutlineCalendar} from "react-icons/ai";

export default function CustomDatePicker(props) {


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button onClick={onClick} className={`${getDateColor(props.date)} hover:bg-active cursor-pointer rounded-md`}>
            <div className={'text-md py-1 px-2 flex items-center space-x-2'}>
                <AiOutlineCalendar className={''}/>
                <div className={`text-left text-xs`}>{props.date ? formatDate(new Date(props.date)) : ""}</div>
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
