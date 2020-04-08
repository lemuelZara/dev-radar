const mongoose = require('mongoose')

// Criando o formato para armazenar no Banco
// Schema: estruturação da entidade dentro do Banco de Dados
const DevSchema = new mongoose.Schema({
    name: String,
    github_username: String,
    bio: String,
    avatar_url: String,
    techs: [String]
})

// Será salvo no banco como 'Dev'
module.exports = mongoose.model('Dev', DevSchema)