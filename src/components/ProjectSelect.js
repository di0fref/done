import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {useSelector} from "react-redux";


export default function ProjectSelect(props) {

    const extracted = useSelector(state => state.projects)

    const projects = [{
        id: null,
        name: "No project",
    }, ...extracted]

    const [selected, setSelected] = useState(props.initial.name ? props.initial : projects[0])


    const onChange = (project) => {
        console.log(project)
        setSelected(project)
        props.onProjectChange(project)
    }
    // useEffect(() => {
    //     props.onProjectChange(selected)
    // }, [selected])


    useEffect(() => {
        setSelected(props.initial.name ? props.initial : projects[0])
    }, [props.initial])


    return (
        <div className=" mr-2">
            <Listbox value={selected} onChange={onChange}>
                <div className="relative">
                    {props.children ?
                        props.children : (

                            <Listbox.Button className="relative shadow-sm w-full cursor-pointer rounded-lg bg-light-gray py-1.5 pl-3_ pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">

                                <div>
                                    <span className="block truncate text-sm text-gray-600">
                                        <div className={'flex items-center space-x-2'}>
                                            <div style={{
                                                background: selected.color
                                            }} className={'h-2 w-2 rounded-full ml-2'}> </div>
                                            <div>{selected.name}</div>
                                        </div>
                                    </span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </span>
                                </div>

                            </Listbox.Button>
                        )}

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="z-50 absolute -right-4 top-10 mt-1 w-72 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

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
