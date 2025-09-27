import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function RedirectHome() {
	const navigate = useNavigate();
	const { role } = useSelector(state => state.auth);

	useEffect(() => {
		if(role) navigate(`/${role}`, { replace: true });
		else navigate(`/login`, { replace: true });
	}, []);

	return;
}
