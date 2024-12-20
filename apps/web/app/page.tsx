"use client";
import React, { useState } from "react";
import { useSocket } from "../context/SocketProvider";

const Page = () => {
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div className=" min-h-screen flex justify-between gap-4 flex-col py-12 items-center ">
      <div className=" flex flex-col gap-1 items-start">
        <h1 className=" text-red-400">All message will appear here</h1>
        {messages.map((msg: String, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <div className=" flex gap-2 items-center">
        <input
          onChange={(e) => setMessage(e.target.value)}
          className=" focus:outline-none focus:ring-1 px-2 py-1 border rounded"
          type="text"
          placeholder="Message"
        />
        <button
          onClick={() => {
            sendMessage(message);
          }}
          className=" py-1 px-2 border rounded bg-gray-100 hover:bg-gray-200 duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Page;
