import IcPlus from '../../icons/ic-plus.svg';

const QuickActions = ({ actions, open, handleToggle, user}) => {
  if (!actions || actions.length === 0) return null;
  if(user?.role !== "admin") return null;

  return (
    <div className="add">
      <div className="plus">
        <button className={`btn-plus ${open ? "open" : ""}`} onClick={handleToggle}>
          <img src={IcPlus} alt="Plus" />
        </button>
      </div>
      <ul className={`add-list ${open ? "show" : ""}`}>
        {actions.map((action, index) => (
          <li key={index} className="li-add">
            <button className={`btn ${action.className}`} onClick={action.onClick}>
              {action.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickActions;