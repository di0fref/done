import {useTranslation} from "react-i18next";
import {Menu} from "@headlessui/react";
import {BsFilterLeft} from "react-icons/bs";
import BaseListbox from "./BaseListbox";
import {TbArrowsSort} from "react-icons/tb";

import {VscGroupByRefType} from "react-icons/vsc";
import {useState} from "react";
import {useLocalStorage} from "usehooks-ts";

export default function SortMenu() {
    const {t} = useTranslation();
    const sortOptions = [
        {
            "name": t("Name"),
            "value": "name",
            "id": "sort_name",
            "icon": "BsCalendar",
            "allow": true,
            // "action": onChange
        },
        {
            "name": t("Due date"),
            "value": "due",
            "id": "sort_due",
            "icon": "BsCalendar",
            "allow": true,
            // "action": onChange
        },
        {
            "name": t("Project"),
            "value": "project",
            "id": "sort_project",
            "icon": "BsGrid",
            "allow": true,
            // "action": onChange
        },
        {
            "name": t("Assigned user"),
            "value": "assigned_user_name",
            "id": "sort_assigned",
            "icon": "BsPerson",
            "allow": true,
            // "action": onChange
        },
        {
            "name": t("prio"),
            "value": "prio",
            "id": "sort_prio",
            "icon": "BsFlag",
            "allow": true,
            // "action": onChange

        },
    ]

    const groupOptions = [
        // {
        //     "name": t("None"),
        //     "value": "",
        //     "id": "group_none",
        //     "icon": "BsCalendar",
        //     "allow": true,
        //     // "action": onChange
        // },
        {
            "name": t("Due date"),
            "value": "due",
            "id": "group_due",
            "icon": "BsCalendar",
            "allow": true,
            // "action": onChange
        },
        {
            "name": t("Project"),
            "value": "project",
            "id": "group_project",
            "icon": "BsGrid",
            "allow": true,
            // "action": onChange
        },
        {
            "name": t("Assigned user"),
            "value": "assigned_user_name",
            "id": "group_assigned",
            "icon": "BsPerson",
            "allow": true,
            // "action": onChange
        },
        {
            "name": t("prio"),
            "value": "prio",
            "id": "group_prio",
            "icon": "BsFlag",
            "allow": true,
            // "action": onChange

        },
    ]
    const onChangeSort = (option) => {
        setSort(option.value)
        setSelectedSortOption(option)
    }
    const onChangeGroup = (option) => {
        setGroup(option.value)
        setSelectedGroupOption(option)
    }


    const [sort, setSort] = useLocalStorage("sort", "due")
    const [group, setGroup] = useLocalStorage("group", "due")

    const [selectedSortOption, setSelectedSortOption] = useState(sortOptions.find(o => o.value === sort))
    const [selectedGroupOption, setSelectedGroupOption] = useState(groupOptions.find(o => o.value === group))

    return (
        <Menu as={"div"} className={"relative"}>


            <Menu.Button className={'hover:bg-neutral-100 p-1 rounded flex items-center'}>
                <BsFilterLeft className={'h-4 w-4'}/>
            </Menu.Button>

            <Menu.Items static={false} className={"py-2 min-w-[20rem] z-50 absolute rounded-md bg-white shadow-lg right-0"}>
                <div className={'font-semibold ml-4 my-2'}>Sort</div>
                <Menu.Item as={"div"} className={`select-none py-1 px-4 flex items-center space-x-2`}>
                    {({close}) => (
                        <>
                            <VscGroupByRefType className={'h-5 w-5 text-neutral-500'}/>
                            <div className={'flex-grow text-neutral-500'}>Grouping</div>
                            <div><BaseListbox onChange={onChangeGroup} items={groupOptions} selected={selectedGroupOption}/>
                            </div>
                        </>
                    )}
                </Menu.Item>

                <Menu.Item as={"div"} className={`select-none py-1 px-4 flex items-center space-x-2`}>
                    <TbArrowsSort className={'h-5 w-5 text-neutral-500'}/>
                    <div className={'flex-grow text-neutral-500'}>Sorting</div>
                    <div><BaseListbox onChange={onChangeSort} items={sortOptions} selected={selectedSortOption}/></div>
                </Menu.Item>

            </Menu.Items>

        </Menu>
    )
}
