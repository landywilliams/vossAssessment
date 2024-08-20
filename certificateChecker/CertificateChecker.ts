const tls = require('tls');

console.log ("Attempting CERT Validation : www.ultimateqa.com");
const socket = tls.connect({
	host: 'www.ultimateqa.com',
	port: 443,
	servername: 'www.ultimateqa.com'
}, () => {
		const peerCertificate = socket.getPeerCertificate();

		console.log("Cert Valid From: "+ peerCertificate.valid_from)
		console.log("Cert Valid to: " + peerCertificate.valid_to);

		//Print out full Certificate Details
		//console.log(peerCertificate);
		socket.destroy();
});


socket.on('error', err => {
		console.log('Error: ' + err.message);
});
