
$(document).ready(function() {
  app.init();
  $('#chats').on('click', 'h3', function(e) {
    app.handleUsernameClick(e.target.innerHTML);
  });
});

var app = {
  chatMessages: [],
  currentRoom: 'lobby',
  friendsList: [],
  link: 'https://api.parse.com/1/classes/messages?order=-createdAt',
  username: window.location.search.split('=')[1]
};

app.init = function() {
  app.fetch();
  $('.submit').on('click', function(event) {
    event.preventDefault();
    app.handleSubmit();
    $('#message').val('');
  });
};

app.send = function(message) {
  $.ajax({
    url: app.link,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      app.fetch();
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  console.log('performing fetch');
  $.ajax({
    url: app.link,
    type: 'GET',
    success: function(data) {
      app.chatMessages = [];
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].text && !data.results[i].text.includes('script') && !data.results[i].text.includes('html') && !data.results[i].text.includes('img') && !data.results[i].text.includes('$')) {
          app.chatMessages.push(data.results[i]);
        }
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
  newParagraph.setAttribute('class', message.username);
  $('#chats').append(newMessage);
};

app.renderRoom = function(roomName) {
  var newRoom = document.createElement('option');
  newRoom.innerHTML = roomName;
  $('#roomSelect').append(newRoom);
  $('#roomSelect option').addClass('roomname');
};

app.handleSubmit = function() {
  var newMessage = {
    username: app.username,
    text: $('#message').val(),
    roomname: app.currentRoom
  };
  app.send(newMessage);
};

app.handleUsernameClick = function(userClicked) {
  var checkFriendsList = false;
  for (var i = 0; i < this.friendsList.length; i++) {
    if (this.friendsList[i] === userClicked) {
      checkFriendsList = true;
    }
  }
  if (!checkFriendsList) {
    this.friendsList.push(userClicked);
    $('.' + userClicked).css('font-weight', 'bold');
    $('.' + userClicked).css('background-color', 'grey');
  }  
};


