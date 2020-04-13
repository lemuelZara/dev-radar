const { MONGO_USER, MONGO_PASS, MONGO_DATABASE } = require('../.env')

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const routes = require('./routes')
const { setupWebSocket } = require('./websocket')

const app = express()
const server = http.Server(app) // Servidor HTTP fora do Express

setupWebSocket(server)

// Models: representação de entidades, armazenar dentro do Banco
// Realizando a conexão com o MongoDB Atlas
mongoose.connect(
    `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-1lchw.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.use(cors()) // Libera o acesso externo
app.use(express.json()) // Entender o formato JSON
app.use(routes)

server.listen(3333) // Acessando localhost:3333