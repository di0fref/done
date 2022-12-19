import {useCallback, useEffect, useState} from "react";
import ProjectSelect from "./ProjectSelect";
import {useDispatch, useSelector} from "react-redux";
import {HiOutlineXMark} from "react-icons/hi2";

import Editor from "./TextEditor";
import Rez from "./Rez";
import CustomDatePicker from "./CustomDatePicker";
import {BiListCheck} from "react-icons/bi";
import {toast} from "react-toastify";
import {updateTask} from "../redux/taskSlice";
import {format} from "date-fns";
import {useDebounce, useIsFirstRender} from "usehooks-ts";
import TextareaAutosize from "react-textarea-autosize";

export default function TaskDetail(props) {

    const _project_ = useSelector(state => state.projects.find(
        project => props.card ? (props.card.project_id === project.id) : null
    ))
    const [name, setName] = useState(props.card.name);
    const [due, setDue] = useState(props.card.due ? new Date(props.card.due) : null);
    const [text, setText] = useState(props.card.text);
    const [project, setProject] = useState(_project_);
    const [taskCompleted, setTaskCompleted] = useState(props.card.completed)
    const [customOpen, setCustomOpen] = useState(props.open);
    const debouncedName = useDebounce(name, 500)
    const debouncedText = useDebounce(text, 500)
    const isFirst = useIsFirstRender()

    const dispatch = useDispatch()

    useEffect(() => {
        setCustomOpen(props.open)
    }, [props])

    const onStatusChange = (e) => {
        setTaskCompleted(e.target.checked)
        dispatch(updateTask({
            id: props.card.id,
            completed: e.target.checked ? 1 : 0
        }))
    }
    const onDateChange = (date) => {
        setDue(date)
        dispatch(updateTask({
            id: props.card.id,
            due: date ? format(new Date(date), "Y-M-dd") : null
        }))
    }
    const onProjectChange = (project) => {
        setProject(project)
        dispatch(updateTask({
            id: props.card.id,
            project_id: project.id
        }))
    }

    // Debounce
    useEffect(() => {
        if (!isFirst) {
            dispatch(updateTask({
                id: props.card.id,
                name: name
            }))
        }
    }, [debouncedName])


    // Debounce
    useEffect(() => {
        if (!isFirst) {
            dispatch(updateTask({
                id: props.card.id,
                text: text
            }))
        }
    }, [debouncedText])


    return (
        <Rez open={customOpen}>
            {props.card.id ? (
                <div>
                    <div className={'h-12 border-b mt-4 bg-white'}>
                        <div className={'flex items-center space-x-2'}>
                            <button onClick={() => setCustomOpen(false)} className={` flex items-center md:hidden block`}>
                                <HiOutlineXMark className={'h-7 w-7 text-gray-500 ml-4 mr-4 mt-[1px]'}/>
                            </button>
                            <div className={'ml-4 flex-grow'}>
                                <input onChange={onStatusChange} className={"checkbox mb-1"} type={"checkbox"} checked={taskCompleted}/>
                            </div>
                            <div>
                                <CustomDatePicker onClick={false} date={due} onDateChange={onDateChange}/>
                            </div>
                            <div className={'pr-4'}>
                                <ProjectSelect initial={{...project}} onProjectChange={onProjectChange}/>
                            </div>
                        </div>
                    </div>
                    <div className={'mt-4 px-2'}>
                        {/*<input onChange={(e) => setName(e.target.value)} className={'font-bold text-xl rounded-md w-full border-none focus:ring-0'} type={"text"} value={name}/>*/}
                        <TextareaAutosize
                            onChange={(e) => setName(e.target.value)}
                            className={'resize-none font-bold text-xl rounded-md w-full border-none focus:ring-0'}
                            defaultValue={name}
                        />
                    </div>
                    <div className={'px-5'}>
                        <Editor
                            onTextChange={(e) => setText(JSON.stringify(e))}
                            initial={text}/>
                    </div>
                </div>) : (
                <div className={'h-screen flex items-center'}>
                    <div className={'w-full'}>
                        <div className={'text-center text-neutral-600'}>
                            <div className={'flex justify-center'}>
                                <div className={'rw-12 h-12'}>
                                    <BiListCheck className={'mx-auto w-12 h-12 text-neutral-300'}/>
                                </div>
                            </div>
                            Click task title to view detail
                        </div>
                    </div>
                </div>
            )}
        </Rez>
    )
}
