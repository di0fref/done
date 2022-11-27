import {useEffect} from "react"
import {useParams} from "react-router-dom";

const useUrl = callback => {
    let params = useParams()
    useEffect(() => {
        callback({
            path: params.path,
        });
    }, [params])

}

export default useUrl
