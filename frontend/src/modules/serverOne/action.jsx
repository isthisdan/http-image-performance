/* React Components */
import axios from 'axios';

import { serverOneActions } from 'modules/serverOne/slice';

axios.defaults.withCredentials = true;

export const postImage = (data) => {
	return async (dispatch) => {
		const uploadImage = async (data) => {
			const response = await axios({
				method: 'post',
				url: 'http://127.0.0.1:8441/image',
				data: data,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				withCredentials: true,
			}).catch((err) => {
				console.log(err);
				throw new Error('Could not POST Image');
			});
			return response;
		};
		try {
			const postResponse = await uploadImage(data);
			dispatch(
				serverOneActions.setPost({
					postImage: {
						status: postResponse.status,
						imageName: postResponse.data.imageName,
						message: postResponse.data.message,
					},
				})
			);
		} catch (err) {
			console.log(err);
			dispatch(
				serverOneActions.setPost({
					postImage: {
						status: err.status,
						message: err.message,
					},
				})
			);
		}
	};
};

export const getImageList = (name) => {
	return async (dispatch) => {
		const getImgList = async (name) => {
			const response = await axios({
				method: 'get',
				url: `http://127.0.0.1:8441/image/${name}`,
				withCredentials: true,
			}).catch((err) => {
				console.log(err);
				throw new Error('Could not GET Image List');
			});
			return response;
		};
		try {
			const responseImgList = await getImgList(name);
			dispatch(
				serverOneActions.setGetImgList({
					getImageList: {
						status: responseImgList.status,
						imageList: responseImgList.data.imageList,
						message: responseImgList.data.message,
					},
				})
			);
		} catch (err) {
			console.log(err);
			dispatch(
				serverOneActions.setGetImgList({
					getImageList: {
						status: err.status,
						imgList: [],
						message: err.message,
					},
				})
			);
		}
	};
};

export const clean = () => {
	return async (dispatch) => {
		const cleanWorkspace = async () => {
			const response = await axios({
				method: 'post',
				url: 'http://127.0.0.1:8441/image/clean',
				withCredentials: true,
			}).catch((err) => {
				console.log(err);
				throw new Error('Could not POST Image');
			});
			return response;
		};
		try {
			const postResponse = await cleanWorkspace();
			if (postResponse.status === 200) {
				dispatch(serverOneActions.cleanPost());
				dispatch(serverOneActions.cleanGet());
			} else {
				throw new Error('Fail to Clean Workspace and Web States');
			}
		} catch (err) {
			console.log(err);
		}
	};
};
