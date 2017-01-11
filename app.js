
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var karyawan = require('./routes/karyawan');
var app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');

app.set('port', process.env.PORT || 3306);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


app.use(

    connection(mysql,{

        host: 'localhost',
        user: 'root',
        password : '',
        port : 3306, //port mysql
        database:'pegawai'
    },'request')
);//route index, hello world
app.get('/', routes.index);//route customer list
app.get('/karyawan', karyawan.list);//route add karyawan, get n post
app.get('/karyawan/add', karyawan.add);
app.post('/karyawan/add', karyawan.save);//route delete karyawan
app.get('/karyawan/delete/:nik', karyawan.delete_customer);//edit karyawan route , get n post
app.get('/karyawan/edit/:nik', karyawan.edit);
app.post('/karyawan/edit/:nik',karyawan.save_edit);
app.use(app.router);
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
