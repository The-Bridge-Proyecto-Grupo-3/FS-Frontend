import back from '../../assets/BackArrowIcon.png';
// import edit from '../../assets/EditIcon.png';
// import deleteIcon from '../../assets/DeleteIcon.png';
import logout from '../../assets/LogoutIcon.png';

import './IconButton.scss';

const icons = {
	back, logout, //edit, delete: deleteIcon
}

const IconButton = ({ icon, title, label, onClick, style }) => {
	return (
		<button title={title} className="iconBtn" onClick={onClick} style={{ '--icon-url': `url(${icons[icon]})`, ...style}}>
			{label}
		</button>
	)
};

export default IconButton;