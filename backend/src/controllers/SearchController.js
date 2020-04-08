const axios = require('axios') // Serviço de chamada a APIs
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    // Buscar todos os Devs num raio de 10 KM
    // Filtrar por Tecnologias
    async index(request, response) {
        const { latitude, longitude, techs } = request.query

        const techsArray = parseStringAsArray(techs)

        // Realizando o filtro
        const devs = await Dev.find({
            techs: {
                $in: techsArray // Encontrar Devs com uma das tecs
            },
            location: {
                $near: { // Encontrar Devs perto de uma localização
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000 // Distância máxima de 10 KM
                }
            }
        })
        return response.json(devs)
    }
}