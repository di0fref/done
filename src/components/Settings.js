import {useEffect, useState} from "react";
import {HiXMark} from "react-icons/hi2";
import {useLocalStorage, useReadLocalStorage} from "usehooks-ts";
import {Switch} from '@headlessui/react'

export default function Settings(props) {

    const [showModal, setShowModal] = useState(false);
    const [darkTheme, setDarkTheme] = useLocalStorage("theme", "")
    const [showCompleted, setShowCompleted] = useLocalStorage("showCompleted", "")
    const [darkEnabled, setDarkEnabled] = useState(!!darkTheme)
    const [completedEnabled, setCompletedEnabled] = useState(!!showCompleted)

    useEffect(() => {
        setShowModal(props.open)
    }, [props.open])

    useEffect(() => {
        setCompletedEnabled(false)
        setDarkEnabled(false)
    }, [])

    const closeModal = () => {
        setShowModal(false)
        props.setModalOpen(false)


    }

    const saveHandler = () => {
        darkEnabled ? document.documentElement.classList.add("dark") : document.documentElement.classList.remove("dark")
        setShowCompleted(completedEnabled ? "1" : "0")
        closeModal()
    }

    const onThemeChange = (checked) => {
        setDarkTheme(checked ? 'dark' : 'light')
        setDarkEnabled(checked)
    }

    const onShowCompletedChange = (checked) => {
        setCompletedEnabled(checked)
    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex  fixed top-[15vh] left-0 right-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6_ mx-auto w-[32rem]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between py-3 px-4 border-b border-solid border-slate-200 rounded-t">

                                    <div className={'font-semibold'}>Settings</div>
                                    <button
                                        className="hover:bg-gray-200 rounded"
                                        onClick={closeModal}>
                                        <HiXMark className={'h-5 w-5 text-neutral-500'}/>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 flex text-neutral-600">
                                    <div className="w-full py-4 flex space-y-2 flex-col">
                                        <div className={'flex items-center space-x-4'}>
                                            <p className={'flex-grow'}>Dark Theme</p>

                                            <Switch
                                                checked={darkEnabled}
                                                onChange={onThemeChange}
                                                className={`${
                                                    darkEnabled ? 'bg-blue-600' : 'bg-gray-200'
                                                } relative inline-flex h-6 w-11 items-center rounded-full`}>
                                                <span className="sr-only">Enable notifications</span>
                                                <span
                                                    className={`${
                                                        darkEnabled ? 'translate-x-6' : 'translate-x-1'
                                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                />
                                            </Switch>
                                        </div>
                                        <div className={'flex items-center space-x-4'}>
                                            <p className={'flex-grow'}>Show completed tasks</p>

                                            <Switch
                                                checked={completedEnabled}
                                                onChange={onShowCompletedChange}
                                                className={`${
                                                    completedEnabled ? 'bg-blue-600' : 'bg-gray-200'
                                                } relative inline-flex h-6 w-11 items-center rounded-full`}>
                                                <span className="sr-only">Enable notifications</span>
                                                <span
                                                    className={`${
                                                        completedEnabled ? 'translate-x-6' : 'translate-x-1'
                                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                                />
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="space-x-3 flex items-center justify-end px-6 py-4 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="cancel-btn"
                                        type="button"
                                        onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button
                                        className="save-btn"
                                        type="button"
                                        onClick={saveHandler}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
                </>
            ) : null}
        </>
    );
}
