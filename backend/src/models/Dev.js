const mongoose = require('mongoose')
const PointSchema = require('./utils/PointSchema')

// Criando o formato para armazenar no Banco
// Schema: estruturação da entidade dentro do Banco de Dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: PointSchema,
        index: '2dsphere' // Suporta consultas que calculam geometrias em uma esfera semelhante à terra
    }
})

// Será salvo no banco como 'Dev'
module.exports = mongoose.model('Dev', DevSchema)