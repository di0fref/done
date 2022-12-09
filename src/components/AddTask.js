import {forwardRef, useEffect, useRef, useState} from "react";
import {BsCalendar} from "react-icons/bs";
import ProjectSelect from "./ProjectSelect";
import DatePicker from "react-datepicker";
import DateBadge from "./DateBadge";
import {useDispatch} from "react-redux";
import {addTask} from "../redux/taskSlice";
import {format} from "date-fns";
import TextareaAutosize from "react-textarea-autosize";
import {toast} from "react-toastify";

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
    const ref = useRef();
    const dispatch = useDispatch()


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
    }

    const onKeyDownHandler = (e) => {

        if (e.key === 'Enter') {
            (async () => {
                try {
                    const task = await dispatch(addTask({
                        name: name,
                        due: due ? format(due, "Y-MM-dd") : null,
                        project_id: project.id ?? null,
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

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={'flex items-center space-x-2'}>
            <div className={`whitespace-nowrap text-center text-sm `}><DateBadge date={value}/></div>
            <div className={'h-8 w-10 rounded-lg bg-gray-200/70 relative hover:cursor-pointer'}>
                <BsCalendar className={'h-4 w-4 text-gray-500 absolute top-2 left-3'}/>
            </div>
        </div>
    ))


    if (editing) {
        return (
            <div  onClick={() => setEditing(true)} ref={ref} className={'my-4 min-h-[50px] rounded-xl bg-white flex items-center space-x-2 pr-2'}>
                <div className={'flex-grow'}>
                    <input
                        onKeyDown={onKeyDownHandler}
                        type={"text"}
                        ref={inputReference}
                        onChange={(e) => setName(e.target.value)}
                        className={'w-full border-0 focus:ring-0 focus:border-0 focus:ring-0'}
                        placeholder={"Write a new task"}>
                    </input>
                </div>
                <div className={'-mt-0.5'}>
                    <DatePicker
                        selected={due}
                        onChange={setDue}
                        customInput={
                            <DateCustomInput/>
                        }
                        todayButton={"Today"}
                        dateFormat={"yyyy-MM-dd"}>

                        <div onClick={() => setDue(null)} className={'font-bold py-2 bg-gray-300 text-center hover:cursor-pointer hover:underline'}>
                            Clear date
                        </div>

                    </DatePicker>

                </div>
                <div className={''}>
                    <ProjectSelect outsideClicked={editing} onProjectChange={onProjectChange}/>
                </div>
            </div>
        )
    }

    return (
        <div className={'w-full my-4 '} onClick={() => setEditing(true)}>
            <input placeholder={"Write a new task"} className={'h-[50px] rounded-xl bg-gray-300 w-full border-0 focus:ring-0 focus:border-0'} type={"text"}/>
        </div>
    )
}

