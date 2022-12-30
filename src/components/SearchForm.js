import {useEffect, useState} from 'react'
import {Combobox} from '@headlessui/react'
import {useSelector} from "react-redux";
import {HiSearch} from "react-icons/hi";
import DateBadge from "./DateBadge";
import {useNavigate} from "react-router-dom";
import {BsChevronRight} from "react-icons/bs";

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

    // .sort((a, b) => {
    //        return a.name.localeCompare(b.name)
    //    })

    const filteredTasks = query
        ? tasks.filter((task) => task.name.toLowerCase().includes(query.toLowerCase()))
        : []

    const filteredProjects = query
        ? projects.filter((project) => project.name.toLowerCase().includes(query.toLowerCase()))
        : []


    return (
        <>
            <Combobox as={"div"} className={'relative'} onChange={(task) => {
                if (task) {
                    closeSearch()
                    if (task.project_id) {
                        navigate("/project/" + task.project_id + "/task/" + task.id)
                    } else {
                        navigate("/inbox/" + task.id)
                    }
                }
            }} nullable>
                <div className={'flex items-center border-b '}>
                    <Combobox.Input
                        onChange={(event) => setQuery(event.target.value)}
                        className={'w-full border-none rounded focus:ring-0 p-4'}
                        placeholder={"Search..."}
                    />
                    <div className={'mr-2'}><HiSearch className={'w-7 h-7 opacity-50'}/></div>
                </div>
                {query && filteredTasks.length === 0 && filteredProjects.length === 0 ?
                    (<p className={'w-full h-12 border-t px-4 pt-2 text-neutral-500'}>No results found</p>)
                    : (


                        <>

                            {(filteredTasks.length > 0|| filteredProjects.length > 0)  ? (

                                <Combobox.Options static={true}>
                                    <div className="max-h-[24rem] overflow-y-auto mb-4">

                                        {(filteredProjects.length !== 0) ? (
                                            <>
                                                <div className={'font-semibold  text-lg p-5'}>Projects</div>
                                                {filteredProjects.map((project) => (
                                                    <Combobox.Option
                                                        key={project.id}
                                                        value={project}
                                                        disabled={project.unavailable}>
                                                        <button className={'w-full'}>
                                                            <div className={'hover:bg-blue-200 mx-5 px-4 py-6 bg-hov h-8 text-left rounded-md my-1 flex items-center justify-between'}>
                                                                <div>{project.name}</div>
                                                                <div><BsChevronRight/></div>
                                                            </div>
                                                        </button>
                                                    </Combobox.Option>
                                                ))}
                                            </>): ""}

                                        {(filteredTasks.length !== 0) ? (
                                            <>
                                                <div className={'font-semibold text-lg p-5'}>Tasks</div>
                                                {filteredTasks.map((task) => (
                                                    <Combobox.Option
                                                        key={task.id}
                                                        value={task}
                                                        disabled={task.unavailable}>
                                                        <button className={'w-full'}>
                                                            <div className={'hover:bg-blue-200 mx-5 px-4 py-6 bg-hov h-8 text-left rounded-md my-1 flex items-center justify-between'}>
                                                                <div>{task.name}</div>
                                                                <div><BsChevronRight/></div>
                                                            </div>
                                                        </button>
                                                    </Combobox.Option>
                                                ))}
                                            </>) : ""}
                                    </div>
                                </Combobox.Options>
                            ) : ""}
                        </>

                    )}
            </Combobox>
        </>
    )
}
// {filteredProjects.length > 0?
