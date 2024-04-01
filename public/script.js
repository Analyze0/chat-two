var notifSound = new Audio('files/notification.mp3');
var bgSfx = new Audio('files/bgSfx.mp3');
var userip;
let name = "Unknown";
let lastMessage = '';
let previousName;
const messagesContainer = document.getElementById('messages');

document.body.onmousedown = function(e) {
  //bgSfx.volume = 0.1;
  //bgSfx.play();
}//play bg music

if (localStorage.getItem('name') != null) {
  name = localStorage.getItem('name');
}
const socket = io();

if(localStorage.getItem('chatLog') != null){
  document.getElementById('messages').innerHTML = localStorage.getItem('chatLog');
}

function sendMessage() {
  const messageInput = document.getElementById('message');
  lastMessage = messageInput;
  message = messageInput.value.trim();
  if (message !== '') {
    message = name + ": " + messageInput.value.trim();
    //Markdown:
    if (message.includes("###### ")) {
      message = message.replaceAll("###### ", "<h6> ");
    }
    if (message.includes("##### ")) {
      message = message.replaceAll("##### ", "<h5> ");
    }
    if (message.includes("#### ")) {
      message = message.replaceAll("#### ", "<h4> ");
    }
    if (message.includes("### ")) {
      message = message.replaceAll("### ", "<h3> ");
    }
    if (message.includes("## ")) {
      message = message.replaceAll("## ", "<h2> ");
    }
    if (message.includes("# ")) {
      message = message.replaceAll("# ", "<h1> ");
    }
    while (message.includes("**")) {
      message = message.replace("**", "<strong>");
      if (message.includes("**")) {
        message = message.replace("**", "</strong>");
      }
    }
    while (message.includes("__")) {
      message = message.replace("__", "<strong>");
      if (message.includes("__")) {
        message = message.replace("__", "</strong>");
      }
    }
    while (message.includes("*")) {
      message = message.replace("*", "<em>");
      if (message.includes("*")) {
        message = message.replace("*", "</em>");
      }
    }
    while (message.includes("_")) {
      message = message.replace("_", "<em>");
      if (message.includes("_")) {
        message = message.replace("_", "</em>");
      }
    }
    while (message.includes("img.")) {
      message = message.replace("img.", "<img src='");
      if (message.includes("..")) {
        message = message + "'>'";
      }
    }
    if(name == "Server"){
      message = "<span style='color:#4786ff'>" + message + "</span>";
    }
    if(name.includes("balls")){
      message = "<span style='color:#BBABD6'>" + message + "</span>";
    }

    message = "<div id='msgHolder'>" + message + "</div>";
    socket.emit('chat message', message);
    messageInput.value = '';
  }
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function changeName() {
  previousName = name;
  name = prompt("Enter a new name:", name);
  if (name != null) {
    localStorage.setItem("name", name);
    socket.emit('chat message', "<span style='color:#4786ff'> - " + previousName + " has changed their name to " + name + "</span>");
  }
  if(name.includes('Server')){
    if(!userip.includes('68.238.248.128')){
      localStorage.setItem("name", "Unknown")
    }
  }
}

function deleteChats() {
  localStorage.setItem('chatLog', '');
  window.location.reload();
}

socket.on('chat message', (msg) => {
  const messagesContainer = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.innerHTML = msg;
  messagesContainer.appendChild(messageElement);
  notifSound.play();
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

document.getElementById("message").onkeydown = function(e){
  localStorage.setItem('chatLog', document.getElementById('messages').innerHTML);
  if(e.key == "Enter"){
    sendMessage();
  }
  if(e.key == "ArrowUp"){
    messageInput.value = lastMessage;
  }
}