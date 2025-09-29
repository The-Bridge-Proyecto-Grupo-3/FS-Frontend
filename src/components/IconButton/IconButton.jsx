import back from '../../assets/BackArrowIcon.png';
// import edit from '../../assets/EditIcon.png';
// import deleteIcon from '../../assets/DeleteIcon.png';
import logout from '../../assets/LogoutIcon.png';
import red from '../../assets/red_circle.png';
import yellow from '../../assets/yellow_circle.png';
import green from '../../assets/green_circle.png';
import './IconButton.scss';

const icons = {
	back,
	logout,
	red,
	yellow,
	green, //edit, delete: deleteIcon
};

const IconButton = ({ icon, title, label, onClick, style }) => {
	return (
		<button
			title={title}
			className="iconBtn"
			onClick={onClick}
			style={{ '--icon-url': `url(${icons[icon]})`, ...style }}
		>
			{label}
		</button>
	);
};

export default IconButton;
