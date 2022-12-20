import {forwardRef, useEffect, useRef, useState} from "react";
import {BsCalendar} from "react-icons/bs";
import ProjectSelect from "./ProjectSelect";
import DatePicker from "react-datepicker";
import DateBadge from "./DateBadge";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../redux/taskSlice";
import {format} from "date-fns";
import TextareaAutosize from "react-textarea-autosize";
import {toast} from "react-toastify";
import {getDateColor} from "./helper";
import {FaCalendarAlt} from "react-icons/fa";
import CustomDatePicker from "./CustomDatePicker";

function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

export default function AddTask() {

    const [editing, setEditing] = useState(false)
    const inputReference = useRef(null)
    const ref = useRef(null)
    const dispatch = useDispatch()

    const _project_ = useSelector(state => state.current.project)


    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const [due, setDue] = useState(null);

    useOnClickOutside(ref, () => handleClickOutside());

    useEffect(() => {
        if (editing) {
            inputReference.current.focus()
        }
    }, [editing])

    const handleClickOutside = (e) => {
        setEditing(false)
        setDue(null)
        setName("")
    }

    const onKeyDownHandler = (e) => {

        if (e.key === 'Enter') {
            if (!name) {
                alert("Please give your task a title")
                return
            }
            (async () => {
                setName("")
                // setEditing(false)
                setDue(null)
                try {
                    const task = await dispatch(addTask({
                        name: name,
                        due: due ? format(new Date(due), "Y-MM-dd") : null,
                        project_id: _project_.id ?? null,
                        text: "",
                        prio: "high"
                    })).unwrap()

                    task && toast.success(
                        <div>1 task was created</div>
                    )

                } catch (err) {
                    console.log(err);
                    toast.error(`Something went wrong. Please contact support`)
                }
            })()
        }
    }

    const onProjectChange = (p) => {
        setProject(p)
    }

    if (editing) {
        return (
            <div onClick={() => setEditing(true)} ref={ref} className={'ring-1 my-4 min-h-[40px] rounded-xl bg-white dark:bg-gray-600 flex items-center space-x-2 pr-2'}>
                <div className={'w-full'}>
                    <input
                        onKeyDown={onKeyDownHandler}
                        type={"text"}
                        ref={inputReference}
                        onChange={(e) => setName(e.target.value)}
                        className={'w-full border-0 focus:ring-0 focus:border-0 focus:ring-0 rounded-xl dark:bg-gray-600'}
                        placeholder={"Write a new task"}
                        value={name}>
                    </input>
                </div>
                <div>
                    <CustomDatePicker onChange={setDue} date={new Date()}/>
                </div>
                <div>
                    <ProjectSelect initial={_project_} outsideClicked={editing} onProjectChange={onProjectChange}/>
                </div>
            </div>
        )
    }

    return (
        <div className={'w-full my-4 '} onClick={() => setEditing(true)}>
            <input placeholder={"Write a new task"} className={'h-[40px] rounded-xl bg-light-gray dark:bg-gray-700 w-full border-0 focus:ring-0 focus:border-0'} type={"text"}/>
        </div>
    )
}

