import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ role }) => {
	const { role: currentRole } = useSelector(state => state.auth);
	console.log(role,currentRole);
	return currentRole == role ? <Outlet />:<Navigate to={role ? '/login':'/'} />
};

export default ProtectedRoute;