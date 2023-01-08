import React, {useEffect, useState} from "react";
import {gapi} from "gapi-script";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import {dbDateFormat} from "./helper"; // a plugin!
import {format} from "date-fns";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import googleCalendarPlugin from "./plugins/GoogleCal"
import svLocale from '@fullcalendar/core/locales/sv';
import listPlugin from '@fullcalendar/list';
import CalPopover from "./CalPopover";


export default function Cal() {
    const [events, setEvents] = useState([]);

    const apiKey = "AIzaSyAMJoWlxz1w2_u5Ar56-vvaCyhuSZpMz_k"

    const accessToken = "ya29.a0AX9GBdUETGzZBF5N56Jm2BFU1kKXEtbzsv61RhZhy8BXAl65JxYw-BPl31vJgxFFyOQdA_Jl8lxbTnasjEIfma7EHakNJKe38Fm5nS_EfdeHoEVl4RcfK6gers0jYu6B_fBlb51BIsUKr_96XUZx5oQ_R6_V9YwaCgYKAYkSAQASFQHUCsbCApW_dE-EMHlzHMQLgqxr3A0166"

    const calendarID = "fredrik.fahlstad@gmail.com"

    const eventClick = (info) => {
        info.jsEvent.preventDefault();
        console.log(info)


    }

    return (
        <div className={''}>
            <FullCalendar
                plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin, googleCalendarPlugin]}
                initialView="listWeek"
                headerToolbar={{
                    left: 'prev,next,today',
                    center: 'title',
                    right: ''
                }}
                weekNumbers={true}
                googleCalendarApiKey={apiKey}
                eventClick={eventClick}
                eventContent={renderEventContent}
                // events={events}
                // locale={svLocale}
                events={{
                    googleCalendarId: calendarID,
                    className: 'gcal-event' // an option!
                }}
                slotLabelFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    // second: '2-digit',
                    meridiem: false,
                    hour12: false
                }}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    // second: '2-digit',
                    meridiem: false,
                    hour12: false
                }}
                themeSystem={"standard"}
            />
        </div>
    )
}

function renderEventContent(eventInfo) {
    return (
        // <div className={'overflow-hidden'}>
        //     <div className={'font-bold'}>{eventInfo.timeText}</div>
        //     <div className={'whitespace-normal'}>{eventInfo.event.title}</div>
        // </div>
        <div className={'relative'}>
            <CalPopover eventInfo={eventInfo}/>
        </div>
    )
}
