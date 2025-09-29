import dataApi from '../../config/dataApi';

const postRecommendations = async routeData => {
	const res = await dataApi.post('/repostaje/recomendaciones', routeData);
	return res.data;
};

const postHabits = async driverData => {
	const res = await dataApi.post('/habitos/predict', driverData);
	return res.data;
};

const dataService = {
	postRecommendations,
	postHabits,
};

export default dataService;
