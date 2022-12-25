import {useLocalStorage} from "usehooks-ts";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useEffect, useState} from "react";
import {BsSortDown, BsSortUp} from "react-icons/bs";
import {HiChevronDown} from "react-icons/hi";
import BaseListbox from "../BaseListbox";


export default function SortDirection() {

    const [options, setOptions] = useState([
        {
            "direction": "asc",
            "name": "Ascending",
            "id": "1",
            "icon": "BsSortUp"
        },
        {
            "direction": "desc",
            "name": "Descending",
            "id": "2",
            "icon": "BsSortDown",
        },
    ])


    const [direction, setDirection] = useLocalStorage("direction", "asc")
    const [selectedOption, setSelectedOption] = useState({})

    useEffect(() => {
        setSelectedOption(options.find(o => o.direction === direction))
    }, [])

    const onChange = (option) => {
        setDirection(option.direction)
        setSelectedOption(option)
    }

    return (
        <BaseListbox items={options} selected={{...selectedOption}} onChange={onChange}/>
    )
}
