/* React Library */
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* React Component */
import { default as Box } from '@mui/material/Box';
import { default as Typography } from '@mui/material/Typography';
import { default as Button } from '@mui/material/Button';
import { default as CircularProgress } from '@mui/material/CircularProgress';

import { postImage, getImageList, clean } from 'modules/serverOne';

export default function RequestPage() {
	const dispatch = useDispatch();
	const serverOnePostState = useSelector(
		(state) => state.serverOneController.postImage
	);
	const serverOneGetImageListState = useSelector(
		(state) => state.serverOneController.getImageList
	);
	const [isLoaded, setLoaded] = useState({
		status: false,
		form: [],
	});
	const [getServerOneImage, setGetServerOneImage] = useState(false);

	const imgUploader = (event) => {
		const imgs = event.target.files;
		const formData = new FormData();
		formData.append('image', imgs[0], imgs.name);
		setLoaded({
			status: true,
			form: formData,
		});
	};

	const submitImg = async (event, value) => {
		event.preventDefault();
		await dispatch(postImage(isLoaded.form));
	};

	useEffect(() => {
		if (serverOnePostState.status === 200) {
			dispatch(getImageList(serverOnePostState.imageName));
		}
	}, [dispatch, serverOnePostState]);

	const requestImage = (event) => {
		event.preventDefault();
		setGetServerOneImage(true);
	};

	const reset = async (event) => {
		setLoaded({
			status: false,
			form: [],
		});
		await dispatch(clean());
		window.location.reload();
	};

	return (
		<Fragment>
			<Box
				sx={{
					justifyContent: 'center',
					textAlign: 'center',
				}}
			>
				<Box>
					<Typography
						variant='h3'
						color='#f5f5f5'
					>
						Software Capstone
					</Typography>
					<Typography
						variant='h6'
						color='#f5f5f5'
					>
						Speed Testing of Loading IMG File Using HTTP/1.1 &
						HTTP/2.0 NodeJS Server
					</Typography>
					{serverOnePostState.status === false ? (
						<Box mt={3}>
							{isLoaded.status === false ? (
								<Button
									variant='contained'
									component='label'
								>
									Upload Image
									<input
										hidden
										accept='image/*'
										type='file'
										onChange={imgUploader}
									/>
								</Button>
							) : (
								<Fragment>
									<Typography
										variant='h8'
										color='#83ffa2'
										component='div'
									>
										Ready to Submit
									</Typography>

									<Button
										component='label'
										onClick={submitImg}
									>
										Submit
									</Button>
								</Fragment>
							)}
						</Box>
					) : serverOneGetImageListState.status === false ? (
						<Box mt={3}>
							<Button
								component='label'
								endIcon={
									<CircularProgress
										color='inherit'
										size={20}
									/>
								}
								variant='contained'
								sx={{
									background: '#94f2a2',
									color: 'black',
								}}
							>
								Requesting
							</Button>
						</Box>
					) : (
						<Box mt={3}>
							{getServerOneImage === false ? (
								<Button
									component='label'
									variant='contained'
									onClick={requestImage}
								>
									Get Image
								</Button>
							) : (
								<Button
									component='label'
									variant='contained'
									onClick={reset}
								>
									Reset
								</Button>
							)}
						</Box>
					)}
				</Box>
			</Box>
			{getServerOneImage === true && (
				<Box
					mt={5}
					sx={{
						display: 'flex',
						gap: '50px',
					}}
				>
					<Box
						sx={{
							padding: '15px',
							border: '1px solid #e0e0e0',
							borderRadius: '1rem',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								padding: '5px',
								background: '#858585',
								borderRadius: '0.3rem',
							}}
						>
							<Typography sx={{ color: '#fff' }}>
								HTTP/2
							</Typography>
							<Typography sx={{ color: '#fff' }}></Typography>
						</Box>
						<Box
							sx={{
								width: 580,
								maxHeight: 580,
								overflow: 'hidden',
								overflowY: 'auto',
							}}
						>
							{serverOneGetImageListState.imageList.map(
								(image, idx) => (
									<Box
										component='img'
										key={idx}
										src={`https://127.0.0.1:8442/image/${serverOnePostState.imageName}/${image}`}
										alt={idx}
										sx={{
											Height: 10,
											maxWidth: 580,
											margin: 0,
										}}
									/>
								)
							)}
						</Box>
					</Box>
					<Box
						sx={{
							padding: '15px',
							border: '1px solid #e0e0e0',
							borderRadius: '1rem',
						}}
					>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								padding: '5px',
								background: '#858585',
								borderRadius: '0.3rem',
							}}
						>
							<Typography sx={{ color: '#fff' }}>
								HTTP/1.1
							</Typography>
							<Typography sx={{ color: '#fff' }}></Typography>
						</Box>
						<Box
							sx={{
								width: 580,
								maxHeight: 580,
								overflow: 'hidden',
								overflowY: 'auto',
							}}
						>
							{serverOneGetImageListState.imageList.map(
								(image, idx) => (
									<Box
										component='img'
										key={idx}
										src={`http://127.0.0.1:8441/image/${serverOnePostState.imageName}/${image}`}
										alt={idx}
										sx={{
											Height: 10,
											maxWidth: 580,
										}}
									/>
								)
							)}
						</Box>
					</Box>
				</Box>
			)}
		</Fragment>
	);
}
