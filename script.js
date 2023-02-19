const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageContainerOne = document.getElementById('message-container-1')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('what is your name?')
appendMessage('you Joined')
socket.emit('new-user',name)

socket.on('chat-message',data=>{
    appendMessage(`${data.name}:${data.message}`);
})

socket.on('user-connected',name=>{
    appendMessage(`${name} connected`);
})

socket.on('user-disconnected',name=>{
    appendMessage(`${name} disconnected`);
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessageOne(`You:${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

function appendMessageOne(message){
    const messageElement = document.createElement('div-you')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}