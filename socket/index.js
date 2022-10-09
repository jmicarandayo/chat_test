import { Server } from 'socket.io';

const io = new Server(8900, {
    cors: {
        origin: 'http://localhost:3001',
    }
  });

  let users = [];
  
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  };

  const filterNull = () => {
    users = users.filter(user => user.userId !== null)
  };

  const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
  };

  const getUser = (userId) => {
    return users.find(user => user.userId === userId)
  }
  io.on('connection', (socket) => {
    // user connected
    console.log('a user connected.')

    // take userId and socketId from user
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        filterNull()
        io.emit('getUsers', users)
    });

    // send  and get message
    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        console.log(senderId, receiverId, text)
        
        const user = getUser(receiverId);
        console.log(user)
        io.to(user.socketId).emit('getMessage', {
            senderId,
            text
        });
    });
    console.log(users)
    // user disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        removeUser(socket.id)
        io.emit('getUsers', users);
    })
  })