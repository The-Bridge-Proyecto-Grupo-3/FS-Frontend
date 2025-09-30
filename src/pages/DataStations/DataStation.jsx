import { distance } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DataStation = ({ data, index }) => {
	const navigate = useNavigate();
	
	const mapUrl = `https://maps.google.com/?q=${data.latitud},${data.longitud}`;

	const handleOpenMap = () => {
		window.open(mapUrl, '_blank', 'noopener,noreferrer');
	};

	return <div className="dataStation" onClick={handleOpenMap}>
		<div>
			<h3>#{index} {data.marca}</h3>
			<span>{data.carretera} ({data.distance.toFixed(2)} Km)</span>
		</div>
		<div>
			<b>{data.precio_litro}</b>
			<p>{ data.priceDiff < 1 && <span className={data.priceDiff < -4 && 'saving'}>({data.priceDiff.toFixed(1)} c/L)</span> }</p>
		</div>
	</div>
};

export default DataStation;