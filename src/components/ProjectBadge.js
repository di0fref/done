export default function ProjectBadge({name, color}) {
    return (
        <div className={'flex items-center space-x-1'}>
            <div className={'rounded-full h-2 w-2'} style={{backgroundColor: color}}></div>
            <div className={`text-neutral-400 px-1 py-0.5 rounded-md text-xs`}>{name}</div>
        </div>
    )
}
