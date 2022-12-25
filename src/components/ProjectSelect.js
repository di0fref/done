import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {useSelector} from "react-redux";
import {HiChevronDown} from "react-icons/hi";

export default function ProjectSelect(props) {

    const extracted = useSelector(state => state.projects)

    const projects = [{
        id: null,
        name: "Inbox",
    }, ...extracted]

    const [selected, setSelected] = useState({})

    const onChange = (project) => {
        setSelected(project)
        props.onProjectChange(project)
    }

    useEffect(() => {
        setSelected(props.initial && props.initial.name ? props.initial : projects[0])
    }, [props.initial])


    return (
        <div className="">
            <Listbox value={selected} onChange={onChange}>
                <div className="relative">
                    {props.children ?
                        props.children : (

                            <Listbox.Button className={`${props.bg?"bg-neutral-100":""} hover:bg-neutral-100 group cursor-pointer rounded-md`}>
                                <div className={'text-sm text-neutral-500 py-1 px-2 flex items-center space-x-2'}>
                                    <div style={{backgroundColor: selected.color}} className={'rounded-full h-2 w-2'}/>
                                    <div className={'flex-grow text-left'}>{selected.name}</div>
                                    <HiChevronDown className={'_group-hover:visible _invisible'}/>
                                </div>
                            </Listbox.Button>

                        )}

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <Listbox.Options className="z-50 absolute mt-1 w-60_ overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                            {projects.map((project, id) => (
                                <Listbox.Option
                                    key={id}
                                    className={({active}) =>
                                        `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                            active ? 'bg-hov text-gray-800' : 'text-gray-800'
                                        }`
                                    }
                                    value={project}>
                                    {({selected}) => (
                                        <>
                                            <span
                                                className={`block truncate  ${
                                                    selected ? 'font-bold' : 'font-normal'
                                                }`}>
                                                <div className={'flex items-center space-x-2'}>
                                                    <div style={{
                                                        background: project.color
                                                    }} className={'h-2 w-2 rounded-full'}> </div>
                                                    <div>{project.name}</div>
                                                </div>

                                            </span>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}
