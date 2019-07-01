const express = require('express');
const logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/api')
// This will be our application entry. We'll setup our server here.
const http = require('http');
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger('dev'));
app.use(cors());
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
message: 'Welcome to the beginning of nothingness.',
}));
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, '0.0.0.0');
module.exports = app;