import {forwardRef} from "react";
import DatePicker from "react-datepicker";
import {BsCalendarCheckFill} from "react-icons/bs";

export default function DatePickerIcon({disabled, ...props}) {


    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <button disabled={disabled} onClick={onClick} className={`${disabled?"hover:cursor-not-allowed":""}`}>
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
