import { useState } from 'react';
import Provincias from './Provincias';
import Municipios from './Municipios';
import Gastations from './Gastations';
import './SearchGS.scss';

const SearchGS = () => {
	const [provinciaSeleccionada, setProvinciaSeleccionada] = useState(null);
	const [municipioSeleccionado, setMunicipioSeleccionado] = useState(null);

	return (
		<div className="search-container">
			<h1>Gasolineras</h1>

			<Provincias
				onSelect={provincia => {
					setProvinciaSeleccionada(provincia);
					setMunicipioSeleccionado(null); // reset municipios
				}}
			/>

			{provinciaSeleccionada && (
				<Municipios
					idProvincia={provinciaSeleccionada.idProvincia}
					onSelect={municipio => {
						setMunicipioSeleccionado(municipio);
					}}
				/>
			)}

			{municipioSeleccionado && (
				<Gastations idMunicipio={municipioSeleccionado.idMunicipio} />
			)}
		</div>
	);
};

export default SearchGS;
