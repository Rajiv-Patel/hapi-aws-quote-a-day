var Hapi = require('hapi');//Required Hapi
var mysql= require('mysql');//need mysql package

var connection = mysql.createConnection({ //connect string for mysql,
//.createconnection function available on top of mysql which required, it creates connection and 
//gives us var connection object, it will connect to data when we use .connection as below 
//it holds all the data to connect to RDS (Relational data servcies)
  //host     : 'YOUR_MYSQL_DATABASE_ENDPOINT',
  host     : 'rajiv-db-inst.cpeulhbj4qol.us-east-2.rds.amazonaws.com',
  //user     : 'YOUR_USERNAME',
  user     : 'rajiv',
  //password : 'YOUR_PASSWORD',
  password : 'rajiv123',
  //port     : '3306',
  port     : '3306',
  //database : 'YOUR_MYSQL_DATABSE_NAME'
  database : 'rajiv'
});

var server = new Hapi.Server();//instacne of hapi server 
server.connection({ port: process.env.PORT || 8080 });
connection.connect();//connect to RDS services (Amazon)

server.register(require('inert'));//registration of npm inert package
server.register(require('vision'),function(err){ //npm vision package and its funciton below

//vision call back function start 
    if(err){
      throw err;
    }

//settign up route
server.route({
    method: 'GET',
    path: '/',//index
    handler: function (request, reply) {
       connection.query('SELECT quote,credit from quotes order by rand() limit 1', function(err, rows, fields) {
       if (err) throw err;
       reply.view('index',{quote:rows[0].quote,credit:rows[0].credit});//rander view in templates folder
       });
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',//any number of param due to *
    handler: {
        directory: {
            path: 'public' //serve by public folder as static serve 
        }
    }
});


server.views({
     engines: {
         html: require('handlebars')//config to use along with vision + handlebars 
     },
     relativeTo: __dirname,
     path: 'templates'//folder 
 });


});
//vision call back function End 

server.start( function(){
     console.log('Catch the action at : '+server.info.uri);
});
