const express = require('express')
const https = require('https')
const fs = require('fs')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./routes')

const app = express()

// mongodb+srv://dev-radar-admin:<password>@cluster0-1lchw.mongodb.net/<database>?retryWrites=true&w=majority
// dev-radar-admin
// admin
// dev_radar
// Models: representação de entidades, armazenar dentro do Banco
// Realizando a conexão com o MongoDB Atlas
mongoose.connect(
    'mongodb+srv://dev-radar-admin:admin@cluster0-1lchw.mongodb.net/dev_radar?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

app.use(cors()) // Libera o acesso externo
app.use(express.json()) // Entender o formato JSON
app.use(routes)

// Adicionando certificados para reconhecer HTTPS
const server = https.createServer({
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
    passphrase: '3941'
}, app)

server.listen(3333, '192.168.100.160') // Acessando localhost:3333
// server.listen(3333, '<IP local da sua máquina>')