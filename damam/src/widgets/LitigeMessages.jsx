import React, { useState, useEffect, useCallback } from "react";
import "../styles/index.css";
import io from "socket.io-client";
import doc from "../assets/icons/doc.svg";
import send from "../assets/icons/send.svg";
import { getMessages } from "../modules/getMessages";
import { getListMessages } from "../modules/getListMessages";

const LitigeMessages = ({ Token, }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);

  const socket = io("http://46.202.130.175:3000");

  const token = JSON.parse(localStorage.getItem("token"));


  const userId= 6

  // Récupération des conversations
  const fetchConversations = async () => {
    try {
      const response = await getListMessages(token);
      console.log(response)
      if (response && Array.isArray(response)) {
        const formattedConversations = response.map((item) => ({
          id: item.user_id,
          name: item.name,
          avatar: item.photo,
          lastMessage: item.last_message || "Pas de message",
          time: new Date(item.last_message_date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }));
        setConversations(formattedConversations);
        setFilteredConversations(formattedConversations);
        console.log(conversations)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des conversations :", error);
    }
  };

  useEffect(() => {
    fetchConversations();
    
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("receive_message", (message) => {
      if (message.conversationId === selectedConversation?.id) {
        setMessages((prev) => [...prev, message]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, selectedConversation]);

  const fetchMessages = async (conversationId) => {
    try {
      const data = { user_id: conversationId };
      const response = await getMessages(data,token);

      console.log(data)
      console.log(response)

      if (response && Array.isArray(response)) {
        const formattedMessages = response.map((message) => ({
        
          id: message.id,
          content: message.message || "",
          sender: message.sender_id === userId ? "Me" : message.sender_id,
          avatar:
            message.sender_id === userId
              ? "https://via.placeholder.com/40"
              : selectedConversation?.avatar,
          time: new Date(message.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date(message.created_at).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
          image: message.piece_jointe ? `${message.piece_jointe}` : null,
        }));
        console.log(formattedMessages)
        setMessages(formattedMessages);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = message.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  console.log(groupedMessages)

  console.log(messages)

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = conversations.filter(
      (conv) =>
        conv.name.toLowerCase().includes(query) ||
        conv.lastMessage.toLowerCase().includes(query)
    );
    setFilteredConversations(filtered);
  };

  // Fonction pour envoyer un message au backend
  const sendMessageToBackend = async (message) => {

    console.log(selectedConversation.id)
    console.log(message.content)
    
    try {
      const formData = new FormData();
      formData.append("user_id", selectedConversation.id);
      // formData.append("receiver_id", selectedConversation.id); // Utiliser l'ID de la conversation comme receiver_id
      formData.append("message", message.content);

      if (message.image) {
        const file = {
          uri: message.image,
          name: `image_${Date.now()}.jpg`,
          type: "image/jpeg",
        };
        formData.append("piece_jointe", file);
      }

  

      const response = await fetch(`http://46.202.130.175:3000/send_message_to_admins`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      // console.log(userId)

      const data = await response.json();
      console.log("Message envoyé au backend :", data);
    } catch (error) {
      console.error("Erreur lors de l'envoi au backend :", error);
      alert("Erreur : Impossible d'envoyer le message.");
    }
  };

  const onSend = useCallback(
    (newMessages = []) => {
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);

      const messageToSend = newMessages[0];
      sendMessageToBackend(messageToSend);

      if (socket) {
        socket.emit("message", messageToSend);
      } else {
        console.warn("Socket non initialisé");
      }
    },
    [socket, selectedConversation]
  );

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: Date.now(),
      content: messageInput,
      sender: "Me",
      avatar: "https://via.placeholder.com/40",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      conversationId: selectedConversation.id,
    };

    onSend([newMessage]);
    setMessageInput("");
  };

  const handleSelectConversation = (conversation) => {
  console.log(conversation)
    setSelectedConversation(conversation);
    setMessages([]);
    fetchMessages(conversation.id);
  };

  const handleAttachFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMessage = {
        id: Date.now(),
        content: null,
        image: URL.createObjectURL(file),
        sender: "Me",
        avatar: "https://via.placeholder.com/40",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date().toLocaleDateString("fr-FR", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        conversationId: selectedConversation.id,
      };

      onSend([newMessage]);
    }
  };

  return (
    <div className="litige-container">
      <div className="litige-sidebar">
        <div className="litige-header">
          <span>Messages</span>
          <span className="litige-messages-number">
            {filteredConversations.length}
          </span>
        </div>
        <div className="litige-search">
          <input
            type="text"
            placeholder="Rechercher"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="litige-chat-list">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`litige-chat-item ${
                selectedConversation?.id === conv.id ? "active" : ""
              }`}
              onClick={() => handleSelectConversation(conv)}
            >
              <div className="litige-avatar">
                <img src={conv.avatar} alt={conv.name} />
              </div>
              <div className="litige-chat-info">
                <div className="litige-name-time">
                  <span className="litige-name">{conv.name}</span>
                  <span className="litige-time">{conv.time}</span>
                </div>
                <span className="litige-last-message ellipsis">
                  {conv.lastMessage}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="litige-chat">
        <div className="litige-chat-header">
          <div className="litige-header-content">
            <img
              src={selectedConversation?.avatar}
              alt={selectedConversation?.name}
              className="litige-header-avatar"
            />
            <h3>{selectedConversation?.name || "Conversation"}</h3>
          </div>
        </div>
        <div className="litige-chat-content">
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              <div className="litige-message-date">{date}</div>
              {groupedMessages[date].map((msg, index) => (
                <div
                  key={msg.id}
                  className={`litige-message ${
                    msg.sender === "Me" ? "sent" : "received"
                  }`}
                >
                  <div className="litige-message-bubble">
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt="Attachment"
                        className="litige-message-image"
                      />
                    )}
                    {msg.content && <p>{msg.content}</p>}
                    <span className="litige-message-time">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="litige-chat-input">
          <label htmlFor="file-upload" className="custom-file-upload">
            <img src={doc} alt="Attachment" />
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleAttachFile}
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="Tapez un message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button onClick={handleSendMessage} className="btt-message">
            <img src={send} alt="Envoyer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LitigeMessages;
