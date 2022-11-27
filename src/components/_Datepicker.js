import {forwardRef, useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {HiCalendar} from "react-icons/hi2";
import {format} from "date-fns";

export default function _Datepicker(props) {
    const [startDate, setStartDate] = useState(new Date(props.value?props.value:new Date()));

    const updateDate = (date) => {
        setStartDate(date)
        props.setTaskDate(date?format(date, "yyyy-MM-dd"):null)
    }

    const CustomInput = forwardRef(({value, onClick}, ref) => (
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <HiCalendar className={'w-5 h-5 text-gray-500 dark:text-gray-400'}/>
            </div>
            <input onChange={() => {}} value={value} onClick={onClick} ref={ref} type="text" className="form_ text-sm rounded-md  block w-full pl-10 p-2.5 " placeholder="Select date"/>
        </div>
    ));
    return (
        <DatePicker
            isClearable={true}
            fixedHeight
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            onChange={updateDate}
            customInput={<CustomInput/>}
        />
    )
}

