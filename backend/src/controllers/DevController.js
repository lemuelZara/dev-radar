const axios = require('axios') // Serviço de chamada a APIs
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

/**
 * Recebe a requisição, faz a lógica relacionada para ela e devolve uma resposta
 * INDEX   : Mostrar uma lista de Devs
 * SHOW    : Mostrar um único Dev
 * STORE   : Cadastrar um Dev
 * UPDATE  : Alterar um Dev
 * DESTROY : Deletar um Dev
 */

module.exports = {
    async index(request, response) {
        const devs = await Dev.find()

        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        // Procuro no Banco de Dados se já existe alguém com o mesmo github_username
        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            // Separando a string de techs vindo do corpo da requisição para um Array
            const techsArray = parseStringAsArray(techs)

            // Formato para cadastrar localização
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            // Buscando os dados da API do GitHub
            const responseAxios = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = responseAxios.data

            // Passando os dados para cadastro
            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location
            })
        }

        return response.json(dev)
    }
}