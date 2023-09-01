import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const UserButton = ({ to, buttonName, icon }) => {
  return (
    <div>
      <Link to={to}>
        <button className="button"><FontAwesomeIcon icon={icon} /> {buttonName}</button>
      </Link>
    </div>
  );
};

export default UserButton;