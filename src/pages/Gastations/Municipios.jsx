import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMunicipios } from '../../redux/oilApi/oilSlice';
import './SearchGS.scss';

const Municipios = ({ idProvincia, onSelect }) => {
	const dispatch = useDispatch();
	const { municipios } = useSelector(state => state.oil);

	const [busqueda, setBusqueda] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		if (idProvincia) {
			dispatch(getMunicipios(idProvincia));
		}
	}, [dispatch, idProvincia]);

	const municipiosFiltrados = municipios.filter(m =>
		m.nombreMunicipio.toLowerCase().includes(busqueda.toLowerCase().trim())
	);

	const handleClick = municipio => {
		onSelect(municipio);
		setBusqueda(municipio.nombreMunicipio);
		setShowDropdown(false);
	};

	return (
		<div className="search-box">
			<h2>Municipio</h2>
			<input
				type="text"
				placeholder="Buscar municipio..."
				value={busqueda}
				onChange={e => {
					setBusqueda(e.target.value);
					setShowDropdown(true);
				}}
				onFocus={() => setShowDropdown(true)}
				onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
			/>
			{showDropdown && municipiosFiltrados.length > 0 && (
				<ul className="dropdown">
					{municipiosFiltrados.map(municipio => (
						<li key={municipio.idMunicipio} onClick={() => handleClick(municipio)}>
							{municipio.nombreMunicipio}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Municipios;
