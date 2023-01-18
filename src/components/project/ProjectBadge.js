export default function ProjectBadge({project}) {
    if (!project) {
        return null
    }

    return (
        <div className={'flex items-center space-x-1'}>
            <div className={'rounded-full h-2 w-2'} style={{backgroundColor: project.color}}/>
            <div className={`text-neutral-400 rounded-md text-xs`}>{project.name}</div>
        </div>
    )
}
