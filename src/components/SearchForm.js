import {useState} from 'react'
import {Combobox} from '@headlessui/react'
import {useSelector} from "react-redux";
import {RiTaskLine} from "react-icons/ri";
import {HiSearch} from "react-icons/hi";
import DateBadge from "./DateBadge";
import {Link} from "react-router-dom";


export default function SearchForm() {


    const tasks = useSelector(state => state.tasks)

    const [selectedItem, setSelectedItem] = useState({})
    const [query, setQuery] = useState('')

    const filteredTasks =
        query === ''
            ? tasks
            : tasks.filter((task) => {
                return task.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selectedItem} onChange={setSelectedItem} nullable>
            <div className={'flex items-center p-3 '}>
                <Combobox.Input
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(task) => task.name}
                    className={'w-full border-none rounded focus:ring-0'}
                    placeHolder={"Find anything..."}
                />
                <div className={'mr-2'}><HiSearch className={'w-7 h-7 opacity-50'}/></div>
            </div>
            <Combobox.Options>
                <ul className="max-h-[18.375rem] divide-y divide-slate-200 overflow-y-auto rounded-b-lg border-t border-slate-200 text-sm leading-6" role="listbox" id="headlessui-combobox-options-281" data-headlessui-state="open">

                    {filteredTasks.map((task) => (
                        <Combobox.Option
                            key={task.id}
                            value={task}
                            disabled={task.unavailable}
                        >
                            <Link to={"/task/" + task.id}>
                                <li className="hover:bg-hov flex items-center justify-between p-4" role="option" tabIndex="-1">
                                <span className="whitespace-nowrap font-semibold text-slate-900">
                                    {task.name}
                                </span>
                                    <span className="ml-4 text-right text-xs text-slate-600">
                                    <DateBadge date={task.due}/>
                                </span>
                                </li>
                            </Link>

                        </Combobox.Option>
                    ))}
                </ul>
            </Combobox.Options>
        </Combobox>
    )
}
