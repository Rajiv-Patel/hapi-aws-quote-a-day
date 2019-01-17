var Hapi = require('hapi');//required hapi
var server = new Hapi.Server();//create server using constructor (new)  
server.connection({ host:'localhost', port: 3000 });//create host and port

server.route({//specify route
    method: 'GET',
    path: '/',
    handler: function (request, response) {//callback fucntion 
        response('Hellow World!');
       }
});

server.start( function(){//start the sever 
     console.log('Catch the action at : '+server.info.uri);
});
