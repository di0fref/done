export default function ProjectBadge({project}) {
    if(!project){
        return null
    }

    return (
        <span className={'flex items-center space-x-1'}>
            <span className={'rounded-full h-2 w-2'} style={{backgroundColor: project.color}}></span>
            <span className={`text-neutral-400 px-1 py-0.5 rounded-md text-xs`}>{project.name}</span>
        </span>
    )
}
