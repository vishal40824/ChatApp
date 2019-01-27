var socket = io.connect(window.location.hostname);
// console.log("Hostname: " + window.location.hostname);
// console.log("Host: " + window.location.host);

var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    chatWin = document.getElementById('chat-window');
//Listen to the event from the message field and provide an action
btn.addEventListener('click', function () {
   socket.emit('chat',{
       handle: handle.value,
       message: message.value,
       scrollVal: output.clientHeight
   });
   handle.style.display = 'none';
});

//Catch the emitted event from the server
socket.on('ServerChat',function (data) {
    feedback.innerHTML = "";
    output.innerHTML += "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>"
    chatWin.scrollBy(0,data.scrollVal);
});

//Listen to the event from the message field and provide an action
message.addEventListener('keyup', function () {
   socket.emit('pressed', {
       handler:handle.value,
       scrollVal:output.clientHeight
   });
   // console.log(output.clientHeight);
});

//Catch the emitted event from the server
socket.on('typing', function (data) {
    if(data.handler == ""){
        feedback.innerHTML = "";
    }
    else{
        feedback.innerHTML = "<p><em>" + data.handler + " is typing...</em>"
        chatWin.scrollBy(0, data.scrollVal);
    }
});