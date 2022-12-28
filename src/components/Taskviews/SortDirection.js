import {useLocalStorage} from "usehooks-ts";
import BaseListbox from "../BaseListbox";
import {useState} from "react";


export default function SortDirection() {

    const [options, setOptions] = useState([
        {
            "direction": "asc",
            "name": "Ascending",
            "id": "1",
            // "icon": "BsSortUp"
        },
        {
            "direction": "desc",
            "name": "Descending",
            "id": "2",
            // "icon": "BsSortDown",
        },
    ])


    const [direction, setDirection] = useLocalStorage("direction", "asc")
    const [selectedOption, setSelectedOption] = useState(options.find(o => o.direction === direction))



    const onChange = (option) => {
        setDirection(option.direction)
        setSelectedOption(option)
    }

    return (
        <BaseListbox items={options} selected={{...selectedOption}} onChange={onChange}/>
    )
}
