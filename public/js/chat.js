var socket = io();
function scroolToBottom(){
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  //console.log(clientHeight,scrollTop,scrollHeight);
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}
socket.on('connect',function(){
  //console.log('connected to server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('no error');
    }
  });
});
socket.on('newMessage',function(message){
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    text: message.text,
    createdAt: formatedTime
  });
  jQuery('#messages').append(html);
  scroolToBottom();
});
socket.on('newLocation',function(message){
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });
  jQuery('#messages').append(html);
  scroolToBottom();
});
socket.on('disconnect',function(){
  console.log('disconnectd from server');
});
socket.on('updateUserList',function(users){
  var ol =jQuery('<ol></ol>');
  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user))
    jQuery('#user').html(ol);
  });
});
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
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
