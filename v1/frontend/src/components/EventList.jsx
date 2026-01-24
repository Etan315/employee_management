import IcView from "../../src/icons/ic-view.svg?react";
import CalendarIcon from "../../src/icons/ic-calendar.svg?react";

//utilities:
import truncate from "../utils/text";

const EventList = ({ event }) => {
  if (!event) return null;

  return (
    <>
      <div className="event-info">
        <div className="left events">
          <p className="event-title">{event.title}</p>
          <p className="event-location">
            {event.city + " " + event.municipality}
          </p>
          <div className="date-time">
            <CalendarIcon className="icon calendar" />
            <span className="date">
              {new Date(event.event_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="separator"> - </span>
            <span className="time">
              {event.time_start} - {event.time_end}
            </span>
          </div>
        </div>

        <p className="description">{truncate(event.description)}</p>

        <button className="btn view-event">
          <IcView className="icon view" />
        </button>
      </div>
    </>
  );
};

export default EventList;
