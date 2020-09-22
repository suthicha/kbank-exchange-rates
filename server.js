const http = require("http");
const app = require("./src/app");

/** define listener port */
const port = process.env.PORT || 4000;

/** create server to listen */
const server = http.createServer(app);
server.listen(port, () => {
    console.log("http://localhost:" + port);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message);
    console.log('UNHANDLED REJECTION! SHUTTING DOWN.')
    process.exit(1);
});