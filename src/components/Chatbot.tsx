// src/components/Chatbot.tsx

import { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';
import '../app/globals.css';  // Move up one directory, then down into /app

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<{ user: string, bot: string }[]>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    // Add user's message to chat
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { user: userMessage, bot: "..." }, // Temporarily show "..." while awaiting response
    ]);

    try {
      console.log('Sending message:', userMessage); // Log the message being sent

      // Send message to the backend (API route)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      console.log('Response status:', response.status); // Log the status of the response
      const responseText = await response.text();
      console.log('Response text:', responseText); // Log the response text

      if (!response.ok) {
        throw new Error(`Network response was not ok. Status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log('Response data:', data); // Log the response data

      // Add bot's response to chat
      setChatMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the last user's message placeholder
        { user: userMessage, bot: data.response || "No response from bot" },
      ]);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      setChatMessages((prevMessages) => [
        ...prevMessages.slice(0, -1), // Remove the last user's message placeholder
        { user: userMessage, bot: "Error: Unable to get response from bot" },
      ]);
    }

    // Clear user input field
    setUserMessage('');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <div className={`chatbot ${isChatOpen ? 'chatbot-open' : ''}`}>
      {!isChatOpen && (
        <button className="chatbot-icon" onClick={toggleChat}>
          <FaComments />
        </button>
      )}
      {isChatOpen && (
        <div className="chatbox">
          <button className="close-icon" onClick={toggleChat}>
            <FaTimes />
          </button>
          <div className="messages">
            {chatMessages.map((message, index) => (
              <div key={index} className="chat-message">
                <div className="user-message"><strong>You:</strong> {message.user}</div>
                <div className="bot-message"><strong>Bot:</strong> {message.bot}</div>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userMessage}
              onChange={handleInputChange}
              placeholder="Ask me anything..."
              className="chat-input"
            />
            <button onClick={handleSendMessage} className="send-button">Send</button>
          </div>
        </div>
      )}
    </div>
);
};

export default Chatbot;