import {useEffect, useState} from 'react';
import {arrayMove, SortableContainer, SortableElement, SortableHandle} from 'react-sortable-hoc';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {BiMenu} from "react-icons/bi";
import {updateTask} from "../../redux/taskSlice";
import {move, updateProject} from "../../redux/projectSlice";
import {sortF} from "../task/Sort";
import {VscGripper} from "react-icons/vsc";


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
        <div className={`${(currentProject.id === project.id)?"sidebar-active":""} group py-1.5 dark:text-white hover:bg-hov dark:hover:bg-gray-900/30 rounded`}>
            <div className={'flex items-center'}>
                <DragHandle/>
                <Link to={"/project/" + project.id} className={'flex items-center flex-grow'}>
                    <div className={'flex-grow hover:text-gray-600 dark:hover:text-neutral-100 dark:text-neutral-300 text-gray-500 text-sm'}>{project.name}</div>
                    <div className={'w-2 h-2 rounded-full mr-3'} style={{backgroundColor: project.color}}/>
                </Link>
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

    return <SortableList lockAxis={"y"} helperClass="draggable-item" useDragHandle projects={projects} onSortEnd={onSortEnd}/>;
}
