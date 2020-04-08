const { Router } = require('express') // Módulo de roteamento
const DevController = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')
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


routes.get('/devs', DevController.index)    // Rota de listagem dos Devs
routes.post('/devs', DevController.store)   // Rota de cadastro dos Devs

routes.get('/search', SearchController.index)

module.exports = routes