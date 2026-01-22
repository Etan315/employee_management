import { useEffect, useState, React } from "react";
import "./Dashboard.css";
import Navigation from "../../components/navigation/Navigation";
import IcView from "../../icons/ic-view.svg";
import IcActiveEmployee from "../../icons/ic-active-employee.svg";
import IcEmployee from "../../icons/ic-employee.svg";
import IcDepartment from "../../icons/ic-department.svg";
import { useAuth } from "../../context/AuthContext";

import AddEmployeeModal from "../../components/modal/AddEmployeeModal";
import AddEventModal from "../../components/modal/event/AddEventModal";
import AddPosition from "../../components/modal/position/addPosition";
import AddDepartment from "../../components/modal/department/addDepartment";

import QuickActions from "../../components/navigation/QuickActions";

function Dashboard() {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [isOpenEmployee, setOpenEmployee] = useState(false);
  const [isOpenEvent, setOpenEvent] = useState(false);
  const [isOpenPosition, setOpenPosition] = useState(false);
  const [isOpenDepartment, setOpenDepartment] = useState(false);
  if (loading) return null;

  const handleToggle = () => {
    setOpen(!open);
  };

  //initial counts for dashboard stats
  const [stats, setStats] = useState({
    employees: 0,
    departments: 0,
    activeEmployees: 0,
  });

  // display buttons in the quick action
  const eventActions = [
    {
      label: "Add Employee",
      onClick: () => setOpenEmployee(true),
      className: "add-employee",
    },
    {
      label: "Create Event",
      onClick: () => setOpenEvent(true),
      className: "create-event",
    },
    {
      label: "Add Department",
      onClick: () => setOpenDepartment(true),
      className: "add-department",
    },
    {
      label: "Add Position",
      onClick: () => setOpenPosition(true),
      className: "add-position",
    },
  ];

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/stats/counts");
        const data = await res.json();
        setStats({
          employees: Number(data.employees),
          departments: Number(data.departments),
          activeEmployees: Number(data.activeEmployees),
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <>
      <div className="layout">
        <Navigation />

        <main>
          <header>
            <h1>Dashboard</h1>
            {/* Admin & Hr */}
            {user?.role === "admin" ? (
              <p>
                Manage employees, departments, and activities, including totals,
                active staff, recent hires, events, and onboarding, with options
                to create users and events.
              </p>
            ) : (
              <p>
                View total employees, your department info, absences/leave, and
                recent activities like hires, events, and orientations.
              </p>
            )}
          </header>

          <QuickActions
            actions={eventActions}
            open={open}
            handleToggle={handleToggle}
            user={user}
          />

          <AddEmployeeModal
            isOpen={isOpenEmployee}
            onClose={() => setOpenEmployee(false)}
          />
          <AddEventModal
            isOpen={isOpenEvent}
            onClose={() => setOpenEvent(false)}
          />

          <AddPosition
            isOpen={isOpenPosition}
            onClose={() => setOpenPosition(false)}
          />

          <AddDepartment
            isOpen={isOpenDepartment}
            onClose={() => setOpenDepartment(false)}
          />

          <div className="stats-group">
            <div className="stats total-employee-stat">
              <div className="ic">
                <img className="stats-icon" src={IcEmployee} alt="Employee" />
              </div>
              <div className="text">
                <h2>Total employee</h2>
                <span>{stats.employees}</span>
              </div>
            </div>
            <div className="stats total-department-stat">
              <div className="ic">
                <img
                  className="stats-icon"
                  src={IcDepartment}
                  alt="Department"
                />
              </div>
              <div className="text">
                <h2>Total department</h2>
                <span>{stats.departments}</span>
              </div>
            </div>
            <div className="stats active-employee-stat">
              <div className="ic">
                <img
                  className="stats-icon"
                  src={IcActiveEmployee}
                  alt="Active Employee"
                />
              </div>
              <div className="text">
                <h2>Active employee</h2>
                <span>{stats.activeEmployees}</span>
              </div>
            </div>
          </div>

          <div className="logs-group">
            <div className="logs upcoming-event">
              <h2>Upcoming Event</h2>
              <ul>
                <li>
                  <div className="event-info">
                    <p>Event Title</p>

                    <div className="date-time">
                      <span className="date">Oct 12,2025</span>{" "}
                      <span className="separator">-</span>{" "}
                      <span className="time">2:00pm</span>
                    </div>

                    <p className="discription">
                      Norem ipsum consectetur adipiscing elit.dolor sit amet,
                      consectetur adipiscing Norem ipsum consectetur adipiscing
                      elit.dolor adipiscing sit{" "}
                      <span className="ellipsis">...</span>
                    </p>
                  </div>
                  <button className="btn view-event">
                    <img src={IcView} alt="view button" />
                  </button>
                </li>
              </ul>
            </div>
            <div className="logs recent-activity">
              <h2>Recent</h2>
              <ul>
                <li>
                  <div className="activity-info">
                    <p>Newly hired on HR department</p>
                    <span className="separator">-</span>
                    <div className="date-and-time">
                      <span className="date">Oct 21</span>{" "}
                      <span className="comma">,</span>{" "}
                      <span className="time">9:20pm</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
