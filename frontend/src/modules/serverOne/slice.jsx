/* React Components */
import { createSlice } from '@reduxjs/toolkit';

import { serverOne } from 'data';

const serverOneSlice = createSlice({
	name: 'serverOne',
	initialState: {
		postImage: serverOne.initialState.postImage,
		getImageList: serverOne.initialState.getImageList,
	},
	reducers: {
		setPost(state, action) {
			state.postImage.status = action.payload.postImage.status;
			state.postImage.imageName = action.payload.postImage.imageName;
			state.postImage.message = action.payload.postImage.message;
		},
		cleanPost(state) {
			state.postImage.status = '';
			state.postImage.imageName = '';
			state.postImage.message = '';
		},
		setGetImgList(state, action) {
			state.getImageList.status = action.payload.getImageList.status;
			state.getImageList.imageList =
				action.payload.getImageList.imageList;
			state.getImageList.message = action.payload.getImageList.message;
		},
		cleanGet(state) {
			state.getImageList.status = '';
			state.getImageList.imageList = '';
			state.getImageList.message = '';
			state.getImage.status = '';
			state.getImage.message = '';
		},
	},
});

export const serverOneActions = serverOneSlice.actions;
export default serverOneSlice;
