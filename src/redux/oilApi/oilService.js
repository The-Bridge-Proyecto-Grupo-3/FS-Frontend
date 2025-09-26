import axios from 'axios';

const API_URL = 'https://api.precioil.es';

const getProvincias = async () => {
	const res = await axios.get(`${API_URL}/provincias`);
	return res.data;
};

const getMunicipios = async idProvincia => {
	const res = await axios.get(`${API_URL}/municipios/provincia/${idProvincia}`);
	return res.data;
};

const getGastations = async idMunicipio => {
	const res = await axios.get(`${API_URL}/estaciones/municipio/${idMunicipio}`);
	return res.data;
};

const getGastationDetails = async idEstacion => {
	const res = await axios.get(`${API_URL}/estaciones/detalles/${idEstacion}`);
	return res.data;
};

const getGastationNextMe = async (latitud, longitud, radio) => {
	const res = await axios.get(
		`${API_URL}/estaciones/radio?latitud=${latitud}&longitud=${longitud}&radio=${radio}&pagina=1&limite=10`
	);
	return res.data;
};

const oilService = {
	getProvincias,
	getMunicipios,
	getGastations,
	getGastationDetails,
	getGastationNextMe,
};

export default oilService;
