import React, { useState } from "react";

export const Chat = () => {
  const [answer, setAnswer] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    const request = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const response = await request.json();
    console.log("Chat 9 | answer", response);
    setAnswer(response.answer);
  };

  return (
    <div className="w-full bg-slate-200 m-5 p-5 flex flex-col items-start">
      <input
        placeholder="Enter question here"
        className="p-3"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        <div>{answer}</div>
      </div>
    </div>
  );
};
