 // JavaScript for frontend logic
 function appendMessage(message, sender) {
    const chatContainer = document.getElementById('chatContainer');
    const messageElement = document.createElement('p');
    messageElement.className = `my-custom-class ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
}

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    appendMessage(userInput, 'user');

    // Send user message to the backend
    fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        const botReply = data.botReply;
        appendMessage(botReply, 'bot');
    })
    .catch(error => console.error('Error:', error));

    document.getElementById('userInput').value = '';
}

// Function to toggle the display of the chat input
function toggleChatInput() {
    const chatInput = document.getElementById('chatInput');
    chatInput.style.display = chatInput.style.display === 'none' ? 'block' : 'none';

    // Auto-scroll the chat container to the bottom when input is displayed
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}