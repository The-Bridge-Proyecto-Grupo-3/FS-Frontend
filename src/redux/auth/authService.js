import axios from 'axios';

const API_URL = 'http://localhost:4000';

// const registerDriver = async userData => {
// 	const res = await axios.post(`${API_URL}/users`, userData);
// 	return res.data;
// };
const userLogin = async userData => {
	const res = await axios.post(`${API_URL}/auth/login`, userData, { withCredentials: true });
	return res.data;
};
const verify2FA = async (code) => {
	const res = await axios.post(`${API_URL}/auth/2fa`, { code }, { withCredentials: true });
	return res.data;
};
const authService = {
	// registerDriver,
	userLogin,
	verify2FA,
};

export default authService;
