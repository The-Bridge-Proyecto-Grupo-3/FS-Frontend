import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGastations } from '../../redux/oilApi/oilSlice';
import Gastation from './Gastation';
import './SearchGS.scss';

const Gastations = ({ idMunicipio }) => {
	const dispatch = useDispatch();
	const { gastations } = useSelector(state => state.oil);

	const [busqueda, setBusqueda] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [selectedId, setSelectedId] = useState(null);

	useEffect(() => {
		if (idMunicipio) {
			dispatch(getGastations(idMunicipio));
		}
	}, [dispatch, idMunicipio]);

	const gastationsFiltradas = gastations.filter(estacion =>
		`${estacion.nombreEstacion} ${estacion.direccion}`
			.toLowerCase()
			.includes(busqueda.toLowerCase().trim())
	);

	const handleClick = estacion => {
		setSelectedId(estacion.idEstacion);
		setBusqueda(`${estacion.nombreEstacion} - ${estacion.direccion}`);
		setShowDropdown(false);
	};

	return (
		<div className="search-box">
			<h1>Gasolineras</h1>
			<input
				type="text"
				placeholder="Buscar gasolinera..."
				value={busqueda}
				onChange={e => {
					setBusqueda(e.target.value);
					setShowDropdown(true);
				}}
				onFocus={() => setShowDropdown(true)}
				onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
			/>

			{showDropdown && gastationsFiltradas.length > 0 && (
				<ul className="dropdown">
					{gastationsFiltradas.map(estacion => (
						<li
							key={estacion.idEstacion}
							onClick={() => handleClick(estacion)}
							className={selectedId === estacion.idEstacion ? 'selected' : ''}
						>
							{estacion.nombreEstacion} - {estacion.direccion}
						</li>
					))}
				</ul>
			)}
			{selectedId && (
				<div style={{ marginTop: '20px' }}>
					<Gastation idEstacion={selectedId} />
				</div>
			)}
		</div>
	);
};

export default Gastations;
