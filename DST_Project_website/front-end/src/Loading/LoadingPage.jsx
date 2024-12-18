import React from "react";

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        {/* Smart Spinner */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-300 border-t-transparent rounded-full animate-spin-slow"></div>
        </div>

        {/* Loading Text */}
      <p className="text-center  text-white">Loading Data.......</p>
      </div>
    </div>
  );
}
