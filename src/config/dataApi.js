import axios from 'axios';

const dataApi = axios.create({
	baseURL: 'http://localhost:8000',
	withCredentials: true,
});

export default dataApi;
