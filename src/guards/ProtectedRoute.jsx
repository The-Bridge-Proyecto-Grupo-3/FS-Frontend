import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
	const { role: currentRole } = useSelector(state => state.auth);
	console.log(currentRole,role)
	return currentRole == role ? children : <Navigate to={role ? '/login':'/'} />
};

export default ProtectedRoute;