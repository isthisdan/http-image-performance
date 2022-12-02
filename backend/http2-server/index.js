const spdy = require('spdy');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

const options = {
	key: fs.readFileSync('./server.key'),
	cert: fs.readFileSync('./server.crt'),
	passphrase: '1234',
};

const app = express();

app.use(express.static('images'));
app.use(cors());

app.get('/image/:folderName/:ImageName', (req, res) => {
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

const port = 8442;
spdy.createServer(options, app).listen(port, () => {
	console.log(`App started listening on PORT ${port}`);
});
