import {formatDate, getDateColor} from "./helper";
import {format} from "date-fns";
import {FaCalendarAlt} from "react-icons/fa";
import {forwardRef, useState} from "react";
import DatePicker from "react-datepicker";

export default function CustomDatePicker(props) {


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={`${getDateColor(props.date)} flex items-center space-x-2 hover:cursor-pointer hover:underline mt-1 mr-2`}>
            <FaCalendarAlt className={'h-3 w-3'}/>
            <div className={`whitespace-nowrap text-center text-xs`}>{props.date ? formatDate(new Date(props.date)) : null}</div>
        </div>
    ))

    const onChange = (value) => {
        props.onDateChange(value)
    }

    return (
        <div>
            <DatePicker
                selected={props.date ? new Date(props.date) : null}
                onChange={onChange}
                customInput={
                    <DateCustomInput/>
                }
                todayButton={"Today"}
                dateFormat={"yyyy-MM-dd"}>
            </DatePicker>
        </div>
    )
}
