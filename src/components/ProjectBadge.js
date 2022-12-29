export default function ProjectBadge({project}) {
    if(!project){
        return null
    }

    return (
        <div className={'flex items-center space-x-1'}>
            <div className={'rounded-full h-2 w-2'} style={{backgroundColor: project.color}}></div>
            <div className={`text-neutral-400 px-1 py-0.5 rounded-md text-xs`}>{project.name}</div>
        </div>
    )
}
