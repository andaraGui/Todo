const express = require('express');
const TaskController = require('./controller/TaskController');


const server = express();
server.use(express.json());

const TaskRoutes = require('./routes/TaskRoutes');

server.use('/', TaskController.create);


server.listen(3000, () => {
    console.log('API ONLINE');
})

