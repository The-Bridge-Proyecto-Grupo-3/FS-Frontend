import axios from 'axios';

const dataApi = axios.create({
	baseURL: 'http://127.0.0.1:8000/',
	withCredentials: true,
});

export default dataApi;
