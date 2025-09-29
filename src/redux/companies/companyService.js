import axios from '../../config/api';

const getAll = async userData => {
	const res = await axios.get('/companies', userData);
	return res.data;
};

const registerCompany = async companyData => {
	const res = await axios.post('/companies', companyData);
	return res.data;
};

const companyService = {
	getAll, registerCompany
};

export default companyService;
