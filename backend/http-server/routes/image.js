var express = require('express');
var fs = require('fs');
var multer = require('multer');
var { imageToChunks } = require('split-images');

var router = express.Router();

/* Create Folder */
const createFolder = (path) => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path, { recursive: true });
		console.log('Success Create Folder');
		return true;
	}
	console.log('Dir Already Exists');
	return false;
};

/* Image Spliter */
const makeImageToChunks = async (name, file) => {
	try {
		const chunckSize = 100;
		const chuncks = await imageToChunks(`./upload/${file}`, chunckSize);
		console.log('Number of chunks', chuncks.length);

		let i = 0;
		chuncks.forEach((curr) => {
			i++;
			fs.writeFileSync(`./upload/${name}/${i}.png`, curr);
		});
	} catch (err) {
		console.log(err);
	}
};

/* Read File List */
const readFileList = (path) => {
	const imgList = fs.readdirSync(path + '/');
	console.log('Success Reading File List');
	return imgList;
};

/* GET Image */
router.get('/:name', async (req, res) => {
	/* 
		GET /image/<string:imageName>
		-> Create imageName Folder 
		-> MakeImgToChunks 
		-> Read imageName Folder
		-> Return Image List
	*/
	try {
		const image = req.params.name;
		const imageName = image.split('.')[0];
		const dir = `./upload/${imageName}`;
		await createFolder(dir);
		await makeImageToChunks(imageName, image);
		const imageList = await readFileList(dir);
		console.log(
			imageList.sort((a, b) => {
				if (parseInt(a.split('.')[0]) < parseInt(b.split('.')[0]))
					return -1;
				if (parseInt(a.split('.')[0]) > parseInt(b.split('.')[0]))
					return 1;
				return 0;
			})
		);
		res.status(200).json({
			imageList: imageList,
			message: 'Success Reading Img List',
		});
	} catch (err) {
		console.log(err);
		res.status(400).json({
			message: err,
		});
	}
});

router.get(`/:folderName/:ImageName`, function (req, res) {
	/* 
		GET /image/<string:folderName>/<str:imageName>
		Read Splited Image
		-> Return File
	*/
	try {
		var imagePath = `/Users/isthisdanny/Desktop/22-2_sw_cap/workspace/sw-capstone/backend/http-server/upload/${
			req.params.folderName.split('.')[0]
		}/${req.params.ImageName}`;
		res.status(200).sendFile(imagePath);
	} catch (err) {
		console.log(err);
		res.status(400).json({
			message: err,
		});
	}
});

/* Image Uploader */
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'upload/');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
	fileFilter: (req, file, callback) => {
		var ext = path.extname(file, originalname);
		if (ext !== '.png' && ext !== 'jpg' && ext !== 'jpeg') {
			return callback(new Error('Please Upload Image'));
		}
	},
});

const upLoad = multer({ storage: storage });

/* POST Image */
router.post('/', upLoad.single('image'), function (req, res) {
	/* 
		POST /image
		Save ImageFile
		-> Return Message
	*/
	try {
		res.status(200).json({
			imageName: req.file.filename,
			message: 'Success Saving Image',
		});
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

/* Clean Workspace*/
const cleanWorkspace = (path) => {
	try {
		if (fs.existsSync(path)) {
			const files = fs.readdirSync(path);

			if (files.length > 0) {
				files.forEach(function (filename) {
					if (fs.statSync(path + '/' + filename).isDirectory()) {
						fs.rm(
							path + '/' + filename,
							{ recursive: true },
							(err) => {
								if (err) {
									throw new Error(err);
								}
							}
						);
					} else {
						fs.unlinkSync(path + '/' + filename);
					}
				});
				return true;
			} else {
				console.log('No files found in the directory.');
				return false;
			}
		} else {
			console.log('Directory path not found.');
			return false;
		}
	} catch (err) {
		throw new Error(err);
	}
};

router.post('/clean', async (req, res) => {
	/* 
		POST /image/clean
		Remove All Folder and Files
		-> Return Message
	*/
	try {
		const dir = './upload';
		if (cleanWorkspace(dir)) {
			res.status(200).json({
				message: 'Success Removing Folder and Files',
			});
		}
	} catch (err) {
		console.log(err);
		res.status(400).json({
			message: err,
		});
	}
});

module.exports = router;
