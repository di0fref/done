import {format, formatRelative} from "date-fns";
import {BsArchive, BsCalendar, BsCheckSquareFill, BsGrid, BsInbox, BsStar, BsTrash} from "react-icons/bs";
import {enGB} from "date-fns/locale";
import {getAuth} from "firebase/auth";
import {createSelector} from "@reduxjs/toolkit";
import {sortF} from "./task/Sort";
import {useSelector} from "react-redux";

export const dbDateFormat = "Y-MM-dd"

export const selectPinned = createSelector(
    (state) => state.tasks,
    (state, sortBy) => sortBy,

    (tasks, sortBy) => {
        return tasks.filter(task => task.pinned && !task.deleted && !task.completed).sort((a, b) => {
            return sortF(a, b, sortBy)
        })
    }
)

export const GoogleHead = (props) => {

    const user = useSelector(state => state.current.user)
    return (
        <img {...props} alt="Avatar" src={user.image_url} referrerPolicy={"no-referrer"}/>
    )

}

export async function isLoggedIn() {
    try {
        await new Promise((resolve, reject) =>
            getAuth().onAuthStateChanged(
                user => {
                    if (user) {
                        resolve(user)
                    } else {
                        // console.log("User logged out firebase");
                        localStorage.removeItem("AccessToken")
                        localStorage.removeItem("user")

                        reject('no user logged in')
                        // navigate("login")
                    }
                },
                error => reject(error)
            )
        )
        return true
    } catch (error) {
        console.log(error);
        return false
    }
}

export const groupByCount = (consolidatedHeroes, sortBy) => {
    return Object.keys(consolidatedHeroes).reduce((groups, key) => {
        const currentHero = consolidatedHeroes[key];
        let groupId = "";
        if (sortBy === "due" || sortBy === "completed_at") {
            groupId = format(new Date(currentHero[sortBy]), "Y-MM-dd")
        } else {
            groupId = currentHero[sortBy];
        }
        if (!groups[groupId]) {
            groups[groupId] = [];
        }
        ++groups[groupId];
        return groups;
    }, []);
};

export const groupBy = (consolidatedHeroes, groupBy) => {
    return Object.keys(consolidatedHeroes).reduce((groups, key) => {
        const currentHero = consolidatedHeroes[key];
        let groupId = "";
        if (groupBy === "due" || groupBy === "completed_at") {
            groupId = currentHero[groupBy] ? format(new Date(currentHero[groupBy]), "Y-MM-dd") : "No due date"
        } else {
            groupId = currentHero[groupBy];
        }
        if (!groups[groupId]) {
            groups[groupId] = [];
        }
        groups[groupId].push(currentHero);
        return groups;
    }, []);
};

export const priorities = [
    {
        "prio": "low",
        "name": "low",
        "icon": "BsFlag",
        "css": "text-neutral-500",
        "id": "1"
    },
    {
        "prio": "normal",
        "name": "normal",
        "icon": "BsFlag",
        "css": "text-blue-600",
        "id": "2"

    },
    {
        "prio": "high",
        "name": "high",
        "icon": "BsFlag",
        "css": "text-red-500",
        "id": "3"
    }
]

export function getIcon(path, classes) {

    switch (path) {
        case "today":
            return <BsStar className={'text-gray-500'}/>
        case "upcoming":
            return (
                <div className={'relative_'}>
                    <BsCalendar className={'text-gray-500'}/>
                </div>
            )
        case "all":
            return <BsArchive className={'text-gray-500'}/>
        case "inbox":
            return <BsInbox className={'text-gray-500'}/>
        case "projects":
            return <BsGrid className={`${classes} text-gray-500`}/>
        case "trash":
            return <BsTrash className={'text-gray-500'}/>
        case "completed":
            return <BsCheckSquareFill className={'text-gray-500'}/>
        default:
            return <div>Error</div>
    }
}

export function isChangeEvent(message) {
    let evt = JSON.parse(message.data);
    return evt.type === 'contentchange';
}

export const dateFormat = "d MMM"

export const paths = [
    "today",
    "upcoming",
    "inbox",
    "all",
    "trash",
    "completed"
];
export const WS_URL = 'ws://127.0.0.1:8000';

export function capitalize(value) {

    if (!value) return "None"

    return value.charAt(0).toUpperCase() + value.slice(1)
}

function getFormat(date, token, include_day) {

    let format = "";
    let formatRelativeLocale = {}
    if (!include_day) {
        format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY');

        formatRelativeLocale = {
            lastWeek: format,
            yesterday: "'Yesterday'",
            today: "'Today'",
            tomorrow: "'Tomorrow'",
            nextWeek: format,
            other: format,
        }

    } else {
        format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY') + " ‧ EEEE";

        formatRelativeLocale = {
            lastWeek: format,
            yesterday: "'Yesterday' ‧ EEEE",
            today: "'Today' ‧ EEEE",
            tomorrow: "'Tomorrow' ‧ EEEE",
            nextWeek: format,
            other: format,
        }

    }
    return formatRelativeLocale[token]
}

Date.prototype.isValid = function () {
    return this instanceof Date && isFinite(this.getTime())
};

export function formatRelativeDate(date, include_day) {


    date = new Date(date);

    if (!date.isValid()) {
        return "No date"
    }

    const locale = {
        ...enGB,
        formatRelative: (token) => getFormat(date, token, include_day)//formatRelativeLocale[token],
    };
    return formatRelative(date, new Date(), {locale});
}

export function formatDate(date, include_day) {

    return formatRelativeDate(date, include_day);
}


export const delay = (time) => {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function getDateColor(date) {
    if (!date) {
        return "text-gray-500"
    }
    return new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)
        ? "whitespace-nowrap text-warning  "
        : new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
            ? "whitespace-nowrap text-green-600 "
            : "whitespace-nowrap text-primary "
}

export function waitForLocalStorage(key, cb, timer) {
    if (!localStorage.getItem(key)) {

        return timer = setTimeout(waitForLocalStorage.bind(null, key, cb), 100)
    }
    clearTimeout(timer)
    if (typeof cb !== 'function') {
        return localStorage.getItem(key)
    }
    return cb(localStorage.getItem(key))
}
