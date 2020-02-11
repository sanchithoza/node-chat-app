
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const publicPath = path.join(__dirname,'../public');
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

  socket.on('createMessage',(message)=>{
    console.log('new message from client',message);
    io.emit('newMessage',{
      from:message.form,
      text:message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect',()=>{
    console.log('user was disconnected');
  });
});
app.use(express.static('publicPath'));

app.get('/',(req,res)=>{
  res.sendFile( `${publicPath}/index.html`);
});
server.listen(port,()=>{
  console.log(`server up on port ${port}`);
});
