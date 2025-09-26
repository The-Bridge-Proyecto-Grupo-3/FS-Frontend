import api from '../../config/api';

const create = async vehicleData => {
	const response = await api.post('/vehicles', vehicleData);
	return response.data;
};

const getAll = async () => {
	const response = await api.get('/vehicles');
	return response.data;
};

const getById = async id => {
	const response = await api.get(`/vehicles/${id}`);
	return response.data;
};

const update = async (id, vehicleData) => {
	const response = await api.put(`/vehicles/${id}`, vehicleData);
	return response.data;
};

const remove = async id => {
	const response = await api.delete(`/vehicles/${id}`);
	return response.data;
};

const vehicleService = {
	create,
	getAll,
	getById,
	update,
	remove,
};

export default vehicleService;
