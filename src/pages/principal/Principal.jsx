import LogoPrincipal2 from '../../assets/LogoPrincipal2.png';
import Deivi from '../../assets/Deivi.png';
import './principal.css';
export default function Principal() {
	return (
		<div className="pincipalContainer">
			<img src={LogoPrincipal2} alt="Logo Principal" width={'150px'} />
			<img src={Deivi} alt="Logo Principal" width={'150px'} />
		</div>
	);
}
