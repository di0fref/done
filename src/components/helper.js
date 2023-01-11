import {format, formatRelative} from "date-fns";
import {FaArchive, FaInbox, FaStar, FaUserCircle} from "react-icons/fa";
import {BsCalendar, BsCheckSquareFill, BsList, BsTrash} from "react-icons/bs";
import {enGB} from "date-fns/locale";
import {getAuth} from "firebase/auth";

export const dbDateFormat = "Y-MM-dd"


export const GoogleHead = (props) => {

    if(getAuth().currentUser && getAuth().currentUser.uid) {
        const image = getAuth().currentUser.photoURL
        return (
            <img {...props} alt="Avatar" src={image}/>
        )
    }

    return null
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

export const groupBy = (consolidatedHeroes, sortBy) => {
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
        groups[groupId].push(currentHero);
        return groups;
    }, []);
};

export const priorities = [
    {
        "prio": "low",
        "name": "Low",
        "icon": "BsFlag",
        "css": "text-neutral-500",
        "id": "1"
    },
    {
        "prio": "normal",
        "name": "Normal",
        "icon": "BsFlag",
        "css": "text-blue-600",
        "id": "2"

    },
    {
        "prio": "high",
        "name": "High",
        "icon": "BsFlag",
        "css": "text-red-500",
        "id": "3"
    }
]

export function getIcon(path) {

    switch (path) {
        case "today":
            return <FaStar className={'text-gray-500'}/>
        case "upcoming":
            return (
                <div className={'relative_'}>
                    <BsCalendar className={'text-gray-500'}/>
                </div>
            )
        case "all":
            return <FaArchive className={'text-gray-500'}/>
        case "inbox":
            return <FaInbox className={'text-gray-500'}/>
        case "lists":
            return <BsList className={'text-gray-500'}/>
        case "trash":
            return <BsTrash className={'text-gray-500'}/>
        case "completed":
            return <BsCheckSquareFill className={'text-gray-500'}/>
        default:
            return <div>Error</div>
    }
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

export function capitalize(value) {

    if (!value) return "None"

    return value.charAt(0).toUpperCase() + value.slice(1)
}

function getFormat(date, token) {

    const format = dateFormat + (date.getFullYear() === new Date().getFullYear() ? '' : ', YYY');

    const formatRelativeLocale = {
        lastWeek: format,
        yesterday: "'Yesterday'",
        today: "'Today'",
        tomorrow: "'Tomorrow'",
        nextWeek: format,
        other: format,
    }
    return formatRelativeLocale[token]
}

Date.prototype.isValid = function () {
    return this instanceof Date && isFinite(this.getTime())
};

export function formatRelativeDate(date) {


    date = new Date(date);

    if (!date.isValid()) {
        return "No date"
    }

    const locale = {
        ...enGB,
        formatRelative: (token) => getFormat(date, token)//formatRelativeLocale[token],
    };
    return formatRelative(date, new Date(), {locale});
}

export function formatDate(date) {
    return formatRelativeDate(date);
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
