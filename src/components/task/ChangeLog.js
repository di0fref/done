import {useEffect, useState} from "react";
import axios from "axios";
import {capitalize, formatDate, groupBy} from "../helper";
import SmallModal from "../modals/SmallModal";
import {useTranslation} from "react-i18next";

export default function ChangeLog({card, ...props}) {
    const [isOpen, setIsOpen] = useState(false)
    const [changes, setChanges] = useState([])
    const {t} = useTranslation();

    useEffect(() => {
        if (isOpen) {
            /* Fetch data */
            axios.get("/tasks/changes/" + card.id).then((response) => {
                setChanges(groupBy(response.data, "day_changed"))
            })
        }
    }, [isOpen])

    useEffect(() => {
        // console.log(changes);
    }, [changes])

    const closeModal = () => {
        setIsOpen(false)
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className={'pr-2 text-xs font-semibold text-blue-400 hover:underline'}>
                Activity
            </button>

            <SmallModal open={isOpen} closeModal={closeModal} title={"Task activity"}>
                <div className={'text-md px-4'}>

                    {Object.keys(changes).map(group => {
                        return (
                            <>
                                <div className={'font-semibold text-md mt-6'}>{formatDate(new Date(group))}</div>

                                {Object.values(changes[group]).map(change => {
                                    return (
                                        <div key={change.id} className={'flex items-center space-x-4 text-sm  border-t my-2 mr-6'}>
                                            <div className={'h-8'}>
                                                <img className={'rounded-full h-8 w-8'} src={change.image_url}/></div>
                                            <div className={'py-4'}>{change.changed_by_name} {t("changed")} <span className={'font-semibold'}> {t(change.field)}</span> {t("to")} <span className={'font-semibold'}> {change.type === "date" ? formatDate(change.new) : t(change.new)}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </>)
                    })}

                </div>
            </SmallModal>
        </>
    )


}
