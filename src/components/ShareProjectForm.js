import {Switch} from '@headlessui/react'
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import validator from "validator";
import {FaUserCircle} from "react-icons/fa";
import BaseListbox from "./BaseListbox";
import {apiConfig} from "../service/config";
import http from "../service/http-common";
import {capitalize} from "./helper";
import {HiOutlineXMark} from "react-icons/hi2";
import {Tooltip} from "react-tooltip";
import {getAuth} from "firebase/auth";

export default function ShareProjectForm({p, ...props}) {

    const [shareEdit, setShareEdit] = useState(false)
    const [emails, setEmails] = useState([])
    const [currentEmail, setCurrentEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [shares, setShares] = useState([])

    const shareHandler = () => {


        /* Updates */
        // shares.map(share => {
        //     if (share.id) {
        //         http.put(apiConfig.url + "/shares/" + share.id, share).then(response => response.data)
        //     }
        // })

        /* Create new */
        Object.values(shares["project_users"]).map(share => {
            // if (!share.id) {
            //     http.post(apiConfig.url + "/shares", share).then(response => response.data)
            // }

            console.log(share)
        })

        console.log(typeof shares)

    }

    const deleteShare = (share) => {

    }

    const onPermissionChange = (value, share, index) => {
        shares[index] = {
            ...shares[index],
            edit: value.edit,
        };
        setShares(shares)
    }

    useEffect(() => {
        http.get(apiConfig.url + "/shares/" + p.id).then(response => {
            setShares(response.data)
        })
    }, [p])


    const sharePermissionItems = [
        {
            "name": "Can Edit",
            "edit": 1,
            "id": "1",
        },
        {
            "name": "Read Only",
            "edit": 0,
            "id": "2",
        },
    ]

    const validateEmail = (e) => {
        var email = e.target.value

        if (!validator.isEmail(email)) {
            setEmailError('Please enter valid Email!')
            return false
        } else {
            setEmailError('')
            return true
        }
    }

    const onEmailAdd = (e) => {
        if (e.key === 'Enter') {
            if (validateEmail(e) && !(shares.findIndex(element => element.email === e.target.value) > -1)) {
                const share = {
                    email: e.target.value,
                    can_edit: 0,
                    status: "pending",
                    project_id: p.id,
                    id: null,
                    user_id: getAuth().currentUser.uid
                }
                setShares([...shares, share])
                setCurrentEmail("")
            }
        }
    }


    return (
        <div className={''}>
            <div className={'p-4'}>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                    </div>
                    <input value={currentEmail} onChange={(e) => setCurrentEmail(e.target.value)} onKeyPress={onEmailAdd} type="text" id="shareEmail" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type email and press enter"/>
                </div>
                <div className={'text-sm text-red-400 mt-1'}>{emailError}</div>
            </div>
            <div>

                <div className={'px-4 mb-2'}>

                    {Object.keys(shares).map((group) => {
                        return (
                            Object.values(shares[group]).map((share) => {
                                return (
                                    <div key={share.email} className={'flex items-center space-x-2 py-2 border-t dark:border-gray-700'}>
                                        <div>
                                            {share.user_id === getAuth().currentUser.uid ? (
                                                <img alt="Avatar" className={'h-10 w-10 rounded-full'} src={getAuth().currentUser.photoURL}/>
                                            ) : <FaUserCircle className={'h-10 w-10 text-neutral-300'}/>}
                                        </div>


                                        {share.user_id === getAuth().currentUser.uid ? (
                                            <div className={'flex-grow'}>
                                                <div className={'font-medium text-neutral-500 dark:text-gray-200'}>Me</div>
                                                <div className={'text-sm text-neutral-500 dark:text-gray-200'}>{share.email}</div>
                                            </div>
                                        ) : <div className={'flex-grow text-md text-neutral-500 dark:text-gray-200'}>{share.email}</div>}


                                        <div className={'text-sm text-neutral-500 dark:text-gray-400'}>{share.status && capitalize(share.status)}</div>
                                        {/*<BaseListbox onChange={(data) => onPermissionChange(data, share)}*/}
                                        {/*             placement={"right-3"}*/}
                                        {/*             items={sharePermissionItems}*/}
                                        {/*             selected={sharePermissionItems.find(perm => perm.edit === share.edit)||sharePermissionItems[1]}*/}
                                        {/*/>*/}
                                        <Tooltip anchorId={share.id} content={"Delete"}/>
                                        <button id={share.id} onClick={() => deleteShare(share)} className={'p-1 text-red-400 hover:bg-neutral-100 rounded'}>
                                            <HiOutlineXMark/>
                                        </button>
                                    </div>
                                )
                            })
                        )
                    })}

                    {/*{shares.map((share, index) => {*/}
                    {/*    return (*/}
                    {/*        <div key={share.email} className={'flex items-center space-x-2 py-2 border-t'}>*/}
                    {/*            <div><FaUserCircle className={'h-6 w-6 text-neutral-300'}/></div>*/}
                    {/*            <div className={'flex-grow'}>{share.email}</div>*/}
                    {/*            <div className={'text-sm'}>{capitalize(share.status)}</div>*/}
                    {/*            <Tooltip anchorId={share.id} content={"Delete"}/>*/}
                    {/*            <button id={share.id} onClick={() => deleteShare(share)} className={'p-1 text-red-400 hover:bg-neutral-100 rounded'}>*/}
                    {/*                <HiOutlineXMark/>*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    )*/}
                    {/*})}*/}
                </div>


            </div>
            <div className={'rounded-b-md px-4 flex items-center_ space-x-2 justify-end border-t border-gray-600 py-3 bg-gray-100 dark:bg-gray-700'}>
                <button className={'cancel-btn'} onClick={props.closeModal}>
                    Cancel
                </button>
                <button className={'save-btn'} onClick={shareHandler}>
                    Update
                </button>
            </div>
        </div>
    )
}
{/*<div>*/
}
{/*    <BaseListbox onChange={(data) => onPermissionChange(data, share, index)} placement={"right-3"} items={sharePermissionItems} selected={*/
}
{/*        sharePermissionItems.find(perm => perm.edit === share.edit)||sharePermissionItems[1]*/
}
{/*    }/>*/
}
{/*</div>*/
}
