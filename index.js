var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require('multer') // Import multer for files
const upload = multer({ storage: multer.memoryStorage() })

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Extract file properties
  const { originalname: name, mimetype: type, size } = req.file;

  res.json({ name, type, size });
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
