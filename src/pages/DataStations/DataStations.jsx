import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import GoBack from '../../components/Buttons/GoBack';
import { useForm } from '../../hooks/useForm';
import { postRecommendations } from '../../redux/data/dataSlice';
import DataStation from './DataStation';
import './DataStations.scss';

const RegisterReceipt = () => {
	const dispatch = useDispatch();

	// const { user } = useSelector(state => state.auth);
	// const assignedVehicle = user?.Vehicle;

	// const { status } = useSelector(state => state.vehicles);

	const { dataStations, status } = useSelector(state => state.data);
	const meanPrice = 1.62;

	const validation = {
		fuel_type: value => [[value, 'Introduce tipo de combustible del vehículo']],
		quantity: value => [[value, 'Introduce litros de repostaje']],
		origin: value => [[value, 'Introduce un punto de salida']],
		destination: value => [[value, 'Introduce un destino']],
	};

	const onSubmit = async () =>
		dispatch(
			postRecommendations({
				litros_necesarios: formData.quantity,
				precio_area_medio: meanPrice,
				ruta_id: 'R001',
			})
		).unwrap();

	const { formData, setFormData, message, success, handleInputChange, handleSubmit } = useForm({
		validation,
		onSubmit,
	});

	useEffect(() => {
		setFormData(prev => ({ ...prev, origin: '', destination: '', fuel_type: '' }));
	}, []);

	const [coords, setCoords] = useState({ lat: 40.40875, lng: -3.623236286941566 });
	const [locationError, setLocationError] = useState('');

	useEffect(() => console.log(dataStations), [dataStations]);

	// useEffect(() => {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			pos => {
	// 				setCoords({
	// 					lat: pos.coords.latitude,
	// 					lng: pos.coords.longitude,
	// 				});
	// 			},
	// 			err => {
	// 				console.error('Error obteniendo ubicación:', err);
	// 				setLocationError(
	// 					'No se pudo obtener tu ubicación. Por favor, activa los permisos.'
	// 				);
	// 			}
	// 		);
	// 	} else {
	// 		setLocationError('Geolocalización no soportada en este navegador.');
	// 	}
	// }, []);

	const distance = (lat1, lon1, lat2, lon2) => {
		lat1 *= Math.PI / 180;
		lat2 *= Math.PI / 180;
		lon1 *= Math.PI / 180;
		lon2 *= Math.PI / 180;
		const hav = t => Math.sin(t / 2) ** 2;
		const dlat = lat1 - lat2;
		const dlng = lon1 - lon2;
		return (
			2 *
			6371 *
			Math.asin(Math.sqrt(hav(dlat) + hav(dlng) * (1 - hav(dlat) - hav(lat1 + lat2))))
		);
	};

	// useEffect(() => {
	// 	if (!assignedVehicle) return;
	// 	const vehicleType = assignedVehicle.type;
	// 	if (vehicleType === 'electric') {
	// 		setFormData(prev => ({ ...prev, fuel_type: 'electric' }));
	// 	} else if (vehicleType === 'gas') {
	// 		setFormData(prev => ({ ...prev, fuel_type: '' }));
	// 	}
	// }, [assignedVehicle]);

	return (
		<>
			<GoBack path="/driver" />
			<div className="register-container">
				<div className="form-container">
					<h2>Gasolineras</h2>

					{/* {user && assignedVehicle && (
					<div className="info-box">
						<p>
							<strong>Conductor:</strong> {user.first_name} {user.last_name}
						</p>
						<p>
							<strong>Vehículo:</strong> {assignedVehicle.brand}{' '}
							{assignedVehicle.model} ({assignedVehicle.license_plate})
						</p>
					</div>
				)} */}

					<form className="form-info" onSubmit={handleSubmit}>
						<div className="input-container">
							<div className="form-parts">
								<label htmlFor="origin">Origen</label>
								<select
									name="origin"
									id="origin"
									className="select-custom"
									value={formData.origin}
									onChange={handleInputChange}
								>
									<option value="" disabled>
										Elige un punto de salida
									</option>
									<option value="Madrid">Madrid</option>
									<option value="Barcelona">Barcelona</option>
									<option value="Valencia">Valencia</option>
									<option value="Sevilla">Sevilla</option>
									<option value="Bilbao">Bilbao</option>
								</select>
								<label htmlFor="destination">Destino</label>
								<select
									name="destination"
									id="destination"
									className="select-custom"
									value={formData.destination}
									onChange={handleInputChange}
								>
									<option value="" disabled>
										Elige un punto de llegada
									</option>
									<option value="Madrid">Madrid</option>
									<option value="Barcelona">Barcelona</option>
									<option value="Valencia">Valencia</option>
									<option value="Sevilla">Sevilla</option>
									<option value="Bilbao">Bilbao</option>
								</select>
								<label htmlFor="fuel_type">Tipo de Combustible</label>
								<select
									name="fuel_type"
									id="fuel_type"
									className="select-custom"
									value={formData.fuel_type}
									onChange={handleInputChange}
								>
									<option value="" disabled>
										Seleccione el tipo
									</option>
									<option value="95">Gasolina 95</option>
									<option value="98">Gasolina 98</option>
									<option value="diesel">Diésel</option>
									<option value="GLP">GLP</option>
								</select>
							</div>

							<div className="form-parts">
								<label htmlFor="quantity">Cantidad (L)</label>
								<input
									id="quantity"
									name="quantity"
									type="number"
									min="0"
									step="0.01"
									value={formData.quantity}
									onChange={handleInputChange}
								/>
							</div>

							{message && <span className="error">{message}</span>}

							<input
								type="submit"
								value={status === 'loading' ? 'Buscando...' : 'Buscar gasolineras'}
							/>
						</div>
					</form>
				</div>

				<div className="stationsList">
					{dataStations &&
						dataStations.map((station, index) => {
							return (
								<DataStation
									key={index}
									index={index + 1}
									data={{
										...station,
										distance: distance(
											station.latitud,
											station.longitud,
											coords.lat,
											coords.lng
										),
										priceDiff: (station.precio_litro - meanPrice) * 100,
									}}
								/>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default RegisterReceipt;
