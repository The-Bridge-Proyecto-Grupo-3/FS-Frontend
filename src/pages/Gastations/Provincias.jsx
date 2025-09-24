import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProvincias } from '../../redux/oilApi/oilSlice';
import './SearchGS.scss';

const Provincias = ({ onSelect }) => {
	const { provincias, isLoading, isError, message } = useSelector(state => state.oil);
	const [busqueda, setBusqueda] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getProvincias());
	}, [dispatch]);

	const handleClick = provincia => {
		onSelect(provincia);
		setBusqueda(provincia.nombreProvincia);
		setShowDropdown(false);
	};

	const provinciasFiltradas = provincias
		.filter(p => p.idProvincia < 53)
		.filter(p => p.nombreProvincia.toLowerCase().includes(busqueda.toLowerCase().trim()));

	if (isLoading) {
		return <div className="loading">Cargando provincias...</div>;
	}
	if (isError) {
		return <div className="error">Ha ocurrido un error: {message}</div>;
	}

	return (
		<div className="search-box">
			<h2>Provincia</h2>
			<input
				type="text"
				placeholder="Buscar provincia..."
				value={busqueda}
				onChange={e => {
					setBusqueda(e.target.value);
					setShowDropdown(true);
				}}
				onFocus={() => setShowDropdown(true)}
				onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
			/>
			{showDropdown && provinciasFiltradas.length > 0 && (
				<ul className="dropdown">
					{provinciasFiltradas.map(provincia => (
						<li key={provincia.idProvincia} onClick={() => handleClick(provincia)}>
							{provincia.nombreProvincia}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Provincias;
