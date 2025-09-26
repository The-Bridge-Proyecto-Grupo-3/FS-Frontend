import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion as m } from 'framer-motion';
import LogoPrincipal2 from '../../assets/LogoPrincipal2.png';
import Deivi from '../../assets/Deivi.png';
import './principal.css';

export default function Principal() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/login');
		}, 5000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<m.div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				height: '100vh',
				alignItems: 'center',
				marginTop: '15rem',
				gap: '1rem',
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.8 }}
		>
			<m.img
				src={LogoPrincipal2}
				alt="Logo Principal"
				width="150px"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8 }}
			/>
			<m.img
				src={Deivi}
				alt="Logo Deivi"
				width="150px"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 1, delay: 0.3 }}
			/>
		</m.div>
	);
}
