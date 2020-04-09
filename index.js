require("dotenv").config(); 
const server = require('./server');

const PORT = process.env.PORT || 5000;
const message = process.env.MESSAGE || "hello from the environment file";

server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})