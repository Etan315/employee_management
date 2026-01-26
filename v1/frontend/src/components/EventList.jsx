import CalendarIcon from "../../src/icons/ic-calendar.svg?react";
import LocationIcon from "../icons/ic-location.svg?react";

//utilities:
import truncate from "../utils/text";
import { formatTime } from "../utils/time";

const EventList = ({ event }) => {
  if (!event) return null;

  return (
    <>
      <div className="event-info">
        <div className="left events">
          <h3 className="event-title">{event.title}</h3>
          <p className="event-location">
            <LocationIcon className="icon location" />
            {event.city + " " + event.municipality}
          </p>
          <div className="date-time">
            <CalendarIcon className="icon calendar" />
            <div className="sched-time">
              <strong>
                <i>
                  <p className="date">
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </i>
              </strong>
              <p className="time">
                <span className="from">
                  <strong>from:</strong> {formatTime(event.time_start)}{" "}
                </span>
                <br />
                <span className="to">
                  <strong>to:</strong> {formatTime(event.time_end)}
                </span>
              </p>
            </div>
          </div>
        </div>

        <p className="description">{truncate(event.description)}</p>
      </div>
    </>
  );
};

export default EventList;
