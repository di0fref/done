import {useLocalStorage} from "usehooks-ts";


import {useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'


export default function ToggleCompletedButton() {

    const [enabled, setEnabled] =  useLocalStorage("showCompletedTasks")

    useEffect(()=> {
        setEnabled(enabled?1:0)
    },[enabled])

    return (
        <div className='py-2 px-3 flex items-center justify-start space-x-2'>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={`${enabled ? 'bg-green-600' : 'bg-gray-400'} relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
                <span
                    aria-hidden="true"
                    className={`${enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                />
            </Switch>
            <div className={'text-sm text-gray-800'}>Show completed tasks</div>
        </div>
    )
}
