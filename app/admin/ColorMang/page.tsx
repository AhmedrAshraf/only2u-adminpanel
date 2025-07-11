"use client";

import { useState } from "react";

export default function Home() {
  const [colorName, setColorName] = useState("");
  const [hexCode, setHexCode] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/40">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {" "}
          Color Preview
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color Name *
            </label>
            <input
              type="text"
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
              placeholder="e.g., Red, Blue, Green"
              className="w-full px-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hex Color Code *
            </label>
            <input
              type="text"
              value={hexCode}
              onChange={(e) => setHexCode(e.target.value)}
              placeholder="e.g., #FF0000"
              className="w-full px-4 py-2 rounded-lg border border-gray-8000 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-center">
            <div
              className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-white font-semibold text-sm shadow-lg border"
              style={{ backgroundColor: hexCode }}
            >
              <span>{colorName || "color_name"}</span>
              <span className="text-xs">{hexCode}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
