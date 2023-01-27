var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
<<<<<<< HEAD
    response.end("Actualizando Despliegue a ECS");
=======
    response.end("Nuevo test de Despliegue desde Jenkins Ezequiel");
>>>>>>> 3acccd13791c67c2e90b302eb22dc73b9f4cd141

});

var port = 3000;
server.listen(port);
module.exports = server
console.log("Server is available on Port:", port);
