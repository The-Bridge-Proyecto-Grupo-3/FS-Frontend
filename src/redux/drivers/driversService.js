import axios from '../../config/api';

const getAll = async userData => {
	const res = await axios.get('/drivers', userData);
	return res.data;
};

const registerDriver = async driverData => {
	const res = await axios.post('/drivers', driverData);
	return res.data;
};

const companyService = {
	getAll,
	registerDriver,
};

export default companyService;
