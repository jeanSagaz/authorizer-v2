const sql = require('mssql');
const config = {
    user: 'appSemearCardAuthorizer',
    password: 'appSemearCardAuthorizer',
	server: '192.168.103.217', // You can use 'localhost\\instance' to connect to named instance
	port: 1433,
    database: 'db_finsys_pro',
};

var net = require('net');
var http = require('http');
const port = 2502;
const host = '0.0.0.0';

// Use net.createServer() in your code. This is just for illustration purpose.
// Create a new TCP server.
//const server = new net.Server();
const server = net.createServer();
//const server = http.createServer();

// The server listens to a socket for a client to make a connection request.
// Think of a socket as an end point.
server.listen(port, host, () => {
    console.log(`Server listening for connection requests on socket localhost: ${port}.`);
});

// When a client requests a connection with the server, the server creates a new
// socket dedicated to that client.
server.on('connection', async (socket) => {
	console.log('A new connection has been established.');
	
	let pool = await sql.connect(config);
	let result = await pool.request()
            .input('ctanum_deb', sql.Int, 11004967)
			.input('ctanum_cre', sql.Int, 10999779)
			.input('movval', 1)
			.input('obs_deb', 'NOME ESTABELECIMENTO')
			.input('obs_cre', 'NOME ESTABELECIMENTO')
			.input('valtolerancia', 0)
			.input('hst_cre', 828)
			.output('CodigoErro', sql.Int)
			.output('MensagemErro', sql.VarChar(255))
			.execute('CCOSTPENVMOVCARTAO');
	console.dir(result);

    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    socket.write('081002180000020000000706134619134618070600');

    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function(chunk) {
        console.log(`Data received from client: ${chunk.toString()}`);
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function() {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function(err) {
        console.log(`Error: ${err}`);
    });
});