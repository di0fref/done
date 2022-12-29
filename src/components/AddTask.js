import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../redux/taskSlice";
import {format} from "date-fns";
import {toast} from "react-toastify";
import CustomDatePicker from "./CustomDatePicker";
import {getAuth} from "firebase/auth";
import BaseListbox from "./BaseListbox";
import {priorities} from "./helper";


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
        [ref, handler]
    );
}

export default function AddTask() {

    const [editing, setEditing] = useState(false)
    const inputReference = useRef(null)
    const ref = useRef(null)
    const dispatch = useDispatch()

    const _project_ = useSelector(state => state.current.project)
    const extracted = useSelector(state => state.projects)

    const projects = [{
        id: null,
        name: "Inbox",
    }, ...extracted]

    const [name, setName] = useState("");
    const [project, setProject] = useState("");
    const [due, setDue] = useState(new Date());
    const [prio, setPrio] = useState("normal");

    useOnClickOutside(ref, () => handleClickOutside());

    useEffect(() => {
        if (editing) {
            inputReference.current.focus()
        }
    }, [editing])

    const handleClickOutside = (e) => {
        if (name === "") {
            setEditing(false)
            setDue(new Date())
            setName("")
        }
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
                // setDue(null)
                try {
                    const task = await dispatch(addTask({
                        name: name,
                        due: due ? format(new Date(due), "Y-MM-dd") : null,
                        project_id: project.id || null,
                        text: "",
                        prio: "normal",
                        user_id: getAuth().currentUser.uid
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
            <div onClick={() => setEditing(true)} ref={ref} className={'md:flex-nowrap md:pb-0 pb-3 flex-wrap ring-1 my-4 min-h-[40px] rounded-xl bg-white dark:bg-gray-600 flex items-center space-x-2 pr-2'}>
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
                <div className={'text-xs'}>
                    <CustomDatePicker bg={false} onChange={setDue} date={new Date()}/>
                </div>
                <div className={'text-xs'}>
                    {/*<ProjectSelect bg={true} initial={_project_} outsideClicked={editing} onProjectChange={onProjectChange}/>'*/}
                    <BaseListbox items={projects} selected={_project_.id ? _project_ : {
                        id: null,
                        name: "Inbox",
                    }} onChange={onProjectChange}/>
                </div>
                <div className={'text-xs'}>
                    <BaseListbox onChange={(prio) => setPrio(prio.prio)} items={priorities} selected={priorities[1]}/>
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

