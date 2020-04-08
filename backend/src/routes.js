const { Router } = require('express') // Módulo de roteamento
const axios = require('axios') // Serviço de chamada a APIs
const Dev = require('./models/Dev')

const routes = Router()

// request  : Requisição vinda de uma rota (front-end)
// response : Resposta devolvida para uma rota

/**
 * GET    -> Buscando uma informação (Listar usuários)
 * POST   -> Criar alguma informação (Cadastrar usuários)
 * PUT    -> Editar uma informação (Editar usuário)
 * DELETE -> Deletar uma informação (Remover usuário)
 */

/**
 * Tipos de parâmetros:
 * Query params : request.query (Filtros, paginação, ordenação, ...)
 *     -> http://localhost:3333/user/?nome=lemuel
 * 
 * Route params : request.params (Identificar na alteração ou remoção)
 *     -> http://localhost:3333/user/1
 * 
 * Body         : request.body (Dados para criação ou alteração de um registro)
 *     -> http://localhost:333/user/
 *     -> Obs: não irá aparecer na URL
 */

// Rota de acesso: GET
routes.get('/', (request, response) => {
    return response.json({
        message: 'Welcome OmniStack 10.0 ! :)'
    })
})

// Rota de cadastro dos Devs
routes.post('/devs', async (request, response) => {
    const { github_username, techs } = request.body

    // Separando a string de techs vindo do corpo da requisição para um Array
    // split(',')               -> Separando a string pela vírgula
    // map(tech => tech.trim()) -> Tirando os espaços (antes e depois)
    const techsArray = techs.split(',').map(tech => tech.trim())

    // Buscando os dados da API do GitHub
    const responseAxios = await axios.get(`https://api.github.com/users/${github_username}`)

    const { name = login, avatar_url, bio } = responseAxios.data

    // Passando os dados para cadastro
    const dev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: techsArray
    })

    return response.json(dev)
})

module.exports = routes