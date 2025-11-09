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
  const fullText = "🎉 Happy Birthday Ad!";
  const typingRef = useRef(0);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Typewriter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayText((prev) => {
        if (typingRef.current < fullText.length) {
          typingRef.current += 1;
          return fullText.slice(0, typingRef.current);
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 120);
    return () => clearInterval(interval);
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

  // Responsive balloon count
  const isMobile = window.innerWidth < 768;
  const balloonCount = isMobile ? 12 : 25;
  const balloons = Array.from({ length: balloonCount }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 18 + Math.random() * 10,
    size: isMobile ? 35 + Math.random() * 30 : 50 + Math.random() * 50,
    color: ["#ff99ccaa", "#ffcc00aa", "#99ff99aa", "#66ccffaa", "#ffb6c1aa"][
      i % 5
    ],
  }));

  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 text-white font-poppins">
      {/* Sparkles */}
      <Particles
        className="absolute top-0 left-0 w-full h-full"
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: false,
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: isMobile ? 20 : 40 },
            size: { value: 5 },
            move: { enable: true, speed: 1 },
            color: { value: ["#ffffff", "#ffe4e1", "#ffb6c1", "#f9a8d4"] },
            opacity: { value: 0.7 },
          },
        }}
      />

      {/* Confetti */}
      {confetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

      {/* Balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute z-0"
          style={{
            left: balloon.left,
            bottom: "-150px",
          }}
          animate={{
            y: ["0%", "-120vh"],
            x: [0, Math.sin(balloon.id) * 40],
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
              backdropFilter: "blur(3px)",
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

      {/* Typewriter heading */}
      <motion.h1
        className="font-extrabold z-10 text-center drop-shadow-lg mt-4 whitespace-pre leading-tight px-3"
        style={{
          fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
          lineHeight: 1.1,
        }}
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
        className="text-sm sm:text-base md:text-xl mt-4 md:mt-6 max-w-[85%] sm:max-w-md md:max-w-xl text-center z-10 px-4"
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
        className="mt-8 sm:mt-10 px-5 sm:px-6 py-2 sm:py-3 bg-white text-pink-600 font-semibold rounded-full shadow-lg hover:scale-110 transition-all z-10 text-sm sm:text-base"
        whileTap={{ scale: 0.9 }}
      >
        {musicPlaying ? "🔇 Stop Music" : "🎵 Play Music"}
      </motion.button>

      {/* Glow Effect */}
      <div className="absolute w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-pink-300 opacity-20 blur-3xl rounded-full animate-pulse top-1/3 left-1/2 -translate-x-1/2"></div>
    </div>
  );
};

export default App;
