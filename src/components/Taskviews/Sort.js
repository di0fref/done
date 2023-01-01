import {useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import BaseListbox from "../BaseListbox";


export const sortF = (a, b, sortBy) => {

    const prio = {
        "low": 0,
        "normal": 1,
        "high": 2
    }
    if (sortBy === "prio") {
        return prio[a["prio"]] < prio[b["prio"]]?1:-1
    }

    if(sortBy === "due"){
        return (new Date(a.due) > new Date(b.due))?1:-1
    }
    return a[sortBy].localeCompare(b[sortBy])
}

export default function Sort() {
    const [options, setOptions] = useState([
        {
            "name": "By Due date",
            "field": "due",
            "id": "1guhj",
            "icon": "",
        },
        // {
        //     "name": "Name",
        //     "field": "name",
        //     "id": "2hgkjh",
        //     "icon": "",
        // },
        {
            "name": "By Priority",
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
