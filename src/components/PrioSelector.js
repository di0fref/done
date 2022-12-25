import {Listbox, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from "react";
import {HiChevronDown} from "react-icons/hi";
import PrioFlag from "./PrioFlag";
import {priorities} from "./helper";



export default function PrioSelector(props) {
    const [selected, setSelected] = useState({})

    const onChange = (prio) => {
        setSelected(prio)
        props.onProjectChange(prio)
    }
    useEffect(() => {
        //
        // const s = priorities.find(prio => prio.prio === props.initial)
        //
        // console.log(s)
        // setSelected(s ? s : priorities[0])
    }, [])

    return (
        <div>
            <Listbox value={selected} onChange={onChange}>


                <Listbox.Button className={`${props.bg ? "bg-neutral-100" : ""} hover:bg-neutral-100 group cursor-pointer rounded-md _w-60`}>
                    <div className={'text-sm text-neutral-500 py-1 px-2 flex items-center space-x-2'}>
                        <PrioFlag prio={selected.prio}/>
                        <div className={'flex-grow text-left'}>{selected.title}</div>
                        <HiChevronDown className={'group-hover:visible _invisible'}/>
                    </div>
                </Listbox.Button>


                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Listbox.Options className={`${props.place==="left"?"right-_0 ":""} z-50 w-4_2 absolute mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm`}>

                        {priorities.map((prio, id) => (
                            <Listbox.Option
                                key={id}
                                className={({active}) =>
                                    `relative cursor-pointer select-none py-2 pl-4 pr-4 ${
                                        active ? 'bg-hov text-gray-800' : 'text-gray-800'
                                    }`
                                }
                                value={prio}>
                                {({selected}) => (
                                    <span
                                        className={`block truncate  ${
                                            selected ? 'font-bold' : 'font-normal'
                                        }`}>
                                            <div className={'flex items-center space-x-2'}>
                                               <PrioFlag prio={prio.prio}/>
                                                <div>{prio.title}</div>
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
