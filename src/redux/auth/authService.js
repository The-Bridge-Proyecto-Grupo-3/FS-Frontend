import axios from 'axios';

const API_URL = 'http://localhost:4000';

// const registerDriver = async userData => {
// 	const res = await axios.post(`${API_URL}/users`, userData);
// 	return res.data;
// };
const userLogin = async userData => {
	const res = await axios.post(`${API_URL}/auth/login`, userData);
	return res.data;
};
const verify2FA = async ({ code, token }) => {
	const res = await axios.post(`${API_URL}/auth/2fa`, { code }, { headers: { Authorization: token}});
	return res.data;
};
const authService = {
	// registerDriver,
	userLogin,
	verify2FA,
};

export default authService;
