import {useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import BaseListbox from "../BaseListbox";


export default function Sort() {
    const [options, setOptions] = useState([
        {
            "name": "Due date",
            "field": "due",
            "id": "1guhj",
            "icon": "",
        },
        {
            "name": "Name",
            "field": "name",
            "id": "2hgkjh",
            "icon": "",
        },
        {
            "name": "Priority",
            "field": "prio",
            "id": "3yul",
            "icon": "",
        },
    ])
    const [sort, setSort] = useLocalStorage("sort", "due")
    const [selectedOption, setSelectedOption] = useState(options.find(o => o.field === sort))


    const onChange = (option) => {
        setSort(option.field)
        setSelectedOption(option)
    }

    return (
        <BaseListbox onChange={onChange} items={options} selected={selectedOption}/>
    )
}
