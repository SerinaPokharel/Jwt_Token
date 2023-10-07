const http = require('http'); // Importing Node's http module
const app = require('./app'); // The express app we just created
const server = http.createServer(app);// Creating a server with the http module, passing in our express app as the listener

const { PORT } = process.env;// Getting the port from the environment variables

server.listen(PORT, () => { // Starting the server
    console.log(`Server is listening on port ${PORT}`);// Logging the port
});// End of server.listen