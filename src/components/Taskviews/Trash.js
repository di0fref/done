import {useSelector} from "react-redux";
import {sortF} from "./Sort";
import {useReadLocalStorage} from "usehooks-ts";
import NoTasks from "../NoTasks";
import TopHeader from "./TopHeader";

export default function Trash({renderCard}) {
    const sortBy = useReadLocalStorage("sort")

    const _data_ = {
        trash: {
            tasks: [...useSelector(
                state => state.tasks.filter(
                    task => task.deleted
                )
            )].sort((a, b) => {
                return sortF(a, b, sortBy)
            })
        }
    }

    return (
        <>
            <TopHeader/>
            {Object.keys(_data_.trash.tasks).length ? (
                Object.values(_data_.trash.tasks).map((task, i) => {
                    return renderCard(task, i)
                })
            ) : <div className={'w-full my-12 flex items-center justify-center'}>
                <div className={'text-neutral-500 dark:text-gray-500 text-center'}>
                    <div className={'text-base mb-1'}>Trash is empty.</div>
                </div>
            </div>}

        </>
    )
}
