

const colors = {
    // "low": "",
    // "normal": "text-blue-300",
    "high": "text-red-500"
}

export default function PrioBadge({value, ...props}) {
    return (
        <div className={`${colors[value]||"text-neutral-400 "} px-1 py-1.5 rounded-md text-xs`}>{value.charAt(0).toUpperCase() + value.slice(1)}</div>
    )
}
