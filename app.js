var fs = require('fs');
var express = require('express');
var app = express();
var db = {};

app.get('/', function (req, res) {
	var htmlContent = [];
	for (var k in db) {
		if (db.hasOwnProperty(k)) {
			htmlContent.push('<a href="/' + k + '">' + k + '</a>');
		}
	}
	res.send(htmlContent.join('<br />'));
});

app.get('/:tableName', function (req, res) {
	var tableName = req.params.tableName;
	var data = db[tableName];
	res.json(data);
});

app.post('/login', function(req, res){
	console.log(res);
	var user=req.query.user;
	var password=req.query.password;
	var result=false;
	if (user=="test"&&password=="123qqq") {
		result=true;
	}
	res.json({"res":result});
});

function readDb() {
	var path = './db.json';
	fs.readFile(path, { encoding: 'utf8' }, function (err, data) {
		if (err) {
			console.error(err);
		}
		db = JSON.parse(data);
	});
}

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	readDb();
	var path = './db.json';

	fs.watchFile(path, function (curr, prev) {
		console.log('the current mtime is: ' + curr.mtime);
		console.log('the previous mtime was: ' + prev.mtime);
		readDb();
	});

	console.log('Example app listening at http://%s:%s', host, port);
});