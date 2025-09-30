import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postHabits } from "../../redux/data/dataSlice";
import './TipsPopup.scss';

const TipsPopup = () => {
	const { tip } = useSelector(state => state.data);
	const [visible,setVisible] = useState(false);
	const [opaque,setOpaque] = useState(false);
	const dispatch = useDispatch();
	useEffect(() => {
		if(tip) setVisible(true);
		setTimeout(() => setOpaque(true), 1000);
		setTimeout(() => setOpaque(false), 7000);
		setTimeout(() => setVisible(false), 10000);
	},[tip]);

	useEffect(() => {
		dispatch(postHabits({
			velocidad_media_kmh: 90,
			frenadas_fuertes_100km: 8,
			aceleraciones_100km: 8,
			ratio_ralenti: 0.05,
			ratio_carga: 0.6
		}));
	},[])

	return visible && <div className={`tipsPopup ${opaque ? 'visible':''}`}>
		<p>{tip}</p>
	</div>
};

export default TipsPopup;