
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
var {generateMessage,generateLocationMessage} = require('./utils/message.js');
//console.log(__dirname+'/../public');
//console.log(publicPath);
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var port = process.env.PORT || 3000;
io.on('connection',(socket)=>{
  //console.log('new user connected');
  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('name and room name are required');
    }
      socket.join(params.room);
      users.removeUser(socket.id);
      users.addUser(socket.id,params.name,params.room);
      io.to(params.room).emit('updateUserList',users.getUserList(params.room));
      socket.emit('newMessage',generateMessage('Admin',`WelCome to Chat Room ${params.room}.`));
      socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
      callback();

  });
  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
        io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
    callback();
  });
  socket.on('createLocationMessage',(coords)=>{
    var user = users.getUser(socket.id);
    if(user){
        io.to(user.room).emit('newLocation',generateLocationMessage(user.name,coords.lat,coords.lng));
    }

  });

  socket.on('disconnect',()=>{
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('admin',`${user.name} has left`));
    }


  });
});

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: 'index.html',
  maxAge: '1d',
  redirect: true,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

app.use(express.static(publicPath, options));

//app.use('/static', express.static(path.join(__dirname, 'public')));

//app.get('/',(req,res)=>{
//  res.sendFile( `${publicPath}/index.html`);
//});
server.listen(port,()=>{
  console.log(`server up on port ${port}`);
});
