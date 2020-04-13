const socketio = require('socket.io')
const parseStringAsArray = require('./utils/parseStringAsArray')
const calculateDistance = require('./utils/calculateDistance')

let io

// Salvando as conexões na memória do Node.js
const connections = []

exports.setupWebSocket = (server) => {
    // Toda vez que um usuário se conectar na aplicação via WebSocket, irei receber
    // objeto 'socket' para tratar as requisições
    io = socketio(server)

    // Fica ouvindo as requisições...
    io.on('connection', socket => {
        // socket.handshake.query = informações vindas do connect() da aplicação mobile
        const { latitude, longitude, techs } = socket.handshake.query

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(techs)
        })
    })
}

exports.findConnections = (coords, techs) => {
    // Realizando o filtro entre o novo Dev cadastrado e as novas conexões vindas do WebSocket
    // some() = retorna true se pelo menos uma condição for verdadeira
    return connections.filter(connection => {
        return calculateDistance(coords, connection.coordinates) < 10
            && connection.techs.some(tech => techs.includes(tech))
    })
}

// to      : para quem vamos enviar a mensagem
// message : tipo da mensagem
// data    : valor 

// socket.emit('message', 'Welcome OmniStack')
exports.sendMessage = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    })
}