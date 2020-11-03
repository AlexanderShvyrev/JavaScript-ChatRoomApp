//DOM queries
const chatList = document.querySelector('.chat-list')
const newChatForm = document.querySelector('.new-chat')
const nameForm = document.querySelector('.new-name')
const updateMessage = document.querySelector('.update-mssg')
const rooms = document.querySelector('.chat-rooms')

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = newChatForm.message.value.trim()
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err))
})
//update username
nameForm.addEventListener('submit', e => {
    e.preventDefault()
    //update name via the chatroom class
    const name = nameForm.name.value.trim()
    chatroom.updateName(name)
    //reset the form
    nameForm.reset()
    //show then hide the success message
    updateMessage.textContent = `Your name was updated to ${name}`
    setTimeout(() => updateMessage.textContent = '', 3000)
})

//update the chat room
rooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatUI.clear()
        chatroom.updateRoom(e.target.getAttribute('id'))
        chatroom.getChats(chat => chatUI.render(chat))
    }
})



//check localStorage for a name
const username = localStorage.username ? localStorage.username : 'anonymous'

//class instances
const chatUI = new ChatUI(chatList)
const chatroom = new Chatroom('general', username)


//get chats and render
chatroom.getChats((data) => chatUI.render(data))