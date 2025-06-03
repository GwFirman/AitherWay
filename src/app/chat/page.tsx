"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconSend, IconPlus, IconMessage, IconSettings, IconUser, IconMenu2, IconX } from "@tabler/icons-react";

const API = process.env.NODE_ENV || "http://localhost:3000/api/conversation";

interface Message {
	id: string;
	content: string;
	role: "user" | "assistant";
	timestamp: Date;
}

interface Chat {
	id: string;
	title: string;
	messages: Message[];
	createdAt: Date;
}

const ChatGPTUI: React.FC = () => {
	const [chats, setChats] = useState<Chat[]>([
		{
			id: "1",
			title: "New Chat",
			messages: [],
			createdAt: new Date(),
		},
	]);
	const [currentChatId, setCurrentChatId] = useState<string>("1");
	const [inputValue, setInputValue] = useState<string>("");
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
	const [isTyping, setIsTyping] = useState<boolean>(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const currentChat = chats.find((chat) => chat.id === currentChatId);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
	}, [currentChat?.messages]);

	const createNewChat = () => {
		const newChat: Chat = {
			id: Date.now().toString(),
			title: "New Chat",
			messages: [],
			createdAt: new Date(),
		};
		setChats((prev) => [newChat, ...prev]);
		setCurrentChatId(newChat.id);
	};

	const sendMessage = async () => {
		if (!inputValue.trim() || !currentChat) return;

		const userMessage: Message = {
			id: Date.now().toString(),
			content: inputValue.trim(),
			role: "user",
			timestamp: new Date(),
		};

		// Update chat title if it's the first message
		if (currentChat.messages.length === 0) {
			setChats((prev) => prev.map((chat) => (chat.id === currentChatId ? { ...chat, title: inputValue.trim().slice(0, 50) + (inputValue.length > 50 ? "..." : ""), messages: [userMessage] } : chat)));
		} else {
			setChats((prev) => prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, userMessage] } : chat)));
		}

		setInputValue("");
		setIsTyping(true);

		// Simulate AI response
		setTimeout(() => {
			const assistantMessage: Message = {
				id: (Date.now() + 1).toString(),
				content: "Ini adalah contoh respons dari AI. Dalam implementasi nyata, Anda akan mengirim pesan ke API AI dan mendapatkan respons yang sebenarnya.",
				role: "assistant",
				timestamp: new Date(),
			};

			setChats((prev) => prev.map((chat) => (chat.id === currentChatId ? { ...chat, messages: [...chat.messages, assistantMessage] } : chat)));
			setIsTyping(false);
		}, 1500);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div className="flex h-screen bg-gray-900 text-white">
			{/* Sidebar */}
			<AnimatePresence>
				{isSidebarOpen && (
					<motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 300, opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="bg-gray-800 border-r border-gray-700 flex flex-col overflow-hidden">
						<div className="p-4 border-b border-gray-700">
							<motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={createNewChat} className="w-full flex items-center gap-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
								<IconPlus size={20} />
								<span>New Chat</span>
							</motion.button>
						</div>

						<div className="flex-1 overflow-y-auto p-2">
							{chats.map((chat) => (
								<motion.div key={chat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} whileHover={{ backgroundColor: "rgb(55, 65, 81)" }} onClick={() => setCurrentChatId(chat.id)} className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${currentChatId === chat.id ? "bg-gray-600" : "hover:bg-gray-700"}`}>
									<div className="flex items-center gap-3">
										<IconMessage size={16} />
										<span className="truncate text-sm">{chat.title}</span>
									</div>
								</motion.div>
							))}
						</div>

						<div className="p-4 border-t border-gray-700">
							<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
								<IconUser size={20} />
								<span>Profile</span>
							</div>
							<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors">
								<IconSettings size={20} />
								<span>Settings</span>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Main Chat Area */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<div className="border-b border-gray-700 p-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
							{isSidebarOpen ? <IconX size={20} /> : <IconMenu2 size={20} />}
						</motion.button>
						<h1 className="text-lg font-semibold">{currentChat?.title || "New Chat"}</h1>
					</div>
				</div>

				{/* Messages */}
				<div className="flex-1 overflow-y-auto p-4">
					{currentChat?.messages.length === 0 ? (
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center h-full">
							<div className="text-center text-gray-400">
								<IconMessage size={64} className="mx-auto mb-4 opacity-50" />
								<h2 className="text-xl font-semibold mb-2">Start a conversation</h2>
								<p>Send a message to begin chatting</p>
							</div>
						</motion.div>
					) : (
						<div className="space-y-6">
							{currentChat?.messages.map((message, index) => (
								<motion.div key={message.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
									<div className={`max-w-3xl rounded-lg p-4 ${message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-100"}`}>
										<div className="whitespace-pre-wrap">{message.content}</div>
										<div className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</div>
									</div>
								</motion.div>
							))}

							{isTyping && (
								<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
									<div className="bg-gray-700 rounded-lg p-4">
										<div className="flex space-x-1">
											{[0, 1, 2].map((i) => (
												<motion.div
													key={i}
													animate={{ y: [0, -10, 0] }}
													transition={{
														duration: 0.5,
														repeat: Infinity,
														delay: i * 0.1,
													}}
													className="w-2 h-2 bg-gray-400 rounded-full"
												/>
											))}
										</div>
									</div>
								</motion.div>
							)}
							<div ref={messagesEndRef} />
						</div>
					)}
				</div>

				{/* Input Area */}
				<div className="border-t border-gray-700 p-4">
					<div className="flex items-end gap-3 max-w-4xl mx-auto">
						<div className="flex-1 relative">
							<textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." rows={1} className="w-full p-3 pr-12 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none text-white placeholder-gray-400" style={{ minHeight: "48px", maxHeight: "120px" }} />
							<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={sendMessage} disabled={!inputValue.trim() || isTyping} className="absolute right-2 bottom-2 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors">
								<IconSend size={16} />
							</motion.button>
						</div>
					</div>
					<div className="text-xs text-gray-500 text-center mt-2">Press Enter to send, Shift+Enter for new line</div>
				</div>
			</div>
		</div>
	);
};

export default ChatGPTUI;
