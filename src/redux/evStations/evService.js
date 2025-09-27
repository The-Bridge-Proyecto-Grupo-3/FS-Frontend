import api from '../../config/api';

const getNearEvStations = async (latitude, longitude) => {
	try {
		const res = await api.get(
			`/stations/ev?lat=${latitude}&lon=${longitude}&radius=20&limit=100`
		);
		return res.data;
	} catch (error) {
		console.error('Error al obtener las estaciones de carga EV:', error);
		throw error;
	}
};

const evService = {
	getNearEvStations,
};

export default evService;
