import { useEffect } from 'react';
import { useGastations } from './useGastations';
import { SelectorForm } from './SelectorForm';
import { GastationDetails } from './GastationDetails';
import { GastationsTable } from './GastationsTable';
import { Link } from 'react-router-dom';
import BackArrowIcon from '../../assets/BackArrowIcon.png';

const SearchGS = () => {
	const {
		provincias,
		municipios,
		gastations,
		gastationDetails,
		nearGastations,
		isLoading,
		isError,
		message,
		loadProvincias,
		selectProvincia,
		selectMunicipio,
		selectGastation,
		findNearbyStations,
	} = useGastations();

	useEffect(() => {
		loadProvincias();
	}, [loadProvincias]);

	useEffect(() => {
		if (gastationDetails) {
			const { latitud, longitud } = gastationDetails;

			if (latitud && longitud) {
				findNearbyStations(latitud, longitud);
			}
		}
	}, [gastationDetails, findNearbyStations]);

	const selectorData = { provincias, municipios, gastations };
	const selectorActions = { selectProvincia, selectMunicipio, selectGastation };

	return (
		<div>
			<div className="iconContainer">
				<Link to="/driver">
					<img src={BackArrowIcon} alt="atras" width={30} />
				</Link>
			</div>
			<h2>Gasolineras</h2>

			<SelectorForm data={selectorData} actions={selectorActions} />

			<GastationDetails details={gastationDetails} />

			{/* {isLoading && <p>Cargando datos...</p>} */}
			{isError && <p style={{ color: 'red' }}>Error: {message}</p>}
			<>
				<GastationsTable
					stations={nearGastations}
					fuelType="Gasolina95"
					title="Recomendaciones por precio de Gasolina 95"
				/>

				<GastationsTable
					stations={nearGastations}
					fuelType="Diesel"
					title="Recomendaciones por precio de Diésel"
				/>
			</>
		</div>
	);
};

export default SearchGS;
