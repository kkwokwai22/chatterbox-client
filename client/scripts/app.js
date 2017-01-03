// YOUR CODE HERE:
$(document).ready(function() {
  app.init();
});


var app = {
  link: 'https://api.parse.com/1/classes/messages',
  chatMessages: []
};

app.init = function() {
  $('.username').on('click', this.handleUsernameClick());
  $('.submit').on('click', this.handleSubmit());
  app.fetch();
};


app.send = function(message) {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.link,
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

app.handleSubmit = function() {
  var textBox = $('#message').val();
  console.log(textBox);
};







app.fetch = function() {
  $.ajax({
    url: app.link,
    type: 'GET',
    success: function(data) {
      for (var i = 0; i < data.results.length; i++) {
        app.chatMessages.push(data.results[i]);
      }
      app.loadFeed();
    }
  });
};

app.loadFeed = function() {
  for (var i = 0; i < app.chatMessages.length; i++) {
    app.renderMessage(app.chatMessages[i]);
  }
};




app.clearMessages = function() {
  $('#chats').empty();
};

app.renderMessage = function(message) {
  var newMessage = document.createElement('div');
  var newUsername = document.createElement('h3');
  var newParagraph = document.createElement('p');
  newUsername.innerHTML = message.username;
  newParagraph.innerHTML = message.text;
  newMessage.append(newUsername);
  newMessage.append(newParagraph);
  $('#chats').append(newMessage);
  $('#chats h3').addClass('username');
};

app.renderRoom = function(roomName) {
  var newRoom = document.createElement('option');
  newRoom.innerHTML = roomName;
  $('#roomSelect').append(newRoom);
  $('#roomSelect option').addClass('roomname');
};



app.handleUsernameClick = function() {};





// app.fetch = function() {
//   $.ajax({
//     url: 'https://api.parse.com/1/classes/messages',
//     type: 'GET',
//     dataType: 'jsonp',
//     success: test
//   });
// };

// var test = function(json) {
//   console.log(json);
// };
