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
            ) : <NoTasks/>}

        </>
    )
}
