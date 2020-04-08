const express = require('express')
const mongoose = require('mongoose')
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
        useUnifiedTopology: true
    }
)

app.use(express.json()) // Entender o formato JSON

app.use(routes)

// Acessando localhost:3333
app.listen(3333)