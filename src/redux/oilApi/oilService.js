import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.precioil.es'
});

const getProvincias = async () => {
	const res = await api.get('/provincias');
	return res.data;
};

const getMunicipios = async idProvincia => {
	const res = await axios.get(`/municipios/provincia/${idProvincia}`);
	return res.data;
};

const getGastations = async idMunicipio => {
	const res = await axios.get(`/estaciones/municipio/${idMunicipio}`);
	return res.data;
};

const getGastationDetails = async idEstacion => {
	const res = await axios.get(`/estaciones/detalles/${idEstacion}`);
	return res.data;
};

const getGastationNextMe = async (latitud, longitud, radio) => {
	const res = await axios.get(
		`/estaciones/radio?latitud=${latitud}&longitud=${longitud}&radio=${radio}&pagina=1&limite=10`
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
