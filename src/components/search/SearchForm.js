import {useState} from 'react'
import {Combobox} from '@headlessui/react'
import {useSelector} from "react-redux";
import {HiSearch} from "react-icons/hi";
import {useNavigate} from "react-router-dom";

export default function SearchForm({closeModel}) {


    const tasks = useSelector(state => state.tasks)
    const projects = useSelector(state => state.projects)

    const [open, setOpen] = useState(false)

    const [query, setQuery] = useState('')

    const navigate = useNavigate();

    const closeSearch = () => {
        setOpen(false)
        closeModel()
    }

    const filteredTasks = query
        ? tasks.filter((task) => task.name.toLowerCase().includes(query.toLowerCase()))
        : []

    const filteredProjects = query
        ? projects.filter((project) => project.name.toLowerCase().includes(query.toLowerCase()))
        : []


    return (
        <>
            <Combobox as={"div"} className={'relative dark:bg-gray-800'} onChange={(task) => {
                if (task) {
                    closeSearch()
                    if (task.project_id) {
                        navigate("/project/" + task.project_id + "/task/" + task.id)
                    } else {
                        navigate("/inbox/" + task.id)
                    }
                }
            }} nullable>
                <div className={'flex items-center border-b dark:border-gray-600 dark:bg-gray-700'}>
                    {/*<Combobox.Input*/}
                    {/*    onChange={(event) => setQuery(event.target.value)}*/}
                    {/*    className={'w-full border-none rounded focus:ring-0 p-4'}*/}
                    {/*    placeholder={"Search..."}*/}
                    {/*/>*/}
                    <div class="relative flex-grow">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <HiSearch className={'w-6 h-6 opacity-50 dark:text-gray-300'}/>
                        </div>
                        <input onChange={(event) => setQuery(event.target.value)} type="text" id="default-search" class=" rounded focus:ring-0 block w-full p-4 pl-12 text-sm text-gray-900 border-none border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." required/>
                    </div>

                    {/*<div className={'mr-2'}><HiSearch className={'w-7 h-7 opacity-50'}/></div>*/}
                </div>
                {query && filteredTasks.length === 0 && filteredProjects.length === 0 ?
                    (<p className={'w-full h-12 border-t dark:border-gray-700 px-4 pt-2 text-neutral-500 dark:bg-gray-800 dark:text-gray-300'}>No results found</p>)
                    : (
                        <>

                            {(filteredTasks.length > 0 || filteredProjects.length > 0) ? (

                                <Combobox.Options static={true}>
                                    <ul className="dark:bg-gray-800 max-h-[18.375rem] divide-y divide-slate-200 dark:divide-gray-700 overflow-y-auto rounded-b-md border-t border-slate-200 dark:border-gray-700 text-sm leading-6">


                                        {(filteredTasks.length !== 0) ? (
                                            <>
                                                {/*<div className={'font-semibold  text-lg p-5'}>Projects</div>*/}
                                                {filteredTasks.map((task) => (
                                                    <Combobox.Option
                                                        key={task.id}
                                                        value={task}
                                                        disabled={task.unavailable}>
                                                        {({active}) => (
                                                            <li className={`${active?"bg-hov dark:bg-gray-900  cursor-pointer":""} flex items-center justify-between p-4`}>
                                                                <span className={`${active?"text-sky-600":""} class="whitespace-nowrap font-semibold text-slate-900 dark:text-gray-300`}>{task.name}</span>
                                                                <span className={'ml-4 text-right text-xs text-slate-600 dark:text-gray-400'}>Task</span>
                                                            </li>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </>) : ""}


                                        {(filteredProjects.length !== 0) ? (
                                            <>
                                                {/*<div className={'font-semibold  text-lg p-5'}>Projects</div>*/}
                                                {filteredProjects.map((project) => (
                                                    <Combobox.Option
                                                        key={project.id}
                                                        value={project}
                                                        disabled={project.unavailable}>
                                                        {({active}) => (
                                                            <li className={`${active?"bg-hov dark:bg-gray-900 cursor-pointer":""} dark:bg-gray-800 flex items-center justify-between p-4`}>
                                                                <span className={'class="whitespace-nowrap font-semibold text-slate-900 dark:text-gray-300'}>{project.name}</span>
                                                                <span className={'ml-4 text-right text-xs text-slate-600 dark:text-gray-400'}>Project</span>
                                                            </li>
                                                        )}
                                                    </Combobox.Option>
                                                ))}
                                            </>) : ""}

                                    </ul>
                                </Combobox.Options>
                            ) : ""}
                        </>

                    )}
            </Combobox>
        </>
    )
}
// {filteredProjects.length > 0?
