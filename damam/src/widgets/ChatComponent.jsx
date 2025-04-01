import React, { useState, useRef, useEffect } from "react";


const mockConversations = [
  {
    id: 1,
    name: "Dany Mckeny",
    avatar: "https://via.placeholder.com/50",
    lastMessage: "Bonjour, j'ai un souci",
    time: "12m",
    status: "Signal de Litiges",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://via.placeholder.com/50",
    lastMessage: "Merci pour votre aide",
    time: "15m",
    status: "Discussion",
  },
];

const mockMessages = {
  1: [
    { id: 1, isSender: true, content: "Je vais bien", fileUrl: null },
    { id: 2, isSender: false, content: "Je rencontre ce souci grave", fileUrl: null },
    { id: 3, isSender: false, content: null, fileUrl: "https://via.placeholder.com/200" },
    { id: 4, isSender: true, content: "Nous avons pris votre demande en considération", fileUrl: null },
  ],
  2: [
    { id: 1, isSender: false, content: "Merci pour votre aide", fileUrl: null },
  ],
};

const ChatComponent = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages[selectedConversation] || []);
    }
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (currentMessage.trim() !== "" || fileInputRef.current?.files[0]) {
      const newMessage = {
        id: Date.now(),
        isSender: true,
        content: currentMessage,
        fileUrl: fileInputRef.current?.files[0]
          ? URL.createObjectURL(fileInputRef.current.files[0])
          : null,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setCurrentMessage("");
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteConversation = (conversationId) => {
    setConversations((prev) =>
      prev.filter((conv) => conv.id !== conversationId)
    );
    if (conversationId === selectedConversation) {
      setSelectedConversation(null);
      setMessages([]);
    }
  };

  return (
    <div className="chat-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 className="sidebar-header">
          Messages <span className="message-count">12</span>
        </h3>
        <input
          type="text"
          placeholder="Search messages"
          className="search-bar"
        />
        <div className="conversations">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation ${
                selectedConversation === conv.id ? "active" : ""
              }`}
              onClick={() => setSelectedConversation(conv.id)}
            >
              <img src={conv.avatar} alt="Avatar" className="avatar" />
              <div className="conversation-details">
                <p className="conversation-name">{conv.name}</p>
                <p className="conversation-preview">{conv.lastMessage}</p>
              </div>
              <div className="conversation-meta">
                <span className="time">{conv.time}</span>
                <span
                  className={`status-badge ${
                    conv.status === "Signal de Litiges"
                      ? "status-litiges"
                      : "status-discussion"
                  }`}
                >
                  {conv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chatbox */}
      <div className="chatbox">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              <h3>{conversations.find((conv) => conv.id === selectedConversation)?.name}</h3>
              <span className="status online">Online</span>
            </div>
            <div className="messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.isSender ? "sent" : "received"
                  }`}
                >
                  {msg.fileUrl && (
                    <img
                      src={msg.fileUrl}
                      alt="Attachment"
                      className="message-image"
                    />
                  )}
                  {msg.content && <p>{msg.content}</p>}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <button onClick={() => fileInputRef.current.click()}>
                +
              </button>
              <input
                type="text"
                placeholder="Type a message"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>
                <span role="img" aria-label="Send">
                  🚀
                </span>
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat">
            <p>Select a conversation to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
