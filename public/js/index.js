var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
  //socket.emit('createMessage',{
  //  from:'client',
  //  text:'test chat create from client'
  //});
});
socket.on('newMessage',function(message){
  console.log('new Message from user',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});
socket.on('disconnect',function(){
  console.log('disconnectd from server');
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
      from:'Sanchit Oza',
      text:jQuery('[name=message]').val()
  },function(message){
    console.log('got it',message);
    var li = jQuery('<li></li>');
    li.text(`${message.from} : ${message.text}`);

    jQuery('#messages').append(li);
    jQuery('[name=message]').val('');
  });
});
