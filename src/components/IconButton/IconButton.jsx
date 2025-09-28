import back from '../../assets/BackArrowIcon.png';
import logout from '../../assets/LogoutIcon.png';

import './IconButton.scss';

const icons = {
	back, logout 
}

const IconButton = ({ icon, title, label, onClick, style }) => {
	return (
		<button title={title} className="iconBtn" onClick={onClick} style={{ '--icon-url': `url(${icons[icon]})`, ...style}}>
			{label}
		</button>
	)
};

export default IconButton;