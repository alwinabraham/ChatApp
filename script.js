const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('what is your name?')
appendUser('you Joined')
socket.emit('new-user',name)

socket.on('chat-message',data=>{
    appendName(data)
    appendMessage(data);
})

socket.on('user-connected',name=>{
    appendUser(`${name} connected`);
})

socket.on('user-disconnected',name=>{
    appendUser(`${name} disconnected`);
})

messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    const message = messageInput.value
    appendMessageOne(`${message}`)
    socket.emit('send-chat-message',message)
    messageInput.value = ''
})

function appendMessage(data){
    const messageElement = document.createElement('div')
    messageElement.innerText = data.message
    messageContainer.append(messageElement)
}

function appendName(data){
    const messageElement = document.createElement('div-name')
    messageElement.innerText = data.name
    messageContainer.append(messageElement)
}

function appendMessageOne(message){
    const messageElement = document.createElement('div-you')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}

function appendUser(message){
    const messageElement = document.createElement('div-user')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}