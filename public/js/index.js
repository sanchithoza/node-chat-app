var socket = io();

socket.on('connect',function(){
  console.log('connected to server');
  //socket.emit('createMessage',{
  //  from:'client',
  //  text:'test chat create from client'
  //});
});
socket.on('newMessage',function(message){
  //console.log('new Message from user',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  jQuery('#messages').append(li);
});
socket.on('newLocation',function(message){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href',message.url);
  li.append(a);
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
    jQuery('[name=message]').val('');
  });
});
var locationButton = jQuery('#send-location');
locationButton.on('click',function(){

  if(!navigator.geolocation){
    return alert('geolocation feature not available on your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending');
  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      lat:position.coords.latitude,
      lng:position.coords.longitude
    });
    locationButton.removeAttr('disabled').text('Send Location');//console.log(position);
  },function(){
    locationButton.removeAttr('disabled').text('Send Location');
    alert('unable to featch location');
  });
});
