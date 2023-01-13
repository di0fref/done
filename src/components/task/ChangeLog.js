import {useEffect, useState} from "react";
import axios from "axios";
import {capitalize, formatDate, groupBy} from "../helper";

export default function ChangeLog({open, card}) {
    const [isOpen, setIsOpen] = useState(true)
    const [changes, setChanges] = useState([])

    useEffect(() => {
        if (open) {
            /* Fetch data */
            axios.get("/tasks/changes/" + card.id).then((response) => {
                setChanges(groupBy(response.data, "day_changed"))
            })
        }
    }, [open])

    useEffect(() => {
        // console.log(changes);
    }, [changes])

    return (
        <div className={'text-sm'}>
            <div>Change log</div>


            {Object.keys(changes).map(group => {
                return (
                    <>
                        <div className={'font-semibold'}>{formatDate(new Date(group))}</div>

                        {Object.values(changes[group]).map(change => {
                            return (
                                <div className={'flex items-center space-x-4'}>
                                    <div><img className={'rounded-full h-8 w-8'} src={change.image_url}/></div>
                                    <div>{change.changed_by_name} changed <span className={'font-semibold'}> {capitalize(change.field)}</span> to <span className={'font-semibold'}> {change.type === "date" ? formatDate(change.new) : capitalize(change.new)}</span></div>
                                </div>
                            )
                        })}
                    </>)
            })}


            {/*{Object.keys(changes).map((change) => (*/}
            {/*    <div>{change.changed_by_name} changed {capitalize(change.field)} to {change.type === "date" ? formatDate(change.new) : capitalize(change.new)}</div>*/}
            {/*))}*/}

            {/*<table className={'w-full text-sm text-left'}>*/}
            {/*    <thead>*/}
            {/*    <tr>*/}
            {/*        <th>User</th>*/}
            {/*        <th>Field</th>*/}
            {/*        <th>Before</th>*/}
            {/*        <th>After</th>*/}
            {/*        <th>Date</th>*/}
            {/*    </tr>*/}
            {/*    </thead>*/}
            {/*    <tbody>*/}
            {/*    {changes.map((change) => (*/}
            {/*        <tr>*/}
            {/*            <td>{change.changed_by_name}</td>*/}
            {/*            <td>{capitalize(change.field)}</td>*/}
            {/*            <td>{change.type === "date" ? formatDate(change.old) : capitalize(change.old)}</td>*/}
            {/*            <td>{change.type === "date" ? formatDate(change.new) : capitalize(change.new)}</td>*/}
            {/*            <td>{formatDate(change.created_at)}</td>*/}
            {/*        </tr>*/}
            {/*    ))}*/}
            {/*    </tbody>*/}
            {/*</table>*/}
        </div>
    )


}