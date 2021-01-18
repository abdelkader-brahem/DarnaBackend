const publishEvent = require('../Controllers/event-controller').publishEvent
const loginMember = require('../Controllers/member_controller').loginMember

module.exports = (io) => {
    io.on('connection', socket => { 
     
    socket.on('publishEvent', data => {
        console.log(data)
        socket.broadcast.emit('publishEvent',data)
        console.log(data)
        
})
})
}