import axios from 'axios';

const API_URL = 'http://localhost:4000';

const registerDriver = async userData => {
	const res = await axios.post(`${API_URL}/users`, userData);
	return res.data;
};

const authService = {
	registerDriver,
};

export default authService;
