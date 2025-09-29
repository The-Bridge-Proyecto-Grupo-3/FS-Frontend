import axios from '../../config/api';

// const registerDriver = async userData => {
// 	const res = await axios.post(`${API_URL}/users`, userData);
// 	return res.data;
// };
const userLogin = async userData => {
	const res = await axios.post('/auth/login', userData);
	return res.data;
};
const userLogout = async userData => {
	const res = await axios.post('/auth/logout', userData);
	return res.data;
};
const userInfo = async () => {
	const res = await axios.get('/auth/info', { withCredentials: true });
	return res.data;
};
const verify2FA = async code => {
	const res = await axios.post('/auth/2fa', { code });
	return res.data;
};
const authService = {
	// registerDriver,
	userLogin,
	userLogout,
	verify2FA,
	userInfo,
};

export default authService;
