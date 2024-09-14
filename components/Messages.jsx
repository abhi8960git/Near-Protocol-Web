import React from 'react';

export default function Messages({ messages }) {
  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold my-5">Messages</h2>
      {messages.map((message, i) => (
        <div
          key={i}
          className={`border rounded-md p-4 mb-4 bg-white ${
            message.premium ? "border-blue-500" : "border-gray-200"
          }`}
        >
          <h5 className="text-lg font-bold mb-2 flex items-center">
            {message.sender}
            {message.premium && (
              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Premium
              </span>
            )}
          </h5>
          <p className="text-base leading-relaxed">{message.text}</p>
        </div>
      ))}
    </div>
  );
}