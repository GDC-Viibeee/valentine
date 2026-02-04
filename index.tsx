import React, { useState, useCallback, useRef, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

const NO_MESSAGES = [
  "Are you sure?",
  "Think again!",
  "Please? 🥺",
  "Don't be mean!",
  "I'll be very sad...",
  "Really really sure?",
  "Give it another thought!",
  "Is that your final answer?",
  "You're breaking my heart! 💔",
  "I'll give you cookies! 🍪",
];

const COLORS = ['#ffffff', '#ffb6c1', '#ff69b4', '#ff007f', '#fff0f5'];

const LiveLoveParticles = () => {
  // Generate 150 live background falling particles
  const particles = useMemo(() => Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: `${8 + Math.random() * 15}s`,
    delay: `${Math.random() * -20}s`, // Negative delay so they start at different points in path
    size: `${8 + Math.random() * 25}px`,
    maxOpacity: 0.15 + Math.random() * 0.45,
    sway: `${(Math.random() - 0.5) * 200}px`, // Horizontal sway distance
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  })), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <div
          key={p.id}
          className="live-particle flex items-center justify-center"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            fontSize: p.size,
            color: p.color,
            // Custom properties for the CSS animation
            // @ts-ignore
            '--max-opacity': p.maxOpacity,
            '--sway': p.sway
          } as React.CSSProperties}
        >
          <i className="fas fa-heart"></i>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [noCount, setNoCount] = useState(0);
  const [isAccepted, setIsAccepted] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [messageIndex, setMessageIndex] = useState(0);
  const [celebrationHearts, setCelebrationHearts] = useState<{ id: number; x: number; size: number; duration: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNoClick = useCallback(() => {
    setNoCount(prev => prev + 1);
    setMessageIndex(prev => (prev + 1) % NO_MESSAGES.length);
    
    const padding = 120;
    const newX = Math.random() * (window.innerWidth - padding * 2) - (window.innerWidth / 2) + padding;
    const newY = Math.random() * (window.innerHeight - padding * 2) - (window.innerHeight / 2) + padding;
    
    setNoButtonPos({ x: newX, y: newY });
  }, []);

  const handleYesClick = () => {
    setIsAccepted(true);
    const newHearts = Array.from({ length: 120 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      size: 15 + Math.random() * 35,
      duration: 3 + Math.random() * 4
    }));
    setCelebrationHearts(newHearts);
  };

  const yesButtonScale = 1 + noCount * 0.22;

  if (isAccepted) {
    return (
      <div className="relative w-screen h-screen flex flex-col items-center justify-center p-8 text-center bg-[#ff4d94]">
        <LiveLoveParticles />
        {celebrationHearts.map(heart => (
          <div
            key={heart.id}
            className="heart-particle text-white"
            style={{
              left: `${heart.x}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`
            }}
          >
            <i className="fas fa-heart"></i>
          </div>
        ))}
        
        <div className="glass p-12 md:p-16 rounded-[60px] max-w-lg z-20 pulse animate-in fade-in zoom-in duration-1000">
          <h1 className="cursive text-7xl md:text-8xl text-white mb-6 drop-shadow-xl">Yay! ❤️</h1>
          <div className="relative">
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4Z3B4JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/MDJ9IbxxvDUQM/giphy.gif" 
              alt="Happy cat" 
              className="rounded-3xl shadow-2xl mb-8 w-full border-8 border-white/30"
            />
            <i className="fas fa-heart text-white/50 text-9xl absolute -bottom-10 -right-10 rotate-12 -z-10"></i>
          </div>
          <p className="text-3xl md:text-4xl text-white font-black drop-shadow-lg leading-tight">
            I knew you'd say yes! <br/> Best Valentine Ever! 🌹
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden" ref={containerRef}>
      <LiveLoveParticles />

      <div className="glass p-12 md:p-16 rounded-[60px] text-center max-w-2xl z-20 mx-4 transition-all duration-700 hover:shadow-3xl hover:-translate-y-2">
        <div className="mb-10">
          <div className="relative inline-block">
             <i className="fas fa-heart text-white text-8xl animate-pulse drop-shadow-2xl"></i>
             <i className="fas fa-heart text-pink-300 text-4xl absolute -top-4 -right-4 animate-bounce"></i>
             <i className="fas fa-heart text-pink-200 text-2xl absolute -bottom-2 -left-6 animate-ping opacity-50"></i>
          </div>
        </div>
        
        <h1 className="cursive text-6xl md:text-8xl text-white mb-8 drop-shadow-xl leading-tight">
          Will you be my Valentine?
        </h1>
        
        <p className="text-white/90 mb-14 text-2xl md:text-3xl h-12 font-bold italic drop-shadow-lg tracking-wide">
          {noCount > 0 ? NO_MESSAGES[messageIndex] : "I have a very special question..."}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-12">
          <button
            onClick={handleYesClick}
            style={{ transform: `scale(${yesButtonScale})` }}
            className="bg-white hover:bg-pink-50 text-pink-600 font-black py-5 px-14 rounded-full shadow-2xl transition-all duration-300 hover:shadow-white/60 active:scale-95 z-30 text-2xl uppercase tracking-tighter"
          >
            Yes! 💖
          </button>

          <button
            onMouseEnter={handleNoClick}
            onClick={handleNoClick}
            style={{ 
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              transition: noCount > 0 ? 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'none'
            }}
            className="bg-white/10 hover:bg-white/20 text-white border-4 border-white/40 font-black py-5 px-14 rounded-full shadow-lg z-20 transition-all text-2xl"
          >
            No
          </button>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="fixed bottom-10 left-10 text-white opacity-10 text-[12rem] -rotate-12 pointer-events-none z-10">
        <i className="fas fa-heart"></i>
      </div>
      <div className="fixed top-10 right-10 text-white opacity-10 text-[12rem] rotate-12 pointer-events-none z-10">
        <i className="fas fa-heart"></i>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);