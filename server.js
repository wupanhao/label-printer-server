var express = require('express');
var mysql = require('mysql');
var fs = require('fs')
var lp = require('./print-lib');
// module.exports = {
//     qr_with_text:qr_with_text,
//     qr_x4:qr_x4,
//     all_text:all_text,
//     poems:poems,
//     lyric:lyric
// }

var config = JSON.parse(fs.readFileSync('config.json'))

var db = mysql.createConnection(config.mysql);

db.connect();


function handle(error, results) {
	var r = "";
  	if (error){ 
  		console.log(error);
  		// throw error;
  		r = JSON.stringify({status:"error",error_msg:error.sqlMessage});
  		}
  	else{
  		console.log(results);
		r = JSON.stringify({status:"OK",print_id:results.insertId});
		}
	return r;
  	}


var app = express();

var res = "";

function qr_with_text(req,res){
	var value = req.query.value;
	var text = req.query.text;
	var comment = req.query.comment;
	if(value && text){
		r = JSON.stringify(lp.qr_with_text(value,text));
		console.log(r);
		q = "insert into print_task(data,comment) values (?,?)";
		db.query(q,[r,comment], function(error, results, fields){
			res.send(handle(error,results));
		});

	}
	else
		res.send(JSON.stringify({error:'no enough arguments'}));
}

function qr_x4(req,res){
	var value = req.query.value;
	var text = req.query.text;
	var comment = req.query.comment;
	if(value && text){
		r = JSON.stringify(lp.qr_x4(value,text));
		console.log(r);
		q = "insert into print_task(data,comment) values (?,?)";
		db.query(q,[r,comment], function(error, results, fields){
			res.send(handle(error,results));
		});
	}
	else
		res.send(JSON.stringify({error:'no enough arguments'}));
}

function all_text(req,res){
	var text = req.query.text;
	var comment = req.query.comment;
	if(text){
		r = JSON.stringify(lp.all_text(text));
		console.log(r);
		q = "insert into print_task(data,comment) values (?,?)";
		db.query(q,[r,comment], function(error, results, fields){
			res.send(handle(error,results));
		});
	}
	else
		res.send(JSON.stringify({error:'no enough arguments'}));
}

function poems(req,res){
	var title = req.query.title;
	var content = req.query.content;
	var comment = req.query.comment;
	if(content && title){
		r = JSON.stringify(lp.poems(title,content));
		console.log(r);
		q = "insert into print_task(data,comment) values (?,?)";
		db.query(q,[r,comment], function(error, results, fields){
			res.send(handle(error,results));
		});
	}
	else
		res.send(JSON.stringify({error:'no enough arguments'}));
}

function lyric(req,res){
	var title = req.query.title;
	var first_half = req.query.first;
	var second_half = req.query.second;
	var comment = req.query.comment;
	if(first_half && second_half){
		r = JSON.stringify(lp.lyric(title,first_half,second_half));
		console.log(r);
		q = "insert into print_task(data,comment) values (?,?)";
		db.query(q,[r,comment], function(error, results, fields){
			res.send(handle(error,results));
		});
	}
	else
		res.send(JSON.stringify({error:'no enough arguments'}));
}

app.use('/static', express.static('public'));

app.get('/test',function(req,res){
	res.send('test');
});


app.get('/qr_with_text',qr_with_text);
app.get('/qr_x4',qr_x4);
app.get('/all_text',all_text);
app.get('/poems',poems);
app.get('/lyric',lyric);

app.get('/', function (req, res) {
   res.send('Hello World');
})

app.get('/print',function(req,res){
	 // res.sendfile('./public/index.html');
	 res.redirect('/static/index.html');
});

var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
