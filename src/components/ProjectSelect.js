import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {useSelector} from "react-redux";
import {BsChevronBarDown, BsChevronDown, BsList} from "react-icons/bs";

export default function ProjectSelect(props) {

    const extracted = useSelector(state => state.projects)

    const projects = [{
        id: null,
        name: "Inbox",
    }, ...extracted]
    const [selected, setSelected] = useState(props.initial.length ? props.initial : projects[0])

    const onChange = (project) => {
        setSelected(project)
        props.onProjectChange(project)
    }

    useEffect(() => {
        setSelected(props.initial.name ? props.initial : projects[0])
    }, [props.initial])


    return (
        <div className="">
            <Listbox value={selected} onChange={onChange}>
                <div className="relative">
                    {props.children ?
                        props.children : (

                            <Listbox.Button className="hover:bg-active cursor-pointer rounded-md">
                                <div className={'text-md text-tgray/60 py-1 px-2 flex items-center space-x-2'}>
                                    {props.showColor ?
                                        <div style={{backgroundColor: selected.color}} className={'rounded-full h-2 w-2'}></div>
                                        : <BsList/>
                                    }
                                    <div className={'text-left text-xs'}>{selected.name}</div>
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
