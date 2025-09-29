import IconButton from "../IconButton/IconButton";
import { useNavigate } from "react-router-dom";

const GoBack = ({ path }) => {
	const navigate = useNavigate();
	return <IconButton icon="back" onClick={() => navigate(path ?? -1)} />
};

export default GoBack;