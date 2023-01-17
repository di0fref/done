import {PostIcon} from "./BaseListbox";
import {Menu} from "@headlessui/react";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {useEffect, useState} from "react";
import SmallModal from "./modals/SmallModal";
import {toast} from "react-toastify";
import {useLocalStorage} from "usehooks-ts";
import {updateTask} from "../redux/taskSlice";
import {format} from "date-fns";
import {dateFormat, dbDateFormat, formatDate} from "./helper";
import {useDispatch} from "react-redux";
import CustomDatePicker from "./badges/CustomDatePicker";
import {useTranslation} from "react-i18next";

export default function DynamicMenu({overdue}) {

    const {t} = useTranslation();

    const [postponeOpen, setPostponeOpen] = useState(false)
    const [useMenu, setUseMenu] = useState([])

    const [showCompleted, setShowCompleted] = useLocalStorage("showCompleted", null)
    const [showDetails, setShowDetails] = useLocalStorage("showDetails", null)
    const dispatch = useDispatch()
    const [due, setDue] = useState(new Date())
    const closeModal = () => {

        setPostponeOpen(false)
    }

    const postponeHandler = () => {

        if (overdue.length) {
            (async () => {
                try {
                    await overdue.map(task => {
                        dispatch(updateTask({
                            id: task.id,
                            due: format(due, dbDateFormat),
                            changes:[{
                                due: format(due, dbDateFormat),
                            }]
                        }))
                    })
                } catch (error) {
                    toast.error(error)
                }

            })().then((result) => {
                toast.success(overdue.length + " overdue tasks moved to " + formatDate(new Date(due), dateFormat))
                setPostponeOpen(false)
                setDue(new Date())
            })
        } else {
            toast.warning(t("No overdue tasks to postpone"))
            setPostponeOpen(false)
        }
    }

    let taskMenuitems = [
        {
            "name": (showCompleted ? t("Hide") : t("Show")) + " " + t("completed"),
            "icon": "BsCheckSquare",
            allow: true,
            "id": "10",
            "action": () => {
                setShowCompleted(prev => !prev)
            }
        },
        {
            "name": (showDetails ? t("Hide") : t("Show")) + " " + t("details"),
            "icon": "BsListNested",
            "id": "20",
            allow: true,
            "action": () => {
                setShowDetails(prev => !prev)
            }
        },
        {
            "name": t("Postpone"),
            "icon": "BsCalendar",
            allow: true,
            "id": "30",
            "action": () => {
                setPostponeOpen(true)
            }
        },
    ]

    useEffect(() => {

        setUseMenu([...taskMenuitems])

    }, [showCompleted, showDetails])


    return (
        <div>
            <div className={'z-50'}>
                <div className="flex items-center justify-center ">
                    <div className="relative inline-block text-left">

                        <Menu as={"div"}>

                            <Menu.Button className={'hover:bg-neutral-100 p-1 rounded'}>
                                <HiOutlineDotsHorizontal className={'h-5 w-5'}/>
                            </Menu.Button>

                            <Menu.Items static={false} className={'z-50 absolute mt-1 min-w-[14rem] right-0 max-h-72 w-full overflow-auto rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}>
                                {useMenu.map((item, index, {length}) => (
                                    <Menu.Item disabled={!item.allow} onClick={() => item.action()} as={"div"} value={item} key={item.id} className={({active}) => `${(index + 1 === length)?"":""} relative cursor-pointer select-none py-2 pl-4 pr-10 ${active ? 'bg-hov dark:bg-gray-600' : ''} text-neutral-600 dark:text-neutral-300`}>

                                        <button className={`${!item.allow ? "opacity-50" : ""} block truncate font-normal`}>
                                            <div className={'flex items-center space-x-3'}>
                                                <div><PostIcon iconName={item.icon}/></div>
                                                <div>
                                                    <span>{item.name}</span>
                                                </div>
                                            </div>
                                        </button>

                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>

                    </div>
                </div>
            </div>

            <SmallModal open={postponeOpen} closeModal={closeModal} title={t("Postpone tasks")}>
                <div className={'px-4 pt-2'}>
                    <div className={'dark:bg-gray-800 flex items-center'}>
                        <div className={'mr-3 dark:text-gray-300 text-neutral-500'}>{t("Postpone")} <b>{t("overdue")}</b> {t("tasks to")}:</div>


                        <div id={`custom`} className={` rounded dark:hover:bg-gray-600 hover:bg-hov px-2 py-1 dark:text-neutral-200 text-neutral-400 ho_ver:text-neutral-600`}>
                            <CustomDatePicker date={due} onDateChange={(due) => {
                                setDue(due)
                            }}/>
                        </div>

                    </div>
                </div>

                <div className={'flex items-center justify-end space-x-4 p-4'}>
                    <button onClick={closeModal} className={'cancel-btn'}>{t("cancel")}</button>
                    <button className={'save-btn'} onClick={postponeHandler}>{t("Ok")}</button>
                </div>

            </SmallModal>
        </div>
    )
}
