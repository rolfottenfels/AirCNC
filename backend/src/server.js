const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id);
});

mongoose.connect('mongodb+srv://omnistack9:omnistack9@cluster0.fhilo.gcp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// GET, POST, PUT, DELETE

// req.query = para acessar query params (parâmetros das rotas GET)
// req.params = para acessar route params (parâmetros para editar e deletar, rotas PUT e DELETE)
// req.body = acessar corpo da requisição para criação ou edição de regsitros

app.use(cors()); //Qualquer aplicação acessa a API
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);
