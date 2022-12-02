/* React Library */
import { configureStore } from '@reduxjs/toolkit';

/* React Components */
import { serverOneSlice } from 'modules/serverOne';

const store = configureStore({
	reducer: {
		serverOneController: serverOneSlice.reducer,
	},
});

export default store;
