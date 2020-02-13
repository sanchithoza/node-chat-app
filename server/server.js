
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');

var {generateMessage} = require('./utils/message.js');
//console.log(__dirname+'/../public');
//console.log(publicPath);
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var port = process.env.PORT || 3000;
io.on('connection',(socket)=>{
  console.log('new user connected');
  //socket.emit('newMessage',{
  //  from:'sanchit',
  //  text:'test chat emit from server',
  //  createdAt:new Date()
  //});
  socket.emit('newMessage',generateMessage('Admin','Welcome to Chat App'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User added to chat app'));
  socket.on('createMessage',(message,callback)=>{
    console.log('new message from client',message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('this is string');
  });

  socket.on('disconnect',()=>{
    console.log('user was disconnected');
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
