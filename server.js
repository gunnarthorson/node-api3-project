const express = require('express');
const userRouter = require('./users/userRouter');
const server = express();

server.use(express.json());
server.use('/api/users', userRouter);


server.get('/', logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(logger);

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} Request to ${req.originalUrl}`);

  next();
}



module.exports = server;
