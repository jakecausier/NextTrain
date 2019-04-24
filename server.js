const express 			= require('express');
var request 				= require('request');
var path 						= require('path');
var bodyParser 			= require('body-parser')

const app 					= express()
const publicFolder 	= 'public'
const port 					= 3000

var urlencodedParser = bodyParser.urlencoded({extended: true})

app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res) {
	console.log(`Sending to client...`);
  res.sendFile(path.join(__dirname, publicFolder, 'index.html'));
});

app.post('/search', urlencodedParser, function(req, res) {
	console.log(`Searching from ${req.body.from} to ${req.body.to}...`);

	request(`https://huxley.apphb.com/next/${req.body.from}/from/${req.body.to}/1?accessToken=DA1C7740-9DA0-11E4-80E6-A920340000B1&expand=true`, function(error, response, data) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

	  if (error) {
		  res.status(404).send('Error thrown')
		}

		var data = JSON.parse(data);

		res.status(200).json({
	  	data: data
	  })
	});
});

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});