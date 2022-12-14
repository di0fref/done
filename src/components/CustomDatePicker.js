import {getDateColor} from "./helper";
import {format} from "date-fns";
import {FaCalendarAlt} from "react-icons/fa";
import {forwardRef, useState} from "react";
import DatePicker from "react-datepicker";

export default function CustomDatePicker(props) {

    const [date, setDate] = useState(props.date)

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={`${getDateColor(date)} flex items-center space-x-2 hover:cursor-pointer hover:underline mt-1 mr-2`}>
            <FaCalendarAlt/>
            <div className={`whitespace-nowrap text-center text-sm`}>{date ? format(new Date(value), "EEE, d MMM") : null}</div>
        </div>
    ))

    const onChange = (value) => {
        setDate(value)
        props.onDateChange(value)
    }

    return (
        <div>
            <DatePicker
                selected={date ? new Date(date) : null}
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
