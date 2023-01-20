import {SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {move} from "../../redux/projectSlice";
import {VscGripper} from "react-icons/vsc";
import ProjectMenu from "./ProjectMenu";


const SortableItem = SortableElement(({project, id}) => {

    const currentProject = useSelector(state => state.current.project)

    const DragHandle = SortableHandle(() => {
        return (
            <div className={"hover:cursor-move group-hover:visible invisible h-4 w-4 text-neutral-500"}>
                <VscGripper className={``}/>
            </div>
        )
    });

    return (
        <div className={`${(currentProject.id === project.id)?"sidebar-active":""} group py-0.5 dark:text-white hover:bg-hov dark:hover:bg-gray-900/30 rounded`}>
            <div className={'flex items-center'}>
                {/*<DragHandle/>*/}
                <Link to={"/project/" + project.id} className={'flex items-center flex-grow'}>
                    <div className={'w-2 h-2 rounded-full mx-3'} style={{backgroundColor: project.color}}/>
                    <div className={'hover:text-gray-600 dark:hover:text-neutral-100 dark:text-neutral-300 text-gray-500 text-sm'}>{project.name}</div>
                </Link>
                <ProjectMenu p={project}/>
            </div>
        </div>
    )
})

const SortableList = SortableContainer(({projects}) => {
    return (
        <div>
            {projects.map((project, index) => (
                <SortableItem id={project.id} key={project.id} index={index} project={project}/>
            ))}
        </div>
    );
});

export function SortableComponent() {

    const projects = useSelector(
        state => state.projects.filter((project) => !project.deleted)
    )


    const dispatch = useDispatch();

    const onSortEnd = ({oldIndex, newIndex, collection, isKeySorting}) => {

        dispatch(move({
            oldIndex: oldIndex,
            newIndex: newIndex,
            id: collection
        }))

    }

    const shouldCancelStart = (e) => {
        if (e.target.tagName.toLowerCase() === 'a') {
            return true; // Return true to cancel sorting
        }
    }

    return <SortableList lockAxis={"y"} helperClass="draggable-item"
                         distance={1}
                         // useDragHandle
                         shouldCancelStart={shouldCancelStart}
                         projects={projects} onSortEnd={onSortEnd}/>;
}
