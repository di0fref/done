import {forwardRef, useEffect, useRef, useState} from "react";
import ProjectSelect from "./ProjectSelect";
import DateBadge from "./DateBadge";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {Disclosure} from "@headlessui/react";
import {HiBars3, HiOutlineXMark} from "react-icons/hi2";
import TextareaAutosize from "react-textarea-autosize";
import {updateTask} from "../redux/taskSlice";
import Editor from "./TextEditor";
import {$getRoot, $getSelection} from "lexical";
import {format} from "date-fns";
import {BsArrowBarRight, BsCalendar} from "react-icons/bs";
import {getDateColor} from "./helper";
import {FaCalendarAlt} from "react-icons/fa";

export default function TaskDetail(props) {

    const [name, setName] = useState(props.card.name);
    const [due, setDue] = useState(props.card.due ? new Date(props.card.due) : null);
    const [text, setText] = useState(props.card.text);
    const [customOpen, setCustomOpen] = useState(props.open);

    const dispatch = useDispatch()
    const inputRef = useRef(null)

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={` ${getDateColor(due)} flex items-center space-x-2 hover:cursor-pointer hover:underline mr-2`}>
            <FaCalendarAlt/>
            <div className={`whitespace-nowrap text-center text-sm`}>{format(due, "EEE, d MMM")}</div>
        </div>
    ))

    const _project_ = useSelector(state => state.projects.find(
        project => props.card ? (props.card.project_id === project.id) : null
    ))

    const onProjectChange = (project) => {
        if (project.id !== props.card.project_id) {
            dispatch(updateTask({
                id: props.card.id,
                project_id: project.id
            }))
        }
    }

    const saveNameHandler = (e) => {

        dispatch(updateTask({
            id: props.card.id,
            name: name
        }))
    }

    const onDateChange = (date) => {

        setDue(date)
        dispatch(updateTask({
            id: props.card.id,
            due: format(new Date(date), "Y-M-dd")
        }))
    }

    function onTextChange(editorState) {

        dispatch(updateTask({
            id: props.card.id,
            text: JSON.stringify(editorState)
        }))

    }


    useEffect(() => {
        setCustomOpen(props.open)

    }, [props])


    function buttonClicked() {
        setCustomOpen(prev => !prev);
        props.setOpen(prev => !prev)
    }


    if (!props.card.id) {
        return (
            <div>kjbuj</div>
        )
    }
    return (
        <div>

            <div className={`
                drop-shadow-2xl
                md:drop-shadow-none
                border-r 
                md:relative 
                border-l 
                bg-white 
                pt-1 
                w-4/5 
                h-screen 
                fixed 
                top-12_
                md:top-0 
                ${customOpen ? "right-0" : "-right-[48rem]"} 
                md:right-0 
                md:w-72 
                lg:w-128
                peer-focus:right-0 
                peer:transition
                ease-out 
                delay-100 
                duration-200`}>

                <div className={'h-12 border-b mt-4'}>
                    <div className={'flex items-center space-x-2'}>
                        <button onClick={() => setCustomOpen(false)} className={` flex items-center md:hidden block`}>
                            <HiOutlineXMark className={'h-7 w-7 text-gray-500 ml-4 mr-4 mt-[1px]'}/>
                        </button>
                        <div className={'ml-4 flex-grow'}>
                            <input className={"checkbox mb-1"} type={"checkbox"}/>
                        </div>
                        <div>
                            <DatePicker
                                selected={due}
                                onChange={onDateChange}
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
                        <div className={'pr-4'}>
                            <ProjectSelect initial={{..._project_}} onProjectChange={onProjectChange}/>
                        </div>
                    </div>
                </div>
                <div className={'mt-4 px-2'}>
                    <input onBlur={saveNameHandler} onChange={(e) => setName(e.currentTarget.value)} className={'font-bold text-xl rounded-md w-full border-none focus:ring-0'} type={"text"} value={name}/>
                </div>
                <div className={'px-5'}>

                    <Editor onTextChange={onTextChange} initial={props.card.text}/>
                    {/*<TextareaAutosize defaultValue={text} onChange={(e) => setText(e.currentTarget.value)} className={'rounded-md w-full h-[80vh] resize-none focus:ring-0 border-none'}/>*/}
                </div>
            </div>
        </div>
    )
}
