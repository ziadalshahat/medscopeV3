import React, { useState, useRef, useEffect } from 'react';
import '../styles/SmartAssistant.css';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';

const SmartAssistant = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'assistant',
            text: "Hello! I'm your MedScope Smart Assistant. How can I help you today? You can ask me about your symptoms, appointment scheduling, or medical queries.",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        
        if (!inputValue.trim()) return;

        // 1. Add User Message
        const newUserMsg = {
            id: Date.now(),
            sender: 'user',
            text: inputValue.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');
        setIsTyping(true);

        // 2. Simulate AI Response Delay
        setTimeout(() => {
            const aiResponse = {
                id: Date.now() + 1,
                sender: 'assistant',
                text: "I understand. I'm a simulated assistant right now, but in a real environment, I would analyze your symptoms and suggest the appropriate specialty to book an appointment with.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="smart-assistant-container">
            {/* Optional Internal Header */}
            <div className="chat-header">
                <div className="assistant-avatar">
                    <SparklesIcon />
                </div>
                <div className="assistant-info">
                    <h3>MedScope AI</h3>
                    <p>Always online</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
                        {msg.sender === 'assistant' && (
                            <div className="message-avatar">
                                <SparklesIcon />
                            </div>
                        )}
                        <div className="message-content">
                            <div className="message-bubble">
                                {msg.text}
                            </div>
                            <div className="message-time">{msg.time}</div>
                        </div>
                    </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                    <div className="message-wrapper assistant">
                        <div className="message-avatar">
                            <SparklesIcon />
                        </div>
                        <div className="message-content">
                            <div className="message-bubble" style={{ padding: '16px 20px' }}>
                                <div className="typing-indicator">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Hidden div to auto-scroll to */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="chat-input-area">
                <form className="chat-input-wrapper" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Type your medical query here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping}
                    />
                    <button 
                        type="submit" 
                        className="chat-send-btn"
                        disabled={!inputValue.trim() || isTyping}
                    >
                        <PaperAirplaneIcon />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SmartAssistant;