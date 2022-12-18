import {Resizable} from "re-resizable";
import {useEffect, useState} from "react";


export default function Rez(props) {

    const [width, setWidth] = useState(
        () => {
            const w = window.localStorage.getItem("detail-width");
            return w !== null
                ? JSON.parse(w)
                : 300;
        }
    );
    const [height, setHeight] = useState("100vh");
    const [customOpen, setCustomOpen] = useState(props.open);

    const onResizeStop = (e, direction, ref, d) => {
        setWidth(width + d.width);
        setHeight(height + d.height);
        localStorage.setItem("detail-width", JSON.stringify(width + d.width))
    }

    useEffect(() => {
        setCustomOpen(props.open)
    }, [props])

    return (
        <Resizable
            className={`
            shadow-xl
            md:shadow-none
            border-l
                bg-white
                md:relative 
                h-screen 
                fixed 
                ${customOpen ? "right-0" : "-right-[48rem]"} 
                md:right-0
                 peer-focus:right-0 
                peer:transition
                ease-out 
                delay-100 
                duration-200`
            }
            style={{
                position:""
            }}
            size={{width, height}}
            maxWidth={450}
            minWidth={300}
            enable={{
                top: false,
                right: false,
                bottom: false,
                left: true,
                topRight: false,
                bottomRight: false,
                bottomLeft: false,
                topLeft: false
            }}
            onResizeStop={onResizeStop}
        >
            {props.children}
        </Resizable>
    )
}
