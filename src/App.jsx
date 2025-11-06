import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const App = () => {
  const [confetti, setConfetti] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [audio] = useState(new Audio("/music/happy-birthday.mp3"));
  const [displayText, setDisplayText] = useState("");
  const fullText = "🎉 Happy Birthday Sarah!";
  const typingRef = useRef(0);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Smoothly type text
  useEffect(() => {
    const typeInterval = setInterval(() => {
      setDisplayText((prev) => {
        if (typingRef.current < fullText.length) {
          typingRef.current += 1;
          return fullText.slice(0, typingRef.current);
        } else {
          clearInterval(typeInterval);
          return prev;
        }
      });
    }, 120);
    return () => clearInterval(typeInterval);
  }, []);

  // Auto confetti trigger
  useEffect(() => {
    const timer = setTimeout(() => setConfetti(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleMusic = () => {
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play();
      audio.loop = true;
    }
    setMusicPlaying(!musicPlaying);
  };

  // Balloons
  const balloons = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 18 + Math.random() * 10,
    size: 40 + Math.random() * 40,
    color: ["#ff99ccaa", "#ffcc00aa", "#99ff99aa", "#66ccffaa", "#ffb6c1aa"][
      i % 5
    ],
  }));

  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white font-poppins">
      {/* Background sparkles */}
      <Particles
        className="absolute top-0 left-0 w-full h-full"
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 40 },
            size: { value: 6 },
            move: { enable: true, speed: 1 },
            color: { value: ["#ffffff", "#ffe4e1", "#ffb6c1", "#f9a8d4"] },
            opacity: { value: 0.8 },
          },
        }}
      />

      {/* Confetti */}
      {confetti && <Confetti />}

      {/* Floating Balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute z-0"
          style={{
            left: balloon.left,
            bottom: "-120px",
          }}
          animate={{
            y: ["0%", "-20vh"],
            x: [0, Math.sin(balloon.id) * 20],
          }}
          transition={{
            duration: balloon.duration,
            delay: balloon.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              width: balloon.size,
              height: balloon.size * 1.3,
              backgroundColor: balloon.color,
              borderRadius: "50% 50% 45% 45%",
              position: "relative",
              boxShadow: "0 4px 10px rgba(255,255,255,0.4)",
              backdropFilter: "blur(2px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                bottom: "-25px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "2px",
                height: "30px",
                background: "white",
                opacity: 0.8,
              }}
            ></div>
          </div>
        </motion.div>
      ))}

      {/* Heading with Typewriter effect */}
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold z-10 text-center drop-shadow-lg mt-4 whitespace-pre"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {displayText}
        <motion.span
          className="inline-block w-[3px] bg-yellow-300 ml-1"
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        ></motion.span>
      </motion.h1>

      {/* Sub Message */}
      <motion.p
        className="text-lg md:text-2xl mt-6 max-w-xl text-center z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1.5 }}
      >
        Wishing you endless happiness, laughter, and joy!  
        You make everyone’s life brighter just by being you 🌟
      </motion.p>

      {/* Music Button */}
      <motion.button
        onClick={toggleMusic}
        className="mt-10 px-6 py-3 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:scale-110 transition-all z-10"
        whileTap={{ scale: 0.9 }}
      >
        {musicPlaying ? "🔇 Stop Music" : "🎵 Play Music"}
      </motion.button>

      {/* Glow effect */}
      <div className="absolute w-[500px] h-[500px] bg-pink-300 opacity-20 blur-3xl rounded-full animate-pulse top-1/3 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default App;
