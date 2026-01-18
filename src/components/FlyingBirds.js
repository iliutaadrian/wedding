import React, { useEffect, useState } from "react";

const Bird = ({ style, speed, size }) => {
  return (
    <div className="bird-container" style={style}>
      <svg
        viewBox="0 0 100 100"
        className="bird-svg"
        style={{
          width: size,
          height: size,
        }}
      >
        {/* Left Wing */}
        <path
          d="M50 60 C 30 60, 10 30, 0 10 C 20 40, 40 50, 50 55"
          fill="currentColor"
          className="wing left-wing"
        />
        {/* Right Wing */}
        <path
          d="M50 60 C 70 60, 90 30, 100 10 C 80 40, 60 50, 50 55"
          fill="currentColor"
          className="wing right-wing"
        />
        {/* Body (Simplified) */}
        <path
            d="M50 60 Q 50 65 50 70"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
        />
      </svg>
      <style jsx>{`
        .bird-container {
          position: fixed;
          top: 0;
          left: -10vw;
          z-index: 10; /* Behind heavy content but visible */
          pointer-events: none;
          will-change: transform;
          animation-name: fly-linear;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          color: rgba(0, 0, 0, 0.6); /* Bird color */
        }

        .wing {
          transform-origin: 50% 60%;
          animation: flap 1s ease-in-out infinite alternate;
        }

        .left-wing {
          animation-delay: 0s;
        }
        .right-wing {
          animation-delay: 0s;
        }

        @keyframes fly-linear {
          0% {
            transform: translateX(-10vw) translateY(0);
          }
          100% {
            transform: translateX(120vw) translateY(-20px);
          }
        }

        @keyframes flap {
          0% {
            transform: scaleY(1) rotate(0deg);
          }
          100% {
            transform: scaleY(-0.6) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

const FlyingBirds = () => {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    // Generate birds only on client side
    const count = 5; // Increased count to cover the screen better
    const newBirds = [];

    for (let i = 0; i < count; i++) {
      // Randomize properties for natural look
      // Scale: 0.8 (far) to 1.8 (close) -> Keep them big
      const scale = 0.8 + Math.random();
      
      // Speed: Restore variance for parallax.
      // Larger birds (close) move faster.
      // Duration range: 20s (fast/close) to 50s (slow/far)
      const duration = 50 - ((scale - 0.8) * 30) + (Math.random() * 5);

      // Vertical start position: Spread across the entire screen (5% to 90%)
      const top = 5 + Math.random() * 85; 
      
      // Delay: Spread out significantly so they don't flock.
      // Negative delay ensures they start at different points in their path immediately.
      const delay = Math.random() * -60; 

      // Flap speed: Bigger birds flap slightly slower visually
      const flapDuration = 0.6 + Math.random() * 0.4;

      newBirds.push({
        id: i,
        size: `${70 * scale}px`, // Keep base size 70
        style: {
          top: `${top}vh`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity: 0.2 , // Keep high visibility
          zIndex: 9, 
        },
        flapDuration: `${flapDuration}s`
      });
    }

    setBirds(newBirds);
  }, []);

  return (
    <>
      {birds.map((bird) => (
        <Bird key={bird.id} {...bird} />
      ))}
      <style jsx global>{`
        /* Optional: Add a slight bobbing motion to the bird container wrapper if desired */
      `}</style>
    </>
  );
};

export default FlyingBirds;
