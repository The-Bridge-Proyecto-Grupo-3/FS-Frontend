import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import LoadingPage from './pages/loading/LoadingPage.jsx';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<Router>
				<LoadingPage>
					<App />
				</LoadingPage>
			</Router>
		</Provider>
	</StrictMode>
);
