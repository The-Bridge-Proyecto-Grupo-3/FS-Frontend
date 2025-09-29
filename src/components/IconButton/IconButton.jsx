import back from '../../assets/BackArrowIcon.png';
// import edit from '../../assets/EditIcon.png';
// import deleteIcon from '../../assets/DeleteIcon.png';
import logout from '../../assets/LogoutIcon.png';
import red from '../../assets/red_circle.svg?url';
import yellow from '../../assets/yellow_circle.svg?url';
import green from '../../assets/green_circle.svg?url';
import './IconButton.scss';

const icons = {
	back,
	logout,
	red: '/src/assets/red_circle.svg',
	yellow: '/src/assets/yellow_circle.svg',
	green: '/src/assets/green_circle.svg', //edit, delete: deleteIcon
};

const IconButton = ({ icon, title, label, onClick, style }) => {
	console.log(icons)
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
