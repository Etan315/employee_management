import {useState, useEffect} from "react";
import './Navigation.css';
import { useAuth } from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../icons/ic-logo.svg";
import Navtoggle from "./../../icons/ic-sidebar.svg";
import IcHome from "../../icons/ic-home.svg" ;
import IcManage from "../../icons/ic-manage.svg" ;
import IcCalender from "../../icons/ic-calendar.svg?react" ;
import IcNotification from "../../icons/ic-notification.svg" ;
import IcControl from "../../icons/ic-control.svg" ;
import IcHelp from "../../icons/ic-help.svg" ;
import IcSettings from "../../icons/ic-setting.svg" ;
import IcExit from "../../icons/ic-exit.svg" ;


function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate(); 
  const { user, loading } = useAuth();

  if (loading) return null; 

  const handleClick = () => setIsOpen(prev => !prev);
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.message);
      navigate("/login",{ replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      navigate("/login", { replace: true });
    }
  };

  return (
    <nav className={`${isOpen ? 'navClosed' : 'navOpen'}`}>
      <header className="nav-header">
        <div className="logo-wrapper">
          <div className="logo">
            <button><img src={Logo} alt="logo" /></button>
          </div>
          <div className="nav-toggle">
            <button onClick={() => handleClick(isOpen)}><img src={Navtoggle} alt="menu" /></button>
          </div>
        </div>
      </header>
      <div className="main-nav">
        <ul>
          <li className="logo nav-logo home">
            <Link to='/dashboard'>
              <img src={IcHome} alt="logo" />
              <span>Home</span>
            </Link>
          </li>
          <li className="logo nav-logo manage">
            <Link to='/usermanagement'>
              <img src={IcManage} alt="logo" />
              <span>User management</span>
            </Link>
          </li>
          <li className="logo nav-logo event">
            <Link to='/events'>
              <IcCalender/>
              <span>Events</span>
            </Link>
          </li>
          <li className="logo nav-logo notification">
            <Link to='/notification'>
              <img src={IcNotification} alt="logo" />
               <span>Notifications</span> {/* <span>2</span> //TODO: Should have a number here*/}
            </Link>
          </li>
          {/* TODO: bug, after logging in as admin, this li show, and after try to logged out. After logging in again without refreshing the page as employee, the li still there. Only removes if you refresh the page.
          Vice versa
          */}
          {user?.role === "admin" && (
            <li className="logo nav-logo control">
              <Link to="/accesscontrol">
                <img src={IcControl} alt="logo" />
                <span>Access Control</span>
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="system-nav">
        <ul>
          <li className="logo nav-logo support">
            <Link to='/support'>
              <img src={IcHelp} alt="logo" />
              <span>Support</span>
            </Link>
          </li>
          <li className="logo nav-logo settings">
            <Link to='/settings'>
              <img src={IcSettings} alt="logo" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="account-nav">
        <ul>
          {/* //TODO: move the handleLogout after confirmation, first change the onclick to show modal then handle the logout after it. */}
          <li className="logo nav-logo exit" onClick={handleLogout}>
            <img src={IcExit} alt="logo" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
