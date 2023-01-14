import {useTranslation} from "react-i18next";

export default function NoTasks() {
    const {t} = useTranslation();

    return (
        <div className={'w-full my-12 flex items-center justify-center'}>
            <div className={'text-neutral-500 dark:text-gray-500 text-center'}>
                <div className={'text-base mb-1'}>{t("No idea where to put your tasks?")}</div>
                <div className={'text-sm'}>{t("Click the input box to start writing them down.")}</div>
            </div>
        </div>
    )
}
