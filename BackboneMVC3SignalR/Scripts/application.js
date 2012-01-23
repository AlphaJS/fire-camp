// SignalR Proxy created on the fly
var chat = $.connection.chat;

var Message = Backbone.Model.extend({});

var MessageStore = Backbone.Collection.extend({
 model: Message,
   url: '/messages'
});
var messages = new MessageStore;

var MessageView = Backbone.View.extend({

   events: { "submit #chatForm" : "handleNewMessage" }

  , handleNewMessage: function(data) {
    var inputField = $('input[name=newMessageString]');
    messages.create({ content: inputField.val() });
     
    //signalr call to server
    chat.send("dummy message, just signaling")
            .done(function () {
                console.log('Success!')
            })
            .fail(function (e) {
                console.warn(e);
            })
    inputField.val('');
  }

  , render: function() {
    var data = messages.map(function(message) { return message.get('content') + '\n'});
    var result = data.reduce(function(memo,str) { return memo + str }, '');
    $("#chatHistory").text(result);
    return this;
  }

});

messages.bind('add', function(message) {
  messages.fetch({success: function(){view.render();}});
});

var view = new MessageView({el: $('#chatArea')});

//setInterval(function(){
//  messages.fetch({success: function(){view.render();}});
//},10000)



// Declare a function on the chat hub so the server can invoke it
chat.reloadMessages = function (message) {
    //server callback, reload messages from server via backbone!
    messages.fetch({ success: function () { view.render(); } });
};

// Start the connection
$.connection.hub.start();

//get any message on load
messages.fetch({ success: function () { view.render(); } });
