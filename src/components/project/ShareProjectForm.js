import {Switch} from '@headlessui/react'
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import validator from "validator";
import {FaUserCircle} from "react-icons/fa";
import BaseListbox from "../BaseListbox";
import {capitalize, getAvatar, GoogleHead} from "../helper";
import {HiOutlineXMark} from "react-icons/hi2";
import {Tooltip} from "react-tooltip";
import {getAuth} from "firebase/auth";
import {BsEnvelopeFill} from "react-icons/bs";
import axios from "axios";
import {useTranslation} from "react-i18next";
import {ws_broadcast, ws_leave} from "../ws";


export default function ShareProjectForm({p, ...props}) {

    const [shareEdit, setShareEdit] = useState(false)
    const [emails, setEmails] = useState([])
    const [currentEmail, setCurrentEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [shares, setShares] = useState([])
    const {t} = useTranslation();

    async function shareHandler(share) {
        /* Create new */
        const response = await axios.post("/projects_users", share)
        return response.data
    }


    async function deleteShare(share) {
        // const response = await axios.delete("/projects_users/" + share.id)
        // console.log(share)
        // setShares(shares.filter(s => {
        //     return s.id !== share.id
        // }))
        // toast.success(share.email + ' removed from "' + p.name + '"')
        //
        console.log("deleteShare")
        ws_leave({
            room: share.project_id
        })
        // return response.data




    }


    useEffect(() => {
        axios.get("/projects_users/" + p.id).then(response => {
            setShares(response.data)
        })
    }, [])

    useEffect(() => {
        console.log(shares)
    }, [shares])

    const validateEmail = (currentEmail) => {
        if (!validator.isEmail(currentEmail)) {
            setEmailError(t("Please enter valid Email!"))
            return false
        } else {
            setEmailError('')
            return true
        }
    }

    const onEmailAdd = (e) => {
        if (!validateEmail(currentEmail)) {
            return
        }
        if (!(shares.findIndex(element => element.email === currentEmail) > -1)) {

            const share = {
                email: currentEmail,
                status: "pending",
                project_id: p.id,
                shared_user_id: getAuth().currentUser.uid,
            }

            shareHandler(share).then((data) => {
                toast.success(currentEmail + ' invited to "' + p.name + '"')
            })
            setShares([...shares, share])

        } else {
            setEmailError(t("User is already invited"))
        }
    }


    return (
        <div className={''}>
            <div className={'p-4'}>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <BsEnvelopeFill/>
                    </div>
                    <div className={'flex space-x-2 items-center_'}>
                        <input value={currentEmail} onChange={(e) => {
                            setCurrentEmail(e.target.value)
                            setEmailError("")
                        }} type="text" id="shareEmail" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type email and press enter"/>
                        <button className={'save-btn hover:bg-orange-700 bg-orange-600'} onClick={onEmailAdd}>{t("Invite")}</button>
                    </div>
                </div>
                <div className={'text-sm text-red-400 mt-1'}>{emailError}</div>
            </div>
            <div>

                <div className={'px-4 mb-2'}>

                    {shares.map((share) => {
                        return (
                            <div key={share.email} className={'flex items-center space-x-2 py-2 border-t dark:border-gray-700'}>

                                <div>
                                    {share.user_id === getAuth().currentUser.uid ? (
                                        <GoogleHead className={'h-10 rounded-full'}/>
                                    ) : <FaUserCircle className={'h-10 w-10 text-neutral-300'}/>}
                                </div>


                                {share.user_id === getAuth().currentUser.uid ? (
                                        <div className={'flex-grow'}>
                                            <div className={'font-medium text-md text-neutral-700 dark:text-gray-200'}>Me</div>
                                            <div className={'text-sm text-neutral-500 dark:text-gray-200'}>{getAuth().currentUser.email}</div>
                                        </div>
                                    ) :
                                    <div className={'flex-grow'}>
                                        <div className={'font-medium text-md text-neutral-700 dark:text-gray-200'}>{share.name}</div>
                                        <div className={`${!share.name ? "text-md font-medium" : "text-sm"} text-neutral-500 dark:text-gray-200`}>{share.email}</div>
                                    </div>}


                                <div className={'text-sm text-neutral-500 dark:text-gray-400'}>{share.status && t(capitalize(share.status))}</div>

                                {share.user_id !== getAuth().currentUser.uid ? (
                                    <>
                                        <Tooltip anchorId={share.id} content={t("Delete")}/>
                                        <button id={share.id} onClick={() => deleteShare(share)} className={'p-1 text-red-400 hover:bg-neutral-100 rounded'}>
                                            <HiOutlineXMark/>
                                        </button>
                                    </>
                                ) : ""}
                            </div>

                        )
                    })}


                </div>


            </div>
            {/*<div className={'rounded-b border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900/30 flex justify-end space-x-2 p-4'}>*/}
            {/*    <button className={'cancel-btn'} onClick={props.closeModal}>*/}
            {/*        Cancel*/}
            {/*    </button>*/}
            {/*    <button className={'save-btn'} onClick={shareHandler}>*/}
            {/*        Update*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    )
}

