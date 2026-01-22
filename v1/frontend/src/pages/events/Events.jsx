import React, { useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import QuickActions from "../../components/navigation/QuickActions";
import AddEventModal from "../../components/modal/event/AddEventModal";
import { useAuth } from "../../context/AuthContext";

function Events() {
  // 1. Manage the toggle state for the menu
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  const [isOpenEvent, setOpenEvent] = useState(false);
  const { user, loading } = useAuth();

  const eventActions = [
    {
      label: "Create Event",
      onClick: () => setOpenEvent(true),
      className: "create-event",
    }
  ];

  return (
    <div className="layout">
      <Navigation />
      <div className="main">
        <h1>Events</h1>

        <QuickActions
          actions={eventActions}
          open={open}
          handleToggle={handleToggle}
          user={user}
        />

        <AddEventModal
          isOpen={isOpenEvent}
          onClose={() => setOpenEvent(false)}
        />

      </div>
    </div>
  );
}

export default Events;
