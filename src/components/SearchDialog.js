import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import SearchForm from "./SearchForm";
import {HiSearch} from "react-icons/hi";

export default function MyModal() {
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
                {/*<button*/}
                {/*    type="button"*/}
                {/*    onClick={openModal}*/}
                {/*    className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">*/}
                {/*    Open dialog*/}
                {/*</button>*/}
                <div onClick={openModal} className={'hover:cursor-pointer text-gray-500 w-full bg-white h-9 border rounded-lg flex items-center justify-between'}>
                    <div className={'pl-2 text-sm'}>Search</div>
                    <div className={'pr-2'}><HiSearch/></div>
                </div>
            </div>
            <Dialog onClose={closeModal} open={isOpen} className={"inset-0 fixed p-4 pt-[25vh]"}>
                <div className="fixed inset-0 bg-black bg-opacity-60"/>

                <Dialog.Panel className="mx-auto max-w-xl transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-md transition-all">

                    <SearchForm/>

                </Dialog.Panel>
            </Dialog>
        </>

    )
}
