// YOUR CODE HERE:
$(document).ready(function() {
  app.init();
});

var app = {
  link: 'https://api.parse.com/1/classes/messages?order=-createdAt',
  chatMessages: [],
  currentRoom: 'lobby'
};

app.init = function() {
  app.fetch();
  $('.username').on('click', this.handleUsernameClick());
  $('.submit').on('click', function(event) {
    event.preventDefault();
    app.handleSubmit();
    $('#message').val('');
  });
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
      app.fetch();
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.handleSubmit = function() {
  var textBox = $('#message').val();
  var username = window.location.search.split('=')[1];
  var newMessage = {
    username: username,
    text: textBox,
    roomname: app.currentRoom
  };
  app.send(newMessage);
};


app.fetch = function() {
  // setInterval(function() {
  //   $.ajax({
  //     url: app.link,
  //     type: 'GET',
  //     success: function(data) {
  //       for (var i = 0; i < data.results.length; i++) {
  //         app.chatMessages.push(data.results[i]);
  //       }
  //       app.loadFeed();
  //     }
  //   });
  // }, 2000);
  console.log('performing fetch');
  $.ajax({
    url: app.link,
    type: 'GET',
    success: function(data) {
      app.chatMessages = [];
      for (var i = 0; i < data.results.length; i++) {
        if (!data.results[i].text.includes('<script>')) {
          app.chatMessages.push(data.results[i]);
        }
      }
      console.log('last tweet - database', data.results[0]);
      console.log('last tweet - localsaved', app.chatMessages[0]);
      app.loadFeed();
    }
  });
};

app.loadFeed = function() {
  for (var i = 0; i < app.chatMessages.length; i++) {
    app.renderMessage(app.chatMessages[i]);
  }
  console.log('loaded chat messages');
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
