export const sortF = (a, b, sortBy) => {

    if(!a && !b){
        return false
    }

    const prio = {
        "low": 0,
        "normal": 1,
        "high": 2
    }
    if (sortBy === "order") {
        return a[sortBy] < b[sortBy] ? 1 : -1
    }
    if (sortBy === "prio") {
        return prio[a["prio"]] < prio[b["prio"]] ? 1 : -1
    }

    if (sortBy === "due") {
        return (new Date(a.due) > new Date(b.due)) ? 1 : -1
    }
    return a[sortBy].localeCompare(b[sortBy])
}


export function sortGroup(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}
