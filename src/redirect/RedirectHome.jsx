import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Layout() {
	const navigate = useNavigate();
	const { role } = useSelector(state => state.auth);

	useEffect(() => {
		switch (role) {
			case 'admin':
				navigate('/admin', { replace: true });
				break;
			case 'company':
				navigate('/company', { replace: true });
				break;
			case 'driver':
				navigate('/driver', { replace: true });
				break;
			default:
				navigate('/login', { replace: true });
		}
	},[]);

	return;
}
