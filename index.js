// code away!
const server = require('./server');

const PORT = 8000;

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})