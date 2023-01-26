export default function Badge({text, css}){
    return (
        // <div className={`${css} rounded-md text-xs text-white py-1 px-2`}>{text}</div>
        <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2 py-0.5 rounded-md dark:bg-red-900 dark:text-red-300">{text}</span>

    )
}