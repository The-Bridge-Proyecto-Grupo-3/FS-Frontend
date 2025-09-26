import api from '../../config/api';

const create = async receiptData => {
	// La API devuelve un 201 sin cuerpo en el response, por lo que response.data será undefined.
	const response = await api.post('/receipts', receiptData);
	return response.data;
};

const getAll = async companyId => {
	const params = companyId ? { company_id: companyId } : {}; //El ID de la empresa para filtrar los resultados (solo para admins).
	const response = await api.get('/receipts', { params });
	return response.data;
};

const receiptService = {
	create,
	getAll,
};

export default receiptService;
