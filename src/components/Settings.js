import {useEffect, useState} from "react";
import {HiXMark} from "react-icons/hi2";

export default function Settings(props) {

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setShowModal(props.open)
    }, [props.open])

    const closeModal = () => {
        setShowModal(false)
        props.setModalOpen(false)
    }

    const saveHandler = () => {

    }

    return (
        <>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex  fixed top-[15vh] left-0 right-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6_ mx-auto w-[32rem]">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between py-3 px-4 border-b border-solid border-slate-200 rounded-t">

                                    <div className={'font-semibold'}>Settings</div>
                                    <button
                                        className="hover:bg-gray-200 rounded"
                                        onClick={closeModal}>
                                        <HiXMark className={'h-5 w-5 text-neutral-500'}/>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative px-6 flex ">
                                    <div className="w-2/3 py-4 flex space-y-2 flex-col">
                                        <div className={'flex items-center space-x-4'}>
                                            <p><input className={'checkbox mb-0.5'} type={"checkbox"}/></p>
                                            <p className={''}>Dark Theme</p>
                                        </div>
                                        <div className={'flex items-center space-x-4'}>
                                            <p><input className={'checkbox mb-0.5'} type={"checkbox"}/></p>
                                            <p>Show completed tasks</p>
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="space-x-3 flex items-center justify-end px-6 py-4 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="cancel-btn"
                                        type="button"
                                        onClick={closeModal}>
                                        Cancel
                                    </button>
                                    <button
                                        className="save-btn"
                                        type="button"
                                        onClick={saveHandler}>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
                </>
            ) : null}
        </>
    );
}