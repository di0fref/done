import BaseListbox, {PostIcon} from "./BaseListbox";
import {Listbox} from "@headlessui/react";
import {VscSettingsGear, VscSync} from "react-icons/vsc";
import {HiLogout, HiOutlineDotsHorizontal} from "react-icons/hi";
import Settings from "./Settings";

const projectMenuItems = [
    {
        "name": "Edit project",
        "icon": "",
        "id": "1",
    },
    {
        "name": "Delete project",
        "id": "1",
    },
]

export default function ProjectMenu() {
    return(
        <div className={'absolute_ top-0_ right-6_ _right-16 z-50 '}>
        <div className="flex items-center justify-center p-12_">
            <div className="relative inline-block text-left">
                <Listbox>
                    {({open}) => (
                        <>
                          <div className={'text-neutral-400 hover:text-neutral-700 '}>
                            <Listbox.Button className={'flex items-center bg-red-300_'}>
                                <HiOutlineDotsHorizontal className={'h-5 w-5'}/>
                            </Listbox.Button>
                          </div>
                            <Listbox.Options className="bg-white z-50 absolute right-0 mt-2 min-w-fit w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                                <div className="px-1 py-1 ">
                                    {projectMenuItems.map((item, index) => (
                                        <Listbox.Option as={"div"} className={``} value={item} key={item.id}>
                                            {({active}) => (
                                                <div className={`${active ? 'bg-hov' : ''} text-neutral-500 group flex w-full items-center rounded-md px-2 py-2 text-sm`}>


                                                    {item.icon ?
                                                        <div className={'mr-2'}><PostIcon iconName={item.icon} css={item.css}/>
                                                        </div>
                                                        : ""}

                                                    <div className={'whitespace-nowrap'}>{item.name}</div>

                                                </div>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </div>
                            </Listbox.Options>
                        </>
                    )}
                </Listbox>
            </div>
        </div>
        {/*<Settings open={open} setModalOpen={setOpen}/>*/}
    </div>
)
}
