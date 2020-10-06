const socketService = require('./socket.service')

module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        socket.on('chat topic', topic => {
            // if (socket.myTopic) {
            //     socket.leave(socket.myTopic)
            // }
            socket.join(topic)
            socket.myTopic = topic;
        })

        socket.on('chat newMsg', msg => {
            socketService.add(msg)
            io.to(socket.myTopic).emit('chat addMsg', socketService.query())
        })

        socket.on('get msgs', () => {
            io.to(socket.myTopic).emit('send msgs', socketService.query());
        })

        socket.on('notification', () => {
            io.to(socket.myTopic).emit('msg sent')
        })
        
        socket.on('typing', user => {
            socket.to(socket.myTopic).emit('user typing', user);
        })

        socket.on('reset typing', reset => {
            socket.to(socket.myTopic).emit('reset', reset);
        })

        socket.on('new reservation', data => {
            io.sockets.emit('show notification', {
                chefId: data.from.userId
            });
        });
    })
}