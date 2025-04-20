import React, { useEffect, useState } from "react";

  
const AuthImagePattern = ({ title, subtitle }) => {
    const cardImages = [
        "https://i.pinimg.com/736x/4f/3d/07/4f3d07c5f781dc68d441284380edd80f.jpg",
        "https://i.pinimg.com/736x/c6/89/4c/c6894cd179e93d71031d6e7c061e2ea9.jpg",
        "https://i.pinimg.com/736x/74/ad/4c/74ad4c014ae391ecbae222b718f9a003.jpg",
        "https://i.pinimg.com/736x/0d/34/52/0d3452d84a3993fcd90786748d1705d4.jpg",
        "https://i.pinimg.com/736x/78/bd/a9/78bda9dec03e19a7e0e209f892b7db13.jpg",
        "https://i.pinimg.com/736x/c3/b4/53/c3b453d0339b0a06b7917367203b95d0.jpg",
        "https://i.pinimg.com/736x/6b/21/6c/6b216cd3fe9638e65584953ae5a52104.jpg",
        "https://i.pinimg.com/736x/63/b8/cd/63b8cd9c6d02b451423dddcd6297c812.jpg",
        "https://i.pinimg.com/736x/fb/03/7f/fb037f5804f567dd455aaa272b1e09f7.jpg",
      ];

    return (
      <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
        <div className="max-w-md text-center">
          {/* Game of Cards Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8 " style={{ perspective: "1000px" }}>
            {cardImages.map((url, i) => (
              <div
                key={i}
                className="relative w-full aspect-square group cursor-pointer"
              >
                <div className="absolute inset-0 rounded-2xl transition-transform  duration-700 transform group-hover:rotate-y-180 [transform-style:preserve-3d]">
                  {/* Front Face */}
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl flex items-center justify-center backface-hidden animate-pulse">
                 
                  </div>
                  {/* Back Face */}
                  <div className="absolute inset-0 bg-gray-200 text-white rounded-2xl flex items-center justify-center rotate-y-180 overflow-hidden backface-hidden">
                   <img className="w-full h-full object-cover opacity-80" src={url} alt={`random-card-${i}`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Title & Subtitle */}
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-base-content/60">{subtitle}</p>
        </div>
      </div>
    );
  };
  
  export default AuthImagePattern;
  