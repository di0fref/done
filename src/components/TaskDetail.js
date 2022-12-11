import {forwardRef, useEffect, useState} from "react";
import ProjectSelect from "./ProjectSelect";
import DateBadge from "./DateBadge";
import DatePicker from "react-datepicker";
import {useSelector} from "react-redux";
import {Disclosure} from "@headlessui/react";
import {HiBars3} from "react-icons/hi2";

export default function TaskDetail({card}) {

    const _task_ = useSelector(state => state.current.task)

    const [due, setDue] = useState(_task_.due ? new Date(_task_.due) : null);

    const DateCustomInput = forwardRef(({value, onClick}, ref) => (
        <div onClick={onClick} className={'flex items-center space-x-2'}>
            <div className={`whitespace-nowrap text-center text-sm`}><DateBadge date={due}/></div>
        </div>
    ))


    const _project_ = useSelector(state => state.projects.find(
        project => _task_ ? (_task_.project_id === project.id) : null
    ))

    const onProjectChange = () => {

    }

    useEffect(() => {
        if (_task_.due) {
            setDue(new Date(_task_.due))
        } else {
            setDue(null)
        }
    }, [_task_])


    if (!_task_) {
        return (
            <div>kjbuj</div>
        )
    }
    return (
        <div>
            <Disclosure as="nav">
                <Disclosure.Button className="z-50 absolute top-1 right-2 inline-flex items-center peer justify-center rounded-md _p-2 text-gray-500 hover:bg-gray-200 hover:text-white_ focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
                    <HiBars3
                        className="block md:hidden h-8 w-8"
                        aria-hidden="true"
                    />
                </Disclosure.Button>
                <div className={'border-r md:relative border-l bg-white pt-1 w-100 h-screen fixed top-0 -right-[28rem] md:right-0 md:w-96 lg:w-100  peer-focus:right-0 peer:transition ease-out delay-150 duration-200'}>
                    <div className={'h-12 border-b mt-4'}>
                        <div className={'flex items-center space-x-2'}>
                            <div className={'ml-4 flex-grow'}>
                                <input className={"checkbox"} type={"checkbox"}/>
                            </div>
                            <div>
                                <DatePicker
                                    selected={due}
                                    onChange={setDue}
                                    customInput={
                                        <DateCustomInput/>
                                    }
                                    todayButton={"Today"}
                                    dateFormat={"yyyy-MM-dd"}>

                                    <div onClick={() => setDue(null)} className={'font-bold py-2 bg-gray-300 text-center hover:cursor-pointer hover:underline'}>
                                        Clear date
                                    </div>

                                </DatePicker>
                            </div>
                            <div className={'pr-4'}>
                                <ProjectSelect initial={{..._project_}} onProjectChange={onProjectChange}/>
                            </div>
                        </div>
                    </div>
                    <div className={'font-bold text-lg mt-4 px-5'}>
                        {_task_.name}
                    </div>
                    <div className={'whitespace-pre-wrap mt-4 px-5'}>{_task_.text}</div>
                </div>
            </Disclosure>
        </div>
    )
}
