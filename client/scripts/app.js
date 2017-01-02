// YOUR CODE HERE:

var app = {};

app.init = function() {

};

app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function(url) {
  $.get(url, function() {

  });
};

app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  var newMessage = document.createElement('p');
  newMessage.innerHTML = message.text;
  $('#chats').append(newMessage);
};

app.renderRoom = function(roomName) {
  var newRoom = document.createElement('option');
  newRoom.innerHTML = roomName;
  $('#roomSelect').append(newRoom);
};