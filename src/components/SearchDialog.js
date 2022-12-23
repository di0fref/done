import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import SearchForm from "./SearchForm";
import {HiSearch} from "react-icons/hi";
import {FaCheckSquare, FaSearch} from "react-icons/fa";

export default function SearchDialog() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="flex items-center justify-center">

                {/*<div onClick={openModal} className={'hover:cursor-pointer text-gray-500 w-full bg-white h-9 border rounded-lg flex items-center justify-between'}>*/}
                {/*    <div className={'pl-2 text-sm'}>Search</div>*/}
                {/*    <div className={'pr-2'}><HiSearch/></div>*/}
                {/*</div>*/}

                <button onClick={openModal}>
                    <FaSearch className={'w-6 h-6 text-gray-400 hover:text-gray-600'}/>
                </button>
            </div>
            <Dialog onClose={closeModal} open={isOpen} className={"z-50 inset-0 fixed p-4 pt-[25vh]"}>
                <div className="fixed inset-0 bg-black bg-opacity-60"/>

                <Dialog.Panel className="mx-auto max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-md transition-all">

                    <SearchForm closeModel={closeModal}/>

                </Dialog.Panel>
            </Dialog>
        </>

    )
}
