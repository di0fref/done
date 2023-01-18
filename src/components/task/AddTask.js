import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTask} from "../../redux/taskSlice";
import {format} from "date-fns";
import {toast} from "react-toastify";
import CustomDatePicker from "../badges/CustomDatePicker";
import {getAuth} from "firebase/auth";
import BaseListbox from "../BaseListbox";
import {formatDate, priorities} from "../helper";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";


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


function getPlaceHolder(project, due, t) {
    const date = due ? '" ' + t("on") + ' "' + formatDate(due) + '"' : ""
    return '+ ' + t("Add task in") + ' "' + project + date
}

export default function AddTask({sendJsonMessage}) {

    const params = useParams();
    const [editing, setEditing] = useState(false)
    const inputReference = useRef(null)
    const ref = useRef(null)
    const dispatch = useDispatch()

    const _project_ = useSelector(state => state.current.project)
    const extracted = useSelector(state => state.projects)

    const projects = [{
        id: null,
        name: "Inbox",
        icon: "BsInbox"
    }, ...extracted]

    const [name, setName] = useState("");
    const [project, setProject] = useState(_project_);
    const [due, setDue] = useState(project.id ? new Date() : null);
    const [prio, setPrio] = useState("normal");

    const [placeHolder, setPlaceHolder] = useState()
    const {t} = useTranslation();

    useOnClickOutside(ref, () => handleClickOutside());

    useEffect(() => {
        setProject(_project_)
    }, [_project_])

    useEffect(() => {
        setPlaceHolder(getPlaceHolder(project.id ? project.name : "Inbox", due, t))
    }, [project, due])

    useEffect(() => {
        if (editing) {
            inputReference.current.focus()
        }
    }, [editing])

    const handleClickOutside = (e) => {
        if (name === "") {
            setEditing(false)
            // setDue(new Date())
            setName("")
        }
    }

    const onKeyDownHandler = (e) => {

        if (e.key === 'Enter') {
            if (!name) {
                alert(t("Please give your task a title"))
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
                        prio: prio,
                        user_id: getAuth().currentUser.uid,
                        assigned_user_id: getAuth().currentUser.uid,
                    })).unwrap()

                    if(task.project_id) {
                        sendJsonMessage({
                            type: 'contentchange',
                            content: {
                                action: "new",
                                type: "task",
                                id: task.id,
                            }
                        });
                    }

                    task && toast.success(
                        <div>1 task was created</div>
                    )

                } catch (err) {
                    console.log(err);
                    toast.error(t("axios_error"))
                }
            })()
        }
    }

    const onDateChange = (date) => {
        setDue(date)
    }
    const onProjectChange = (project) => {
        setProject(project)
    }
    if (params.path === "trash") {
        return <div/>
    }

    if (editing) {
        return (
            <div ref={ref} className={'lg:flex-nowrap md:pb-0 pb-3 flex-wrap ring-1 min-h-[40px] rounded-xl bg-white dark:bg-gray-600 flex items-center space-x-2 pr-2'}>
                <div className={'w-full'}>
                    <input
                        onKeyDown={onKeyDownHandler}
                        type={"text"}
                        ref={inputReference}
                        onChange={(e) => setName(e.target.value)}
                        className={'dark:placeholder:text-gray-500 placeholder:text-sm placeholder:text-neutral-300 w-full border-0 focus:ring-0 focus:border-0 focus:ring-0 rounded-xl dark:bg-gray-600'}
                        placeholder={placeHolder}
                        value={name}>
                    </input>
                </div>
                <div className={'text-sm'}>
                    <CustomDatePicker bg={false} onDateChange={onDateChange} date={due}/>
                </div>
                <div className={'text-sm'}>
                    <BaseListbox items={projects} selected={project.id ? project : {
                        id: null,
                        name: t("Inbox"),
                        icon: "BsInbox"
                    }} onChange={onProjectChange}/></div>
                <div className={'text-sm'}>
                    <BaseListbox onChange={(prio) => setPrio(prio.prio)} items={priorities} selected={priorities[1]}/>
                </div>
            </div>
        )
    }

    return (
        <div className={'w-full'} onClick={() => {
            if (params.path !== "trash") {
                setEditing(true)
            }
        }}>
            <input disabled={true} placeholder={placeHolder} className={`${params.path === "trash" ? "hover:cursor-not-allowed" : ""} h-[40px] placeholder:text-sm placeholder:text-neutral-400 dark:placeholder:text-gray-500 rounded-xl bg-[#dfe0e2]  dark:bg-gray-700 w-full border-0 focus:ring-0 focus:border-0`} type={"text"}/>
        </div>
    )
}

