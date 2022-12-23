import {useLocalStorage} from "usehooks-ts";
import {Listbox, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {BsSortDown, BsSortUp} from "react-icons/bs";
import {HiChevronDown} from "react-icons/hi";


const options = [
    {
        "direction": "asc",
        "title": "Ascending",
        // "icon": <BsSortUp className={'h-4 w-4'}/>,
    },
    {
        "direction": "desc",
        "title": "Descending",
        // "icon": <BsSortDown className={'h-4 w-4'}/>,
    },

]

export default function SortDirection() {

    const [sortDirection, setSortDirection] = useLocalStorage("sortDirection", JSON.stringify(options[0]))
    const [selectedOption, setSelectedOption] = useState(JSON.parse(sortDirection))

    const onChange = (option) => {
        setSelectedOption(option)
        setSortDirection(JSON.stringify(option))
    }

    return (
        <div>
            <Listbox value={selectedOption} onChange={onChange}>
                <Listbox.Button className={'hover: bg-neutral-100 group cursor-pointer rounded-md w-40'}>
                    <div className={' text-md text-neutral-500 py-1 px-2 flex items-center space-x-2'}>
                        {selectedOption.direction == "asc" ? <BsSortUp className={'h-4 w-4'}/> :
                            <BsSortDown className={'h-4 w-4'}/>}
                        <div className={'flex-grow text-left text-sm'}>{selectedOption.title}</div>
                        <HiChevronDown className={'group-hover:visible invisible'}/>
                    </div>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Listbox.Options className="z-50 absolute right-20_ _top-10 mt-1 w-40 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                        {options.map((option, id) => (
                            <Listbox.Option
                                ker={id}
                                className={({active}) =>
                                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                        active ? 'bg-hov text-gray-800' : 'text-gray-800'
                                    }`
                                }
                                value={option}>
                                {({selected}) => (
                                    <span
                                        className={`block truncate  ${selected ? 'font-bold' : 'font-normal'}`}>
                                        <div className={'flex items-center space-x-2'}>
                                            <div>{option.direction == "asc" ? <BsSortUp className={'h-4 w-4'}/> :
                                                <BsSortDown className={'h-4 w-4'}/>}</div>
                                            <div>{option.title}</div>
                                        </div>
                                    </span>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    )
}