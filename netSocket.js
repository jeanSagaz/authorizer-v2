var net = require('net-socket');
 
var socket = net.connect(2502, '192.168.0.6');
 
socket.setEncoding('utf8');
socket.on('connect', function () {
    // connected
    
    socket.end('081002180000020000000706134619134618070600');
    socket.destroy();
});