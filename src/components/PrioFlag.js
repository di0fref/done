import {useEffect, useState} from "react";
import {BsFlagFill} from "react-icons/bs";

export default function PrioFlag(props) {

    const [color, setColor] = useState(null)

    useEffect(() => {
        switch (props.prio) {
            case "high":
                setColor("text-red-600")
                break;
            case "normal":
                setColor("text-blue-600")
                break;
            case "low":
                setColor("text-neutral-600")
                break;
        }
    }, [props.prio])

    return (
        <BsFlagFill className={`${color} opacity-80`}/>
    )
}
