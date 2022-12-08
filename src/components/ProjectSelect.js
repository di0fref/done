import {Fragment, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {useSelector} from "react-redux";


export default function ProjectSelect(props) {

    const extracted = useSelector(state => state.projects)
    const projects = [{
        id: "none",
        name: "No project",
    }, ...extracted]

    const [selected, setSelected] = useState(projects[0])

    useEffect(() => {
        // setSelected(projects[0])
        console.log(selected)
    }, [props.outsideClicked, selected])

    return (
        <div className="w-32 mr-2">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-200/70 py-1.5 pl-3 pr-10 text-left shadow-md_ focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate text-sm text-gray-600">{selected.name}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute -right-6 top-10 mt-1 w-72 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">

                            {projects.map((project, id) => (
                                <Listbox.Option
                                    key={id}
                                    className={({active}) =>
                                        `elative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active ? 'bg-gray-200 text-gray-800' : 'text-gray-800'
                                        }`
                                    }
                                    value={project}>
                                    {({selected}) => (
                                        <>
                                            <span
                                                className={`block truncate  ${
                                                    selected ? 'font-bold' : 'font-normal'
                                                }`}>
                                                {project.name}

                                            </span>

                                            {/*{selected ? (*/}
                                            {/*    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">*/}
                                            {/*         <CheckIcon className="h-5 w-5" aria-hidden="true"/>*/}
                                            {/*     </span>*/}
                                            {/*) : null}*/}

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
