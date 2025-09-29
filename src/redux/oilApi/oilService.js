import axios from 'axios';

const api = axios.create({
	baseURL: 'https://api.precioil.es',
});

const getProvincias = async () => {
	const res = await api.get('/provincias');
	return res.data;
};

const getMunicipios = async idProvincia => {
	const res = await api.get(`/municipios/provincia/${idProvincia}`);
	return res.data;
};

const getGastations = async idMunicipio => {
	const res = await api.get(`/estaciones/municipio/${idMunicipio}`);
	return res.data;
};

const getGastationDetails = async idEstacion => {
	const res = await api.get(`/estaciones/detalles/${idEstacion}`);
	return res.data;
};

const getNearGastations = async (latitud, longitud) => {
	const res = await api.get(
		`/estaciones/radio?latitud=${latitud}&longitud=${longitud}&radio=20&pagina=1&limite=30`
	);
	return res.data;
};

const getGastationNextMe = async (latitud, longitud, radio) => {
	const res = await api.get(
		`/estaciones/radio?latitud=${latitud}&longitud=${longitud}&radio=${radio}&pagina=1&limite=10`
	);
	return res.data;
};

const oilService = {
	getProvincias,
	getMunicipios,
	getGastations,
	getGastationDetails,
	getNearGastations,
	getGastationNextMe,
};

export default oilService;
