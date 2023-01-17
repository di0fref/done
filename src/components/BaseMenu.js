import {Menu} from "@headlessui/react";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {PostIcon} from "./BaseListbox";
import {useTranslation} from "react-i18next";

export default function BaseMenu({def, items, selected, icon, title, showTitle, ...props}) {
    const {t} = useTranslation();

    return (
        <div>
            <div className={'z-50'}>
                <div className="flex items-center justify-center ">
                    <div className="relative inline-block text-left">

                        <Menu as={"div"}>
                            <Menu.Button className={'hover:bg-neutral-100 p-1 rounded flex items-center'}>
                                {/*<HiOutlineDotsHorizontal className={'h-5 w-5'}/>*/}

                                <div className={'relative'}>
                                    <div>{icon}</div>
                                    {(selected&&def !== selected.value)?<span className="-top-1 -left-2 absolute  w-3 h-3 bg-blue-400 border-2 border-white dark:border-gray-800 rounded-full"/> :""}
                                </div>

                                {showTitle &&
                                    <div className={'ml-2'}>{selected.name}</div>
                                }
                            </Menu.Button>
                            <Menu.Items static={false} className={'z-50 absolute mt-1 min-w-[14rem] right-0 max-h-72 w-full overflow-visible rounded-md bg-white dark:bg-gray-700 py-1  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm'}>

                                {title && <div className={'px-4 py-2 text-neutral-600 font-semibold'}>{t(title)}</div>}

                                {items.map((item, index) => (
                                    <Menu.Item disabled={!item.allow} onClick={(e) => item.action(e, item)} as={"div"} value={item} key={item.id}
                                               className={({active}) => `relative cursor-pointer select-none py-2 pl-4 pr-10 
                                                ${active ? 'bg-hov dark:bg-gray-600' : ''} 
                                                ${(selected&&item.id === selected.id) ? "bg-hov" : ""} text-neutral-600 dark:text-neutral-300`}>

                                        <button className={`${!item.allow ? "opacity-50" : ""} block truncate font-normal`}>
                                            <div className={'flex items-center space-x-3'}>
                                                <div><PostIcon iconName={item.icon}/></div>
                                                <div>
                                                    <span>{item.name}</span>
                                                </div>
                                            </div>
                                        </button>

                                    </Menu.Item>
                                ))}
                            </Menu.Items>
                        </Menu>

                    </div>
                </div>
            </div>
        </div>
    )
}
