import {useEffect, useRef, useState} from "react";

export default function Textinput(props) {

    const [val, setVal] = useState("");
    // const textAreaRef = useRef(null);
    // const resizeTextArea = () => {
    //     textAreaRef.current.style.height = "50px";
    //     textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    // };
    // useEffect(resizeTextArea, [val]);

    const handleKeyDown = e => {
        let value = e.target.value.split("//");

        if (e.key === 'Enter') {

            const data = {
                status: "new",
                name: value[0],
                description: value[1],
            }

            props.addTask(data)
            setVal("")
            // console.log('Enter key pressed ✅');
        }
    };
    const onChange = e => {
        setVal(e.target.value);
    };
    return (
        <div className="relative md:w-100 w-full mt-7">
            <input type="text" id="new_task" className="block px-2.5  w-full text-sm text-gray-900 bg-gray-100 rounded-lg border-1 border-gray-200 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
            <label htmlFor="new_task" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-8 scale-100 top-2 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-gray-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-100 peer-focus:-translate-y-8 left-1">
                Write a new task
            </label>
        </div>

    )
}
