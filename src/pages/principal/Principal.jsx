import LogoPrincipal2 from '../../assets/LogoPrincipal2.png';
import Deivigo2 from '../../assets/deivigo2.png';
import './principal.css';
export default function Principal() {
	return (
		<div className="pincipalContainer">
			<img src={LogoPrincipal2} alt="Logo Principal" width={'330px'} />
			<img src={Deivigo2} alt="Logo Principal" width={'360px'} />
		</div>
	);
}
