// Recebe a requisição, faz a lógica relacionada para ela e devolve uma resposta

const axios = require('axios') // Serviço de chamada a APIs
const Dev = require('../models/Dev')

module.exports = {
    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body
    
        // Separando a string de techs vindo do corpo da requisição para um Array
        // split(',')               -> Separando a string pela vírgula
        // map(tech => tech.trim()) -> Tirando os espaços (antes e depois)
        const techsArray = techs.split(',').map(tech => tech.trim())
    
        // Formato para cadastrar localização
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude]
        }
    
        // Buscando os dados da API do GitHub
        const responseAxios = await axios.get(`https://api.github.com/users/${github_username}`)
    
        const { name = login, avatar_url, bio } = responseAxios.data
    
        // Passando os dados para cadastro
        const dev = await Dev.create({
            name,
            github_username,
            bio,
            avatar_url,
            techs: techsArray,
            location
        })
    
        return response.json(dev)
    }
}