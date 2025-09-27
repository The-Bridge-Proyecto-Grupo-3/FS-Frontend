import axios from '../../config/api';

const getAll = async userData => {
	const res = await axios.get('/drivers', userData);
	return res.data;
};

const registerDriver = async companyData => {
	const res = await axios.post('/drivers', companyData);
	return res.data;
};

const companyService = {
	getAll,
	registerDriver,
};

export default companyService;
