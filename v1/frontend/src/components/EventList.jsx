import React, { useEffect, useState } from "react";
import getEvent from "../api/getEvent";
import IcView from "../../src/icons/ic-view.svg";

//utilities:
import truncate from "../utils/text";

const EventList = ({ event }) => {

  if (!event) return null;

  return (
    <>
      <div className="event-info">
        <p className="event-title">{event.title}</p>

        <div className="date-time">
          <span className="date">
            {new Date(event.event_date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="separator"> - </span>
          <span className="time">{event.event_time || "TBA"}</span>
        </div>

        <p className="description">{truncate(event.description)}</p>
      </div>
      <button className="btn view-event">
        <img src={IcView} alt="view button" />
      </button>
    </>
  );
};

export default EventList;
