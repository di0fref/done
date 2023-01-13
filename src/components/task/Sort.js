import {useState} from "react";
import {useLocalStorage} from "usehooks-ts";
import BaseListbox from "../BaseListbox";
import BaseMenu from "../BaseMenu";
import {BsFilterCircle, BsFilterLeft} from "react-icons/bs";


export const sortF = (a, b, sortBy) => {

    const prio = {
        "low": 0,
        "normal": 1,
        "high": 2
    }
    if (sortBy === "order") {
        return a[sortBy] < b[sortBy] ? 1 : -1
    }
    if (sortBy === "prio") {
        return prio[a["prio"]] < prio[b["prio"]] ? 1 : -1
    }

    if (sortBy === "due") {
        return (new Date(a.due) > new Date(b.due)) ? 1 : -1
    }
    return a[sortBy].localeCompare(b[sortBy])
}

export default function Sort() {

    const onChange = (e, option) => {
        setSort(option.value)
        setSelectedOption(option)
    }


    const options = [
        {
            "name": "Due date (default)",
            "value": "due",
            "id": "sort_due",
            "icon": "BsCalendar",
            "allow": true,
            "action": onChange
        },
        {
            "name": "Project",
            "value": "project",
            "id": "sort_project",
            "icon": "BsGrid",
            "allow": true,
            "action": onChange
        },
        {
            "name": "Assigned user",
            "value": "assigned_user_name",
            "id": "sort_assigned",
            "icon": "BsPerson",
            "allow": true,
            "action": onChange
        },
        {
            "name": "Priority",
            "value": "prio",
            "id": "sort_prio",
            "icon": "BsFlag",
            "allow": true,
            "action": onChange

        },
    ]

    const [sort, setSort] = useLocalStorage("sort", "due")
    const [selectedOption, setSelectedOption] = useState(options.find(o => o.value === sort))


    return (
        <div className={'relative'}>
            <BaseMenu def={"due"} showTitle={false} title={"Group tasks by"} icon={
                <BsFilterLeft className={'h-5 w-5'}/>} items={options} selected={selectedOption}/>
            {/*<BaseListbox onChange={onChange} items={options} selected={selectedOption} placement={'right-0'}/>*/}
        </div>
    )
}
