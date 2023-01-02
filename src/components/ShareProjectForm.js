import {Switch} from '@headlessui/react'
import {useState} from "react";
import {toast} from "react-toastify";

export default function ShareProjectForm({p,...props}) {

    const [shareEdit, setShareEdit] = useState(false)

    const shareHandler = () => {

        console.log(p)
        props.closeModal()
        toast.error("Implement sharing")

    }

    return (
        <div className={'p-4'}>
            <div className="relative mb-4 w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                </div>
                <input type="text" id="shareEmail" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com"/>
            </div>
            <div>


                <div className={'flex items-center space-x-4 mb-4'}>
                    <p className={'flex-grow text-sm font-medium'}>Can edit</p>
                    <Switch
                        checked={shareEdit}
                        onChange={setShareEdit}
                        className={`${
                            shareEdit ? 'bg-blue-600' : 'bg-gray-200'
                        } relative inline-flex h-6 w-11 items-center rounded-full`}>
                        <span
                            className={`${
                                shareEdit ? 'translate-x-6' : 'translate-x-1'
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </div>


            </div>
            <div className={'flex items-center space-x-2 justify-end'}>
                <button className={'cancel-btn'} onClick={props.closeModal} >
                    Cancel
                </button>
                <button className={'save-btn'} onClick={shareHandler}>
                    Share
                </button>
            </div>
        </div>
    )
}
