import { RequestPage } from 'pages';

/* React Modules */
import { Provider as WebStateStorage } from 'react-redux';
import store from 'modules';

import 'App.css';

function App() {
	return (
		<WebStateStorage store={store}>
			<div className='App'>
				<RequestPage></RequestPage>
			</div>
		</WebStateStorage>
	);
}

export default App;
