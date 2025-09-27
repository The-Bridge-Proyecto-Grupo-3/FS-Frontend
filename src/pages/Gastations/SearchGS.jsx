import { useEffect } from 'react';
import { useGastations } from './useGastations';
import { SelectorForm } from './SelectorForm';
import { GastationDetails } from './GastationDetails';
import { Link } from 'react-router-dom';
import BackArrowIcon from '../../assets/BackArrowIcon.png';

const SearchGS = () => {
	const {
		provincias,
		municipios,
		gastations,
		gastationDetails,
		isLoading,
		isError,
		message,
		loadProvincias,
		selectProvincia,
		selectMunicipio,
		selectGastation,
	} = useGastations();

	useEffect(() => {
		loadProvincias();
	}, [loadProvincias]);

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

			{isLoading && <p>Cargando datos...</p>}
			{isError && <p style={{ color: 'red' }}>Error: {message}</p>}

			<GastationDetails details={gastationDetails} />
		</div>
	);
};

export default SearchGS;
