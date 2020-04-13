import socketio from 'socket.io-client'

const socket = socketio('http://192.168.100.160:3333', {
    autoConnect: false
})

export const subscribeToNewDevs = (subscribeFunction) => {
    socket.on('new-dev', subscribeFunction)
}

export const connect = (latitude, longitude, techs) => {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs
    }

    socket.connect()

    // Recebendo a mensagem vinda do back-end
    socket.on('message', text => {
        console.log(text)
    })
}

export const disconnect = () => {
    if (socket.connected) {
        socket.disconnect()
    }
}