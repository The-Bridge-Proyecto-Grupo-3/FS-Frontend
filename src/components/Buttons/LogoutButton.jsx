import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";
import IconButton from "../IconButton/IconButton";

const LogoutButton = () => {
	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(logoutUser());
	};
	return <IconButton icon="logout" onClick={handleLogout} />
};

export default LogoutButton;