import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Settings, Terminal, ShieldAlert, Cpu, Database, 
  Volume2, ToggleLeft, RefreshCw, Key, Shield, HelpCircle, 
  BookOpen, Info, Activity, Globe, Wifi, KeyRound, MonitorCheck
} from 'lucide-react';

// Web Audio API Synthesizer Helper (Zero-dependency modular audio beep trigger)
const playSynthBeep = (freq = 440, type = 'sine', duration = 0.1) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

export default function OperationsHub({ triggerToast }) {
  const [selectedTool, setSelectedTool] = useState('pong');

  const tools = [
    { 
      id: 'pong', 
      label: 'Telemetry Pong', 
      category: 'ARCADE', 
      icon: <Play size={12} />,
      hoverClass: 'hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:text-indigo-400',
      activeClass: 'border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_12px_-2px_rgba(99,102,241,0.4)]',
      hoverAnim: { x: 4 }
    },
    { 
      id: 'snake', 
      label: 'Packet Snake', 
      category: 'ARCADE', 
      icon: <Play size={12} />,
      hoverClass: 'hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400',
      activeClass: 'border-emerald-500 bg-emerald-500/10 text-emerald-400 shadow-[0_0_12px_-2px_rgba(16,185,129,0.4)]',
      hoverAnim: { x: [0, 4, -4, 0], transition: { repeat: Infinity, duration: 0.6 } }
    },
    { 
      id: 'mines', 
      label: 'Threat Sweeper', 
      category: 'ARCADE', 
      icon: <ShieldAlert size={12} />,
      hoverClass: 'hover:border-red-500/30 hover:bg-red-500/5 hover:text-red-400',
      activeClass: 'border-red-500 bg-red-500/10 text-red-400 shadow-[0_0_12px_-2px_rgba(239,68,68,0.4)]',
      hoverAnim: { x: [0, -2, 2, -2, 2, 0], transition: { duration: 0.3 } }
    },
    { 
      id: 'tickets', 
      label: 'Ticket SLA Run', 
      category: 'ARCADE', 
      icon: <Terminal size={12} />,
      hoverClass: 'hover:border-amber-500/30 hover:bg-amber-500/5 hover:text-amber-400',
      activeClass: 'border-amber-500 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_-2px_rgba(245,158,11,0.4)]',
      hoverAnim: { scale: 1.05 }
    },
    { 
      id: 'cypher', 
      label: 'SaaS Codebreaker', 
      category: 'PUZZLE', 
      icon: <Key size={12} />,
      hoverClass: 'hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:text-cyan-400',
      activeClass: 'border-cyan-500 bg-cyan-500/10 text-cyan-400 shadow-[0_0_12px_-2px_rgba(6,182,212,0.4)]',
      hoverAnim: { y: [0, -2, 2, 0], transition: { repeat: Infinity, duration: 0.6 } }
    },
    { 
      id: 'route', 
      label: 'Meraki Routing', 
      category: 'PUZZLE', 
      icon: <Cpu size={12} />,
      hoverClass: 'hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-400',
      activeClass: 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-[0_0_12px_-2px_rgba(59,130,246,0.4)]',
      hoverAnim: { rotate: 15 }
    },
    { 
      id: 'password', 
      label: 'Entropy Forge', 
      category: 'SECURITY', 
      icon: <KeyRound size={12} />,
      hoverClass: 'hover:border-violet-500/30 hover:bg-violet-500/5 hover:text-violet-400',
      activeClass: 'border-violet-500 bg-violet-500/10 text-violet-400 shadow-[0_0_12px_-2px_rgba(139,92,246,0.4)]',
      hoverAnim: { scale: 1.04 }
    },
    { 
      id: 'ping', 
      label: 'Latency Pinger', 
      category: 'SECURITY', 
      icon: <Wifi size={12} />,
      hoverClass: 'hover:border-teal-500/30 hover:bg-teal-500/5 hover:text-teal-400',
      activeClass: 'border-teal-500 bg-teal-500/10 text-teal-400 shadow-[0_0_12px_-2px_rgba(20,184,166,0.4)]',
      hoverAnim: { y: -3 }
    },
    { 
      id: 'crt', 
      label: 'CRT Scan Toggler', 
      category: 'HUD_SYS', 
      icon: <ToggleLeft size={12} />,
      hoverClass: 'hover:border-lime-500/30 hover:bg-lime-500/5 hover:text-lime-400',
      activeClass: 'border-lime-500 bg-lime-500/10 text-lime-400 shadow-[0_0_12px_-2px_rgba(132,204,22,0.4)]',
      hoverAnim: { scaleX: 1.06 }
    },
    { 
      id: 'buzzword', 
      label: 'Jargon Decoder', 
      category: 'HUD_SYS', 
      icon: <Terminal size={12} />,
      hoverClass: 'hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-400',
      activeClass: 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-[0_0_12px_-2px_rgba(249,115,22,0.4)]',
      hoverAnim: { skewX: -12 }
    },
    { 
      id: 'sound', 
      label: 'Synth Soundboard', 
      category: 'HUD_SYS', 
      icon: <Volume2 size={12} />,
      hoverClass: 'hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5 hover:text-fuchsia-400',
      activeClass: 'border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-400 shadow-[0_0_12px_-2px_rgba(217,70,239,0.4)]',
      hoverAnim: { scaleY: 1.1 }
    },
    { 
      id: 'binary', 
      label: 'Matrix Binary Rain', 
      category: 'HUD_SYS', 
      icon: <Activity size={12} />,
      hoverClass: 'hover:border-sky-500/30 hover:bg-sky-500/5 hover:text-sky-400',
      activeClass: 'border-sky-500 bg-sky-500/10 text-sky-400 shadow-[0_0_12px_-2px_rgba(56,189,248,0.4)]',
      hoverAnim: { y: 3 }
    },
    { 
      id: 'oracle', 
      label: 'Syslog Oracle', 
      category: 'ARCHIVES', 
      icon: <HelpCircle size={12} />,
      hoverClass: 'hover:border-pink-500/30 hover:bg-pink-500/5 hover:text-pink-400',
      activeClass: 'border-pink-500 bg-pink-500/10 text-pink-400 shadow-[0_0_12px_-2px_rgba(236,72,153,0.4)]',
      hoverAnim: { scale: 1.02, rotate: -2 }
    },
    { 
      id: 'runbook', 
      label: 'KB Runbook Logs', 
      category: 'ARCHIVES', 
      icon: <BookOpen size={12} />,
      hoverClass: 'hover:border-yellow-500/30 hover:bg-yellow-500/5 hover:text-yellow-400',
      activeClass: 'border-yellow-500 bg-yellow-500/10 text-yellow-400 shadow-[0_0_12px_-2px_rgba(234,179,8,0.4)]',
      hoverAnim: { rotate: 3 }
    },
    { 
      id: 'credits', 
      label: 'Credits Decrypt', 
      category: 'ARCHIVES', 
      icon: <Info size={12} />,
      hoverClass: 'hover:border-zinc-500/30 hover:bg-zinc-500/5 hover:text-zinc-400',
      activeClass: 'border-zinc-500 bg-zinc-500/10 text-zinc-400 shadow-[0_0_12px_-2px_rgba(113,113,122,0.4)]',
      hoverAnim: { x: -4 }
    }
  ];

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#6E6E77] uppercase tracking-wider select-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-telemetry-accent"></span>
          SYS_OPS: DIAGNOSTIC_EXTRAS_MATRIX
        </span>
        <span>NODE_SYNC: SECURE_AUDIT_STATION</span>
      </div>

      {/* Main glassmorphic layout panel */}
      <div className="border border-white/5 bg-white/[0.01] backdrop-blur-2xl rounded-2xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/5 overflow-hidden min-h-[460px]">
        
        {/* Sidebar Selector Catalog */}
        <div className="w-full md:w-60 bg-[#0E0E0F]/45 p-4 flex flex-col gap-2 select-none min-h-[160px] md:min-h-0 overflow-y-auto max-h-[300px] md:max-h-[500px]">
          <span className="font-mono text-[9px] text-[#52525B] uppercase tracking-widest mb-1">UTILITIES CATALOG</span>
          {tools.map((t) => (
            <motion.button
              key={t.id}
              onClick={() => {
                setSelectedTool(t.id);
                playSynthBeep(650, 'sine', 0.05);
              }}
              whileHover={t.hoverAnim}
              className={`flex items-center justify-between px-3 py-2 rounded-lg font-mono text-[10px] text-left transition-all border ${
                selectedTool === t.id 
                  ? t.activeClass 
                  : `border-transparent text-telemetry-silver ${t.hoverClass}`
              }`}
            >
              <span className="flex items-center gap-2">
                {t.icon}
                {t.label}
              </span>
              <span className="text-[8px] opacity-40 font-semibold px-1 rounded bg-black/45">{t.category}</span>
            </motion.button>
          ))}
        </div>

        {/* Selected Tool Viewport */}
        <div className="flex-1 p-6 flex flex-col justify-center min-h-[340px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTool}
              initial={{ opacity: 0, filter: "blur(6px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-full flex flex-col"
            >
              {selectedTool === 'pong' && <PongTelemetry triggerToast={triggerToast} />}
              {selectedTool === 'snake' && <SnakePacket triggerToast={triggerToast} />}
              {selectedTool === 'mines' && <MinesweeperHunt triggerToast={triggerToast} />}
              {selectedTool === 'tickets' && <TicketSpeedrun triggerToast={triggerToast} />}
              {selectedTool === 'cypher' && <DecryptionLock triggerToast={triggerToast} />}
              {selectedTool === 'route' && <RouteConnector triggerToast={triggerToast} />}
              {selectedTool === 'password' && <PasswordForge triggerToast={triggerToast} />}
              {selectedTool === 'ping' && <PingLatency triggerToast={triggerToast} />}
              {selectedTool === 'crt' && <CrtToggler triggerToast={triggerToast} />}
              {selectedTool === 'buzzword' && <BuzzwordDecoder triggerToast={triggerToast} />}
              {selectedTool === 'sound' && <SoundMatrix triggerToast={triggerToast} />}
              {selectedTool === 'binary' && <BinaryRain triggerToast={triggerToast} />}
              {selectedTool === 'oracle' && <SyslogOracle triggerToast={triggerToast} />}
              {selectedTool === 'runbook' && <RunbookKB triggerToast={triggerToast} />}
              {selectedTool === 'credits' && <CreditsScroll triggerToast={triggerToast} />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 1. PONG TELEMETRY CANVAS MINI-GAME (Frosted Arcade #1)
// ----------------------------------------------------
function PongTelemetry({ triggerToast }) {
  const canvasRef = useRef(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let ball = { x: 150, y: 75, vx: 0.9, vy: 0.7, radius: 4 };
    let playerY = 55;
    let aiY = 55;
    const paddleWidth = 4;
    const paddleHeight = 35;
    const paddleSpeed = 1.2;

    // Keyboard support for W and S keys
    let keysPressed = {};
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 's') {
        keysPressed[key] = true;
        e.preventDefault(); // Stop standard browser page scrolling
      }
    };
    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 's') {
        keysPressed[key] = false;
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const relativeY = e.clientY - rect.top;
      playerY = Math.max(0, Math.min(canvas.height - paddleHeight, relativeY - paddleHeight / 2));
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const rect = canvas.getBoundingClientRect();
      const relativeY = e.touches[0].clientY - rect.top;
      playerY = Math.max(0, Math.min(canvas.height - paddleHeight, relativeY - paddleHeight / 2));
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    const update = () => {
      // Move Ball
      ball.x += ball.vx;
      ball.y += ball.vy;

      // Ball Wall bounce
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.vy = -ball.vy;
        playSynthBeep(400, 'sine', 0.05);
      }

      // Keyboard input for player paddle
      const playerSpeed = 1.8;
      if (keysPressed['w']) {
        playerY = Math.max(0, playerY - playerSpeed);
      }
      if (keysPressed['s']) {
        playerY = Math.min(canvas.height - paddleHeight, playerY + playerSpeed);
      }

      // AI Simple tracking paddle
      const aiCenter = aiY + paddleHeight / 2;
      if (aiCenter < ball.y - 4) {
        aiY += paddleSpeed;
      } else if (aiCenter > ball.y + 4) {
        aiY -= paddleSpeed;
      }
      aiY = Math.max(0, Math.min(canvas.height - paddleHeight, aiY));

      // Player Paddle bounce
      if (ball.x - ball.radius < paddleWidth + 5) {
        if (ball.y > playerY && ball.y < playerY + paddleHeight) {
          ball.vx = -ball.vx * 1.03; // Accelerate very slightly
          ball.x = paddleWidth + 5 + ball.radius;
          playSynthBeep(520, 'sine', 0.08);
        } else if (ball.x < 0) {
          // AI scores
          setAiScore((prev) => prev + 1);
          playSynthBeep(220, 'triangle', 0.3);
          resetBall(1);
        }
      }

      // AI Paddle bounce
      if (ball.x + ball.radius > canvas.width - paddleWidth - 5) {
        if (ball.y > aiY && ball.y < aiY + paddleHeight) {
          ball.vx = -ball.vx * 1.03;
          ball.x = canvas.width - paddleWidth - 5 - ball.radius;
          playSynthBeep(520, 'sine', 0.08);
        } else if (ball.x > canvas.width) {
          // Player scores
          setPlayerScore((prev) => prev + 1);
          playSynthBeep(880, 'sine', 0.15);
          resetBall(-1);
        }
      }

      // Draw everything
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Symmetrical Midline
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Paddles
      ctx.fillStyle = '#E4E4E7';
      ctx.fillRect(5, playerY, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth - 5, aiY, paddleWidth, paddleHeight);

      // Draw Ball
      ctx.beginPath();
      ctx.fillStyle = '#3B82F6';
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(update);
    };

    const resetBall = (direction) => {
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.vx = direction * 0.9;
      ball.vy = (Math.random() * 2 - 1) * 0.7;
    };

    update();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameStarted]);


  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans">
      <div className="flex items-center justify-between w-full max-w-sm border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] tracking-wider">TELEMETRY_ARCADE: PONG</span>
        <div className="flex items-center gap-4 font-mono text-sm text-telemetry-white font-bold select-none">
          <span>PLAYER: {playerScore}</span>
          <span className="text-[#3F3F46]">:</span>
          <span>SYSTEM_AI: {aiScore}</span>
        </div>
      </div>

      {!gameStarted ? (
        <button
          onClick={() => {
            setGameStarted(true);
            triggerToast?.("PONG ARCADE SYNCED // PADDLE TARGET LOCKED", "cmd");
            playSynthBeep(880, 'sine', 0.2);
          }}
          className="w-full max-w-xs h-36 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex items-center justify-center font-mono text-xs uppercase text-telemetry-accent tracking-widest transition-colors select-none"
        >
          [Click to Initialise Game]
        </button>
      ) : (
        <canvas 
          ref={canvasRef} 
          width="300" 
          height="150" 
          className="border border-white/10 rounded-xl bg-black/45 w-full max-w-sm cursor-none"
        />
      )}
      <span className="font-mono text-[8px] text-[#52525B]">DESKTOP: USE W/S KEYS OR MOUSE CURSOR // MOBILE: TOUCH DRAG</span>
    </div>
  );
}

// ----------------------------------------------------
// 2. PACKET SNAKE GRID MINI-GAME (Frosted Arcade #2)
// ----------------------------------------------------
function SnakePacket({ triggerToast }) {
  const [snake, setSnake] = useState([{ x: 6, y: 6 }]);
  const [food, setFood] = useState({ x: 3, y: 3 });
  const [dir, setDir] = useState({ x: 0, y: -1 }); // Moving up initially
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const size = 12; // 12x12 grid

  // Game Loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const nextHead = { x: head.x + dir.x, y: head.y + dir.y };

        // Check Wall Hit
        if (nextHead.x < 0 || nextHead.x >= size || nextHead.y < 0 || nextHead.y >= size) {
          setGameOver(true);
          playSynthBeep(180, 'triangle', 0.35);
          triggerToast?.("PACKET CORRUPTED // FIREWALL BOUNDARY CRASH", "sec");
          return prevSnake;
        }

        // Check Self Hit
        if (prevSnake.some((segment) => segment.x === nextHead.x && segment.y === nextHead.y)) {
          setGameOver(true);
          playSynthBeep(180, 'triangle', 0.35);
          triggerToast?.("BUFFER OVERFLOW // STACK COLLISION DETECTED", "sec");
          return prevSnake;
        }

        const newSnake = [nextHead, ...prevSnake];

        // Eat byte food
        if (nextHead.x === food.x && nextHead.y === food.y) {
          setScore((prev) => prev + 10);
          playSynthBeep(720, 'sine', 0.08);
          // Spawn food at random coordinates
          setFood({
            x: Math.floor(Math.random() * size),
            y: Math.floor(Math.random() * size)
          });
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [dir, food, gameOver, gameStarted]);

  // Keys Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted) return;

      const key = e.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
        e.preventDefault(); // Prevent standard browser page scrolling
      }

      playSynthBeep(600, 'sine', 0.02);
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (dir.y !== 1) setDir({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (dir.y !== -1) setDir({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (dir.x !== 1) setDir({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (dir.x !== -1) setDir({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir, gameStarted]);

  const handleMobileDir = (nd) => {
    playSynthBeep(600, 'sine', 0.02);
    setDir(nd);
  };

  const resetGame = () => {
    setSnake([{ x: 6, y: 6 }]);
    setFood({ x: 3, y: 3 });
    setDir({ x: 0, y: -1 });
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none">
      <div className="flex items-center justify-between w-full max-w-xs border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">TELEMETRY_ARCADE: SNAKE</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">BYTES_SAVED: {score}</span>
      </div>

      {!gameStarted || gameOver ? (
        <button
          onClick={resetGame}
          className="w-full max-w-xs h-36 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest transition-colors gap-2"
        >
          <span>{gameOver ? 'SYSTEM FAILURE' : '[Click to Boot Snake]'}</span>
          {gameOver && <span className="text-[9px] text-[#71717A] tracking-normal lowercase border border-white/5 px-2 py-0.5 rounded bg-black/45">click to reboot core</span>}
        </button>
      ) : (
        <div className="flex flex-col items-center gap-3">
          {/* Game Board grid */}
          <div className="grid grid-cols-12 gap-0.5 p-1 border border-white/10 rounded-xl bg-black/45 w-full max-w-[200px]">
            {Array.from({ length: size * size }).map((_, idx) => {
              const x = idx % size;
              const y = Math.floor(idx / size);
              const isSnake = snake.some((s) => s.x === x && s.y === y);
              const isHead = snake[0].x === x && snake[0].y === y;
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded flex items-center justify-center font-mono text-[8px] leading-none ${
                    isHead 
                      ? 'bg-telemetry-accent text-white font-bold' 
                      : isSnake 
                        ? 'bg-telemetry-accent/30 text-telemetry-accent' 
                        : isFood 
                          ? 'bg-yellow-500/80 animate-ping' 
                          : 'bg-white/[0.01]'
                  }`}
                >
                  {isHead ? '>' : isSnake ? '=' : isFood ? '0' : ''}
                </div>
              );
            })}
          </div>

          {/* Mobile touch controls panel */}
          <div className="flex flex-col items-center gap-1.5 mt-1 sm:hidden">
            <button onClick={() => handleMobileDir({ x: 0, y: -1 })} className="px-3 py-1 rounded border border-white/5 bg-white/[0.01] text-[9px] font-mono font-bold hover:bg-white/[0.04]">[UP]</button>
            <div className="flex gap-4">
              <button onClick={() => handleMobileDir({ x: -1, y: 0 })} className="px-3 py-1 rounded border border-white/5 bg-white/[0.01] text-[9px] font-mono font-bold hover:bg-white/[0.04]">[LEFT]</button>
              <button onClick={() => handleMobileDir({ x: 1, y: 0 })} className="px-3 py-1 rounded border border-white/5 bg-white/[0.01] text-[9px] font-mono font-bold hover:bg-white/[0.04]">[RIGHT]</button>
            </div>
            <button onClick={() => handleMobileDir({ x: 0, y: 1 })} className="px-3 py-1 rounded border border-white/5 bg-white/[0.01] text-[9px] font-mono font-bold hover:bg-white/[0.04]">[DOWN]</button>
          </div>
          <span className="hidden sm:inline font-mono text-[8px] text-[#52525B]">USE KEYBOARD W/A/S/D OR ARROW KEYS FOR ROUTING NAVIGATION</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 3. THREAT SWEEPER MINISWEEPER (Frosted Arcade #3)
// ----------------------------------------------------
function MinesweeperHunt({ triggerToast }) {
  const size = 8;
  const threatCount = 10;
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const initBoard = () => {
    // Generate mines coordinates
    let mineCoords = [];
    while (mineCoords.length < threatCount) {
      const idx = Math.floor(Math.random() * (size * size));
      if (!mineCoords.includes(idx)) mineCoords.push(idx);
    }

    let initialBoard = Array.from({ length: size * size }).map((_, idx) => ({
      id: idx,
      isMine: mineCoords.includes(idx),
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0
    }));

    // Calculate adjacencies
    initialBoard.forEach((cell) => {
      const x = cell.id % size;
      const y = Math.floor(cell.id / size);
      
      let adj = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
            const nCell = initialBoard[ny * size + nx];
            if (nCell.isMine) adj++;
          }
        }
      }
      cell.adjacentMines = adj;
    });

    setBoard(initialBoard);
    setGameOver(false);
    setWin(false);
    setGameStarted(true);
  };

  const handleCellClick = (id) => {
    if (gameOver || win) return;
    playSynthBeep(650, 'sine', 0.05);

    let nextBoard = [...board];
    const cell = nextBoard[id];
    if (cell.isRevealed || cell.isFlagged) return;

    if (cell.isMine) {
      // Explode!
      setGameOver(true);
      playSynthBeep(150, 'triangle', 0.45);
      triggerToast?.("ENDPOINT SECURITY BREACH // MINE DEFLAGRATED", "sec");
      // Reveal all mines
      nextBoard.forEach((c) => { if (c.isMine) c.isRevealed = true; });
    } else {
      revealCell(nextBoard, id);
      checkWin(nextBoard);
    }
    setBoard(nextBoard);
  };

  const revealCell = (grid, id) => {
    const cell = grid[id];
    if (cell.isRevealed) return;
    cell.isRevealed = true;

    if (cell.adjacentMines === 0 && !cell.isMine) {
      const x = id % size;
      const y = Math.floor(id / size);
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
            revealCell(grid, ny * size + nx);
          }
        }
      }
    }
  };

  const handleFlag = (e, id) => {
    e.preventDefault();
    if (gameOver || win) return;
    playSynthBeep(880, 'sine', 0.04);
    
    let nextBoard = [...board];
    const cell = nextBoard[id];
    if (cell.isRevealed) return;
    
    cell.isFlagged = !cell.isFlagged;
    setBoard(nextBoard);
  };

  const checkWin = (grid) => {
    const hasWon = grid.every((c) => c.isMine || c.isRevealed);
    if (hasWon) {
      setWin(true);
      playSynthBeep(880, 'sine', 0.25);
      triggerToast?.("SEC_AUDIT SUCCESS // ALL PACKET NETWORKS COMPLIANT", "sec");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none">
      <div className="flex items-center justify-between w-full max-w-xs border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">SECOPS_SANDBOX: SWEOPER</span>
        <span className="font-mono text-xs text-telemetry-white font-bold">{gameOver ? 'SYS_CRASHED' : win ? 'SYS_SECURED' : 'THREATS: 10'}</span>
      </div>

      {!gameStarted || gameOver || win ? (
        <button
          onClick={initBoard}
          className="w-full max-w-xs h-36 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest transition-colors gap-2"
        >
          <span>{win ? 'SUCCESS: SECURED' : gameOver ? 'THREAT DETECTED' : '[Boot Threat Sweeper]'}</span>
          <span className="text-[9px] text-[#71717A] tracking-normal lowercase border border-white/5 px-2 py-0.5 rounded bg-black/45">click to initialize matrix audit</span>
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          {/* Sweeper Grid */}
          <div className="grid grid-cols-8 gap-1 p-1 border border-white/10 rounded-xl bg-black/45">
            {board.map((cell) => (
              <button
                key={cell.id}
                onClick={() => handleCellClick(cell.id)}
                onContextMenu={(e) => handleFlag(e, cell.id)}
                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-[9px] border font-bold transition-all ${
                  cell.isRevealed 
                    ? cell.isMine 
                      ? 'border-red-500/50 bg-red-950/20 text-red-500 font-extrabold animate-bounce' 
                      : 'border-white/5 bg-[#121212] text-telemetry-silver' 
                    : cell.isFlagged 
                      ? 'border-telemetry-accent bg-telemetry-accent/10 text-telemetry-accent shadow-glow-emerald animate-pulse' 
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 text-transparent'
                }`}
              >
                {cell.isRevealed 
                  ? cell.isMine 
                    ? '✕' 
                    : cell.adjacentMines || '' 
                  : cell.isFlagged 
                    ? '⚐' 
                    : ''}
              </button>
            ))}
          </div>
          <span className="font-mono text-[8px] text-[#52525B]">DESKTOP: CLICK TO REVEAL // RIGHT CLICK TO FLAG THREAT // MOBILE: LONG PRESS TO FLAG</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 4. IT SUPPORT TICKET SLA RUN (Frosted Arcade #4)
// ----------------------------------------------------
function TicketSpeedrun({ triggerToast }) {
  const [activeTicket, setActiveTicket] = useState(null);
  const [slaHealth, setSlaHealth] = useState(100);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const mockTickets = [
    {
      issue: 'M365 accounts locked out due to OneDrive deployment compliance anomalies.',
      options: [
        { label: 'Reset Intune compliance config', isCorrect: true },
        { label: 'Re-image endpoints gateway routes', isCorrect: false },
        { label: 'Force SaaS Alerts isolation pings', isCorrect: false }
      ]
    },
    {
      issue: 'Cisco Meraki remote branch office gateway loses route trace connection.',
      options: [
        { label: 'Restart DNS edge cache', isCorrect: false },
        { label: 'Check physical ethernet Layer 2 pathing', isCorrect: true },
        { label: 'Audit Entra lifecycle group credentials', isCorrect: false }
      ]
    },
    {
      issue: 'Cyber threat isolated container alerts reported on Windows endpoint.',
      options: [
        { label: 'Purge Cloudflare edges', isCorrect: false },
        { label: 'Run SentinelOne threat isolation remediation', isCorrect: true },
        { label: 'Rewrite local KB standardized runbooks', isCorrect: false }
      ]
    },
    {
      issue: 'Technical new hire fails VPN auth tunnel checks due to access policy changes.',
      options: [
        { label: 'Audit Entra ID Conditional Access policies', isCorrect: true },
        { label: 'Reset local Ollama LLM RAG database', isCorrect: false },
        { label: 'Execute BitLocker recovery keys', isCorrect: false }
      ]
    }
  ];

  const spawnTicket = () => {
    const idx = Math.floor(Math.random() * mockTickets.length);
    setActiveTicket(mockTickets[idx]);
  };

  const handleOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 10);
      playSynthBeep(880, 'sine', 0.1);
      triggerToast?.("SLA RESOLUTION DETECTED // TICKET CLOSED", "cmd");
    } else {
      setSlaHealth((prev) => Math.max(0, prev - 25));
      playSynthBeep(220, 'triangle', 0.25);
      triggerToast?.("SLA BREACH ALERT // MISMATCHED TOOL DIRECTIVE", "sec");
    }

    if (slaHealth - (isCorrect ? 0 : 25) <= 0) {
      setGameOver(true);
    } else {
      spawnTicket();
    }
  };

  const startGame = () => {
    setScore(0);
    setSlaHealth(100);
    setGameOver(false);
    setGameStarted(true);
    spawnTicket();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none">
      <div className="flex items-center justify-between w-full max-w-sm border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">TELEMETRY_SPEEDRUN: SUPPORT_RUN</span>
        <div className="flex gap-4 font-mono text-xs font-bold text-telemetry-white">
          <span>SCORE: {score}</span>
          <span>SLA: <strong className={slaHealth <= 25 ? 'text-red-500 font-extrabold animate-pulse' : 'text-telemetry-accent'}>{slaHealth}%</strong></span>
        </div>
      </div>

      {!gameStarted || gameOver ? (
        <button
          onClick={startGame}
          className="w-full max-w-sm h-36 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest transition-colors gap-2"
        >
          <span>{gameOver ? 'SLA FAILED: SYSTEM OFFLINE' : '[Boot SLA Speedrun]'}</span>
          <span className="text-[9px] text-[#71717A] tracking-normal lowercase border border-white/5 px-2 py-0.5 rounded bg-black/45">resolve incoming infrastructure tickets</span>
        </button>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-sm">
          {/* Ticket Body */}
          <div className="border border-white/5 bg-black/45 rounded-xl p-4 font-mono text-[10px] text-telemetry-silver text-left flex flex-col gap-2">
            <span className="text-telemetry-accent font-bold uppercase select-none">[INCOMING_TICKET]:</span>
            <p className="leading-relaxed leading-normal">{activeTicket.issue}</p>
          </div>

          {/* SLA Options list */}
          <div className="flex flex-col gap-2 w-full">
            {activeTicket.options.map((opt, oIdx) => (
              <button
                key={oIdx}
                onClick={() => handleOptionClick(opt.isCorrect)}
                className="w-full h-10 border border-white/5 bg-white/[0.01] hover:border-telemetry-accent hover:text-telemetry-accent rounded-lg font-mono text-[10px] uppercase select-none active:scale-98 transition-all"
              >
                [{opt.label}]
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 5. DECRYPTION CYPHER MINI-GAME (Frosted Puzzle #5)
// ----------------------------------------------------
function DecryptionLock({ triggerToast }) {
  const targetCode = "SECURE";
  const [cypherStr, setCypherStr] = useState("XXXXXX");
  const [lockedIndex, setLockedIndex] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (!gameStarted || win || gameOver) return;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$";
    const interval = setInterval(() => {
      setCypherStr((prev) => {
        let nextStr = prev.split('');
        for (let i = lockedIndex; i < targetCode.length; i++) {
          nextStr[i] = chars[Math.floor(Math.random() * chars.length)];
        }
        return nextStr.join('');
      });
    }, 70);

    return () => clearInterval(interval);
  }, [gameStarted, lockedIndex, win, gameOver]);

  const handleDecryptClick = () => {
    if (!gameStarted || win || gameOver) return;
    playSynthBeep(680, 'sine', 0.08);

    const currentChar = cypherStr[lockedIndex];
    const targetChar = targetCode[lockedIndex];

    if (currentChar === targetChar) {
      setLockedIndex((prev) => {
        const next = prev + 1;
        if (next >= targetCode.length) {
          setWin(true);
          playSynthBeep(980, 'sine', 0.25);
          triggerToast?.("CREDENTIAL INTEGRITY VERIFIED // CODE DECRYPTED", "sec");
        }
        return next;
      });
    } else {
      // Failed decryptions, penalty
      setGameOver(true);
      playSynthBeep(120, 'triangle', 0.4);
      triggerToast?.("CREDENTIAL DECRYPTION ERROR // CODE CORRUPTED", "sec");
    }
  };

  const startCypher = () => {
    setCypherStr("XXXXXX");
    setLockedIndex(0);
    setWin(false);
    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none">
      <div className="flex items-center justify-between w-full max-w-xs border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">CYPHER_LOCK: INTEGRITY</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">NODE: {lockedIndex}/6</span>
      </div>

      {!gameStarted || gameOver || win ? (
        <button
          onClick={startCypher}
          className="w-full max-w-xs h-36 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest transition-colors gap-2"
        >
          <span>{win ? 'DECRYPTED: SUCCESS' : gameOver ? 'DECRYPTION CRITICAL' : '[Boot Cipher Key]'}</span>
          <span className="text-[9px] text-[#71717A] tracking-normal lowercase border border-white/5 px-2 py-0.5 rounded bg-black/45">decrypt credential lock cluster</span>
        </button>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full max-w-xs">
          {/* Decryption Code box */}
          <div className="border border-white/5 bg-black/45 rounded-xl p-6 font-mono text-2xl font-bold tracking-widest text-telemetry-white flex justify-center gap-1">
            {cypherStr.split('').map((char, idx) => {
              const isLocked = idx < lockedIndex;
              return (
                <span 
                  key={idx}
                  className={`inline-block px-1 rounded ${isLocked ? 'text-telemetry-accent bg-telemetry-accent/5 font-extrabold border border-telemetry-accent/20 animate-pulse' : 'text-[#71717A]'}`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <button
            onClick={handleDecryptClick}
            className="w-full h-11 border border-telemetry-accent bg-telemetry-accent/5 hover:bg-telemetry-accent hover:text-telemetry-bg rounded-lg font-mono text-xs uppercase font-bold tracking-widest transition-all active:scale-98"
          >
            [DECRYPT LOCK INDEX_{lockedIndex}]
          </button>
          <span className="font-mono text-[8px] text-[#52525B]">LOCK COLUMN AT TARGET CODE CHARACTERS (T-CODE: S E C U R E)</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 6. MERAKI ROUTING CONNECTOR PUZZLE (Frosted Puzzle #6)
// ----------------------------------------------------
function RouteConnector({ triggerToast }) {
  // 4x4 matrix grid routing connection pipe directions
  const size = 4;
  const initialPipes = [
    '—', 'L', '|', 'L',
    '|', '—', '|', '—',
    'L', '|', 'L', '|',
    '—', 'L', '—', '—'
  ];
  const targetPipeGrid = [
    '—', '—', '—', '—',
    '|', '|', '|', '|',
    'L', 'L', 'L', 'L',
    '—', '—', '—', '—'
  ]; // Dummy check or simplified rotate alignment
  
  const [grid, setGrid] = useState(initialPipes);
  const [win, setWin] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const rotatePipe = (idx) => {
    if (win) return;
    playSynthBeep(620, 'sine', 0.05);
    
    let nextGrid = [...grid];
    const pipe = nextGrid[idx];
    
    const rotates = {
      '|': '—',
      '—': 'L',
      'L': '+',
      '+': '|'
    };
    
    nextGrid[idx] = rotates[pipe];
    setGrid(nextGrid);
    
    // Check solved status
    const solved = nextGrid.every((p, i) => p === targetPipeGrid[i] || p === '+'); // Easy threshold check
    if (solved) {
      setWin(true);
      playSynthBeep(880, 'sine', 0.2);
      triggerToast?.("CISCO ROUTING OPTIMIZED // GATEWAY STABLE", "sec");
    }
  };

  const startGame = () => {
    setGrid(initialPipes);
    setWin(false);
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none">
      <div className="flex items-center justify-between w-full max-w-xs border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">CISCO_ROUTING: CONNECTORS</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">{win ? 'ROUTE_OPTIMIZED' : 'ALIGN: 100%'}</span>
      </div>

      {!gameStarted || win ? (
        <button
          onClick={startGame}
          className="w-full max-w-xs h-36 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest transition-colors gap-2"
        >
          <span>{win ? 'GATEWAY CONNECTED' : '[Boot Cisco Router]'}</span>
          <span className="text-[9px] text-[#71717A] tracking-normal lowercase border border-white/5 px-2 py-0.5 rounded bg-black/45">rotate pipe lines to bridge connection</span>
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          {/* Pipeline grid */}
          <div className="grid grid-cols-4 gap-1.5 p-1.5 border border-white/10 rounded-xl bg-black/45">
            {grid.map((pipe, idx) => (
              <button
                key={idx}
                onClick={() => rotatePipe(idx)}
                className="w-9 h-9 rounded-lg border border-white/5 bg-[#121212] font-mono text-xs text-telemetry-silver hover:border-telemetry-accent hover:text-telemetry-accent transition-colors flex items-center justify-center select-none"
              >
                {pipe}
              </button>
            ))}
          </div>
          <span className="font-mono text-[8px] text-[#52525B]">CLICK CONNECTORS TO ROTATE ALIGNMENTS AND BRIDGING ROUTES</span>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 8. ENTROPY FORGE PASSWORD GENERATOR (Security Utility)
// ----------------------------------------------------
function PasswordForge({ triggerToast }) {
  const [passLength, setPassLength] = useState(16);
  const [passStr, setPassStr] = useState("p@ssw0rdForgeKey!");
  const [entropy, setEntropy] = useState(72.4);

  const generatePass = () => {
    playSynthBeep(820, 'sine', 0.05);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~}{[]:;?><";
    let nextPass = "";
    for (let i = 0; i < passLength; i++) {
      nextPass += chars[Math.floor(Math.random() * chars.length)];
    }
    setPassStr(nextPass);
    
    // Shannon Entropy: H = -sum(p_i * log2(p_i))
    // Simplifies for random string selection: length * log2(character pool size)
    const log2Pool = Math.log2(chars.length);
    const shannon = parseFloat((passLength * log2Pool).toFixed(1));
    setEntropy(shannon);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(passStr);
    playSynthBeep(980, 'sine', 0.1);
    triggerToast?.(`PASSWORD COPIED TO CLIPBOARD // ENTROPY: ${entropy} BITS`, "sec");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">SECURITY_FORGE: CRYPTKEY</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">KEY_ENTROPY: {entropy} BITS</span>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Output box */}
        <div className="border border-white/5 bg-black/45 rounded-xl p-4 font-mono text-[11px] text-telemetry-white flex items-center justify-between gap-3 select-text select-all break-all">
          <span>{passStr}</span>
          <button 
            onClick={copyToClipboard}
            className="px-2.5 py-1 rounded bg-white/[0.02] border border-white/5 text-[9px] uppercase tracking-widest text-[#71717A] hover:text-telemetry-accent hover:border-telemetry-accent select-none"
          >
            [Copy]
          </button>
        </div>

        {/* Sliders length */}
        <div className="flex flex-col gap-1.5 font-mono text-[10px] text-[#A1A1AA] w-full">
          <div className="flex justify-between items-center select-none">
            <span>KEY_LENGTH: {passLength} CHARACTERS</span>
            <span>SHANNON_SCORE: <strong className={entropy >= 100 ? 'text-telemetry-accent' : 'text-yellow-500'}>{entropy >= 100 ? 'HIGH' : 'STRONG'}</strong></span>
          </div>
          <input 
            type="range" 
            min="8" 
            max="32" 
            value={passLength}
            onChange={(e) => setPassLength(parseInt(e.target.value))}
            className="w-full h-1.5 bg-[#27272A] rounded-lg appearance-none cursor-pointer text-telemetry-accent"
          />
        </div>

        <button
          onClick={generatePass}
          className="w-full h-11 border border-telemetry-accent bg-telemetry-accent/5 hover:bg-telemetry-accent hover:text-telemetry-bg rounded-lg font-mono text-xs uppercase font-bold tracking-widest transition-all active:scale-98"
        >
          [GENERATE SECURE KEYPASS]
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 9. LATENCY PING SPEEDTESTER (Telemetry Utility)
// ----------------------------------------------------
function PingLatency({ triggerToast }) {
  const [testing, setTesting] = useState(false);
  const [pings, setPings] = useState({ edge: 0, google: 0 });

  const runTest = () => {
    setTesting(true);
    setPings({ edge: 0, google: 0 });
    playSynthBeep(650, 'sine', 0.05);

    setTimeout(() => {
      setPings((prev) => ({ ...prev, edge: 11 }));
      playSynthBeep(880, 'sine', 0.05);
    }, 800);

    setTimeout(() => {
      setPings((prev) => ({ ...prev, google: 24 }));
      playSynthBeep(980, 'sine', 0.15);
      setTesting(false);
      triggerToast?.("EDGE LATENCY AUDIT SWEEP COMPLETED // NETWORK NOMINAL", "cmd");
    }, 1600);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">TELEMETRY_LATENCY: CDNPING</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">STATUS: {testing ? 'PINGING_EDGE...' : 'STABLE'}</span>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Latency rows */}
        <div className="flex flex-col gap-3">
          {[
            { label: 'cloudflare-dns.net (EDGE_ROUTER)', value: pings.edge },
            { label: 'google-cdn.com (PUBLIC_SERVR)', value: pings.google }
          ].map((n, idx) => (
            <div 
              key={idx}
              className="border border-white/5 bg-black/45 rounded-xl p-3 flex justify-between items-center font-mono text-[10px] text-telemetry-silver"
            >
              <span>{n.label}</span>
              <span className={n.value > 0 ? 'text-telemetry-accent font-extrabold text-xs' : 'text-[#3F3F46]'}>
                {n.value > 0 ? `${n.value}ms` : '0ms'}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={runTest}
          disabled={testing}
          className="w-full h-11 border border-telemetry-accent bg-telemetry-accent/5 hover:bg-telemetry-accent hover:text-telemetry-bg rounded-lg font-mono text-xs uppercase font-bold tracking-widest transition-all active:scale-98 disabled:opacity-40 disabled:pointer-events-none"
        >
          [START LATENCY SWEEP]
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 10. RETRO CRT SCANLINE MONITOR TOGGLER (HUD System)
// ----------------------------------------------------
function CrtToggler({ triggerToast }) {
  const [crtActive, setCrtActive] = useState(false);

  const handleToggle = () => {
    const nextState = !crtActive;
    setCrtActive(nextState);
    
    // Toggle class globally on HTML document element
    const html = document.documentElement;
    if (nextState) {
      html.classList.add('crt-scanline-active');
      triggerToast?.("CRT TERM_SCAN EMULATION: ON // BOOTING CATHODE RAY PHOSPHORS", "cmd");
      playSynthBeep(440, 'triangle', 0.25);
    } else {
      html.classList.remove('crt-scanline-active');
      triggerToast?.("CRT TERM_SCAN EMULATION: OFF // RESTORING LIQUID MATRIX DIODE", "cmd");
      playSynthBeep(880, 'sine', 0.15);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">SYS_HUD: CRT_SCANLINE</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">STATE: {crtActive ? 'CRT_ACTIVE' : 'LCD_DEFAULT'}</span>
      </div>

      <div className="flex flex-col gap-4 text-center items-center py-4">
        <MonitorCheck size={36} className="text-telemetry-accent animate-pulse" />
        <p className="font-sans text-xs md:text-sm text-telemetry-silver max-w-xs leading-relaxed">
          Toggle the global administrative console class wrapper to shift Brendan's entire website theme back to an authentic, glowing CRT monitor overlay!
        </p>

        <button
          onClick={handleToggle}
          className="w-full max-w-xs h-12 border border-telemetry-accent bg-telemetry-accent/5 hover:bg-telemetry-accent hover:text-telemetry-bg rounded-lg font-mono text-xs uppercase font-bold tracking-widest transition-all active:scale-98"
        >
          [TOGGLE CRT TERM_SCAN]
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 11. CORPORATE BUZZWORD TRANSLATOR (HUD Decryptor)
// ----------------------------------------------------
function BuzzwordDecoder({ triggerToast }) {
  const [jargon, setJargon] = useState('');
  const [decodeText, setDecodeText] = useState('LOG: Awaiting business coordinate entries...');

  const decodeJargon = () => {
    if (!jargon.trim()) return;
    playSynthBeep(780, 'sine', 0.05);

    const dictionary = [
      'TRANSLATION: Server room experienced catastrophic fire, rebooting backups.',
      'TRANSLATION: Customer called Outlook profile corrupt, resetting VPN lifecycle.',
      'TRANSLATION: Executing automated runbook scripts so I can stop resolving this ticket.',
      'TRANSLATION: Cloudflare edges are down, DNS Cache flushed twice.',
      'TRANSLATION: I reset the VPN three times, have you tried turning it off and on again?'
    ];

    const idx = Math.floor(Math.random() * dictionary.length);
    setDecodeText(dictionary[idx]);
    triggerToast?.("CORPORATE DIRECTIVE DECRYPTED // JARGON DECODER SUCCESS", "cmd");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">DECRYPT_JARGON: CODECO</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">STATUS: NOMINAL</span>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Input box */}
        <input 
          type="text"
          value={jargon}
          onChange={(e) => setJargon(e.target.value)}
          placeholder="Paste corporate buzzwords here (e.g. leverage synergies)..."
          className="w-full h-11 px-4 border border-white/5 bg-black/45 rounded-xl font-mono text-[10px] text-telemetry-white outline-none placeholder-[#3F3F46] select-text"
        />

        <button
          onClick={decodeJargon}
          className="w-full h-11 border border-telemetry-accent bg-telemetry-accent/5 hover:bg-telemetry-accent hover:text-telemetry-bg rounded-lg font-mono text-xs uppercase font-bold tracking-widest transition-all active:scale-98"
        >
          [DECODE JARGON PHRASE]
        </button>

        {/* Output panel */}
        <div className="border border-white/5 bg-black/45 rounded-xl p-4 font-mono text-[10px] text-left text-telemetry-accent min-h-[50px] leading-relaxed select-text">
          {decodeText}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 12. HOMELAB SYNTHESIZER SOUNDBOARD (HUD Sound Matrix)
// ----------------------------------------------------
function SoundMatrix() {
  const notes = [
    { label: 'SYS_BOOT', freq: 440, type: 'sine', dur: 0.15 },
    { label: 'SSL_HS', freq: 650, type: 'sine', dur: 0.1 },
    { label: 'DNS_HIT', freq: 880, type: 'sine', dur: 0.08 },
    { label: 'INTUNE_OK', freq: 980, type: 'sine', dur: 0.2 },
    { label: 'PORT_WARN', freq: 330, type: 'triangle', dur: 0.25 },
    { label: 'SLA_ERR', freq: 220, type: 'sawtooth', dur: 0.35 },
    { label: 'SEC_PING', freq: 520, type: 'sine', dur: 0.08 },
    { label: 'NOMINAL', freq: 720, type: 'sine', dur: 0.12 }
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">SYS_AUDIO: SYNTHBOARD</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">DEVICES: SYNTH_ONLINE</span>
      </div>

      {/* Grid sound buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full">
        {notes.map((n, idx) => (
          <button
            key={idx}
            onClick={() => playSynthBeep(n.freq, n.type, n.dur)}
            className="h-14 rounded-xl border border-white/5 bg-white/[0.01] hover:border-telemetry-accent hover:text-telemetry-accent hover:shadow-glow-emerald font-mono text-[9px] uppercase tracking-widest flex items-center justify-center select-none active:scale-95 transition-all"
          >
            [{n.label}]
          </button>
        ))}
      </div>
      <span className="font-mono text-[8px] text-[#52525B]">CLICK DIRECTLY ON SOUND COORDINATES TO RUN SYNTH AUDIO CHIRPS</span>
    </div>
  );
}

// ----------------------------------------------------
// 13. BINARY DIGITAL RAIN SCREENSAVER (HUD Background #14)
// ----------------------------------------------------
function BinaryRain({ triggerToast }) {
  const canvasRef = useRef(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (running) {
      html.classList.add('matrix-rain-active');
    } else {
      html.classList.remove('matrix-rain-active');
    }
    return () => {
      html.classList.remove('matrix-rain-active');
    };
  }, [running]);

  useEffect(() => {
    if (!running) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const columns = Math.floor(canvas.width / 16);
    // Initialize drops at random negative coordinates for asynchronous start delays
    const drops = Array.from({ length: columns }).map(() => Math.random() * -20);

    let lastTime = 0;
    const frameDelay = 75; // Relaxed speed limit (~13 FPS) for that premium retro dashboard vibe

    const draw = (timestamp) => {
      animationFrameId = requestAnimationFrame(draw);

      if (!timestamp) timestamp = performance.now();
      const elapsed = timestamp - lastTime;
      if (elapsed < frameDelay) return;
      lastTime = timestamp - (elapsed % frameDelay);

      // Symmetrical fading black trail mask overlay
      ctx.fillStyle = 'rgba(7, 7, 8, 0.12)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#3B82F6'; // Match Corporate Cobalt Blue Theme
      ctx.font = '10px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        const x = i * 16;
        const y = drops[i] * 16;

        if (y >= 0) {
          ctx.fillText(text, x, y);
        }

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [running]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">HUD_SCREEN: BIN_RAIN</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">STATE: {running ? 'ONLINE_BG' : 'STANDBY'}</span>
      </div>

      {!running ? (
        <button
          onClick={() => {
            setRunning(true);
            playSynthBeep(880, 'sine', 0.2);
            triggerToast?.("MATRIX BINARY RAIN ACTIVATED // FULL SCREEN BACKGROUND NOMINAL", "cmd");
          }}
          className="w-full h-36 rounded-xl border border-white/10 bg-white/[0.01] hover:bg-white/[0.03] flex items-center justify-center font-mono text-xs uppercase text-telemetry-accent tracking-widest transition-colors select-none"
        >
          [Execute Binary Rain Screensaver]
        </button>
      ) : (
        <div className="w-full h-36 rounded-xl border border-telemetry-accent bg-telemetry-accent/5 flex flex-col items-center justify-center gap-2 select-none animate-pulse">
          <span className="font-mono text-xs text-telemetry-accent font-bold">MATRIX MATRIX_SYNC ACTIVE</span>
          <span className="font-mono text-[9px] text-[#A1A1AA] lowercase">rendering background binary columns</span>
        </div>
      )}

      {running && (
        <>
          {/* Full Screen Matrix Canvas overlay fixed in backdrop z-0 via React Portal */}
          {createPortal(
            <canvas 
              ref={canvasRef} 
              className="fixed inset-0 w-screen h-screen pointer-events-none z-0 bg-[#070708]/95"
            />,
            document.body
          )}
          <button
            onClick={() => {
              setRunning(false);
              playSynthBeep(440, 'sine', 0.1);
            }}
            className="font-mono text-[9px] uppercase tracking-widest text-[#71717A] hover:text-telemetry-white mt-1 active:scale-95 transition-all"
          >
            [Exit Matrix Screensaver]
          </button>
        </>
      )}
    </div>
  );
}

// ----------------------------------------------------
// 14. THE SYSLOG ORACLE IT FORTUNE TELLER (Archives #16)
// ----------------------------------------------------
function SyslogOracle({ triggerToast }) {
  const [question, setQuestion] = useState('');
  const [logResponse, setLogResponse] = useState('LOG: Ask the syslog oracle for network alignment coordinates...');

  const queryOracle = (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    playSynthBeep(620, 'sine', 0.05);

    const outcomes = [
      'SYS_ORACLE: SUCCESS. Uptime guaranteed by absolute administrative luck.',
      'SYS_ORACLE: ERROR. DNS cache resolves directly to a cold coffee cup.',
      'SYS_ORACLE: NOMINAL. Rebooting the local server stack fixes this anomaly.',
      'SYS_ORACLE: ACCESS_DENIED. Entra ID lifecycle group requires coffee token.',
      'SYS_ORACLE: WARNING. Firewall isolations sweep shows recruiters will offer jobs.'
    ];

    const idx = Math.floor(Math.random() * outcomes.length);
    setLogResponse(outcomes[idx]);
    setQuestion('');
    triggerToast?.("SYS_ORACLE: TELEMETRY SYNC COMPLETE", "sec");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">SYS_ORACLE: CONSOLE</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">STATE: NOMINAL</span>
      </div>

      <div className="w-full flex flex-col gap-4">
        {/* Input box */}
        <form onSubmit={queryOracle} className="flex gap-2">
          <input 
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask syslog oracle a question (e.g. Will I get hired?)..."
            className="flex-1 h-11 px-4 border border-white/5 bg-black/45 rounded-xl font-mono text-[10px] text-telemetry-white outline-none placeholder-[#3F3F46] select-text"
          />
          <button
            type="submit"
            className="px-4 rounded-xl border border-telemetry-accent text-telemetry-accent hover:bg-telemetry-accent hover:text-telemetry-bg text-xs font-mono select-none transition-all active:scale-95"
          >
            [ASK]
          </button>
        </form>

        {/* Output panel */}
        <div className="border border-white/5 bg-black/45 rounded-xl p-4 font-mono text-[10px] text-left text-telemetry-accent min-h-[50px] leading-relaxed select-text">
          {logResponse}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 15. ADMINISTRATIVE KB RUNBOOKS ARCHIVE (Archives #19)
// ----------------------------------------------------
function RunbookKB() {
  const [activeRb, setActiveRb] = useState(0);

  const runbooks = [
    {
      title: 'SOP-01: User spilled coffee on laptop keyboard',
      steps: [
        '1. Force isolate target host from local network gateway.',
        '2. Execute immediate power down sequence (press and hold 10s).',
        '3. Invert device X-axis to drain coffee coordinates.',
        '4. Author syslog error report: "Keyboard hydration testing failed."',
        '5. Re-provision desktop asset from corporate reserve inventory.'
      ]
    },
    {
      title: 'SOP-02: Escalated ticket VPN handshake failure',
      steps: [
        '1. Verify DNS edge caching resolves Cloudflare Edge route checks.',
        '2. Audit Microsoft Entra ID Conditional Access rules lifecycle.',
        '3. Have user reset home router node (unplug 30s).',
        '4. Ask user: "Is target endpoint actually connected to WiFi?"',
        '5. Close ticket with tag: "User resolved connection cluster manually."'
      ]
    },
    {
      title: 'SOP-03: The VIP\'s password keeps "changing itself"',
      steps: [
        '1. Smile and nod supportively during the technical incident debrief.',
        '2. Check active directory lockout logs to discover 47 failed attempts in 2 minutes.',
        '3. Gently point out that Caps Lock is illuminated like a Christmas tree.',
        '4. Reset password to "Password123!" and advise user to "monitor neural lock framework."',
        '5. Close ticket: "External interface anomaly resolved via tactile config correction."'
      ]
    },
    {
      title: 'SOP-04: Printer emitting strange rhythmic clicking sounds',
      steps: [
        '1. Do not make direct eye contact with the device; it senses administrative fear.',
        '2. Verify paper tray is loaded with organic tree leaves instead of plastic binders.',
        '3. Discover an entire box of standard metal paperclips dropped into the toner drum.',
        '4. Shake the toner container vigorously while humming corporate hold music.',
        '5. Close ticket: "Acoustic calibration successfully restored to baseline silence."'
      ]
    },
    {
      title: 'SOP-05: User reporting "The Internet is completely out of gas"',
      steps: [
        '1. Open command prompt and ping 8.8.8.8 to assert global connectivity state.',
        '2. Discover local workstation is connected to a smart-fridge guest network interface.',
        '3. Walk to the desk and plug in the glowing blue ethernet cable lying on the floor.',
        '4. Tell user: "We have purged the local bandwidth pipelines to restore throughput."',
        '5. Close ticket: "Physical data conduit re-synchronized with edge gateway."'
      ]
    },
    {
      title: 'SOP-06: Keyboard keys registering "wrong characters" (WASD edition)',
      steps: [
        '1. Verify user did not accidentally toggle standard input layout to Slovak QWERTY.',
        '2. Discover keycaps for W and S have been physically swapped by a malicious colleague.',
        '3. Carefully pry keycaps off using a standard plastic asset wedge.',
        '4. Snap keycaps back into their correct geographical coordinates.',
        '5. Close ticket: "Tactile alphabetical hardware arrays aligned to default English."'
      ]
    },
    {
      title: 'SOP-07: The "Everything is slow" generic ticket sweep',
      steps: [
        '1. Run diagnostic command "systeminfo" to check system telemetry uptime.',
        '2. Gasps in horror to find active host uptime is 342 days, 11 hours, 42 minutes.',
        '3. Explain the fundamental physical law of "Turning it off and on again."',
        '4. Initiate automated administrative restart sequence.',
        '5. Close ticket: "Operational memory leaks purged. Host returned to space-time continuum."'
      ]
    },
    {
      title: 'SOP-08: Dual monitor display "not showing my windows"',
      steps: [
        '1. Listen to user explain how their third monitor has suddenly "died."',
        '2. Press the physical power button on the bezel of the dark screen.',
        '3. Watch screen illuminate instantly, showing 43 open Excel sheets.',
        '4. Tell user: "The cathode ray diode required a manual electrostatic discharge sync."',
        '5. Close ticket: "Hardware visual interface state restored via tactical tactile toggle."'
      ]
    },
    {
      title: 'SOP-09: Smart speaker in board room repeating executive plans',
      steps: [
        '1. Isolate board room smart speaker node from main corporate directory domain.',
        '2. Wrap device carefully in premium standard-grade aluminium foil to prevent RF leakage.',
        '3. Re-label speaker: "Static paperweight asset #9482."',
        '4. Advise executives to communicate via physical handwritten monospaced notes.',
        '5. Close ticket: "Cognitive listener node permanently decommissioned from board array."'
      ]
    },
    {
      title: 'SOP-10: User clicked link promising "Free corporate coffee machines"',
      steps: [
        '1. Instantly trigger SentinelOne host isolation protocols to quarantine endpoint.',
        '2. Force complete password reset chain across Microsoft Entra ID directory.',
        '3. Run comprehensive local malware scanner to delete suspicious .exe downloads.',
        '4. Deliver physical manual: "Phishing emails and you: Coffee is never free."',
        '5. Close ticket: "Quarantined threat node neutralized before lateral movement."'
      ]
    },
    {
      title: 'SOP-11: Homelab server cabinet emitting high warning whistle',
      steps: [
        '1. Verify homelab dashboard shows thermal operational states are nominal.',
        '2. Discover server cabinet fan shroud has sucked in a standard cardboard shipping label.',
        '3. Carefully detach label to stop the pneumatic harmonic resonance whistle.',
        '4. Clean homelab fans with compressed air while coughing dramatically.',
        '5. Close ticket: "Aerodynamic airflow obstacles cleared. Noise levels: SILENT."'
      ]
    },
    {
      title: 'SOP-12: The "Outlook is haunted" email sync mystery',
      steps: [
        '1. Open Outlook profile properties to audit cache indexing state.',
        '2. Find user has created a rule to forward all emails from boss to the recycling bin.',
        '3. Disable "Ghost Forwarding Rule" without revealing user\'s configuration mistake.',
        '4. Tell user: "We have exorcised the corrupt mailbox cache indexes from exchange edge."',
        '5. Close ticket: "Mail flow anomaly resolved. Paranormal Outlook activities terminated."'
      ]
    },
    {
      title: 'SOP-13: Mouse cursor drifting slowly toward bottom-right quadrant',
      steps: [
        '1. Audit device manager to check for virtual mouse emulation scripts.',
        '2. Discover physical mouse optical sensor is resting on an empty shiny donut wrapper.',
        '3. Clean desk space and place mouse on a standard neoprene pad asset.',
        '4. Tell user: "Re-calibrated optical coordinate tracking vectors on edge hardware."',
        '5. Close ticket: "Cursor drifting neutralized via physical optical path clearing."'
      ]
    },
    {
      title: 'SOP-14: Microsoft Teams camera filters stuck in "Potato Mode"',
      steps: [
        '1. Verify video preview inside Teams client configurations settings.',
        '2. Laugh silently at the virtual potato face talking to you.',
        '3. Purge app data cache folders for Microsoft Teams inside %appdata%.',
        '4. Restart Teams application to restore default standard human video filters.',
        '5. Close ticket: "User successfully unmasked from root vegetable state."'
      ]
    },
    {
      title: 'SOP-15: Wi-Fi connection drops whenever breakroom microwave operates',
      steps: [
        '1. Note that the breakroom access point is operating on standard 2.4GHz spectrum.',
        '2. Migrate corporate SSID channel ranges to 5GHz bands to avoid RF interference.',
        '3. Tape advisory note to microwave: "Do not reheat burritos during active Teams calls."',
        '4. Verify network signal levels are now nominal during breakroom lunch hours.',
        '5. Close ticket: "Electromagnetic radiation spectrum collisions bypassed."'
      ]
    },
    {
      title: 'SOP-16: User reporting "My desktop background changed to a cat"',
      steps: [
        '1. Inspect workstation log events for active network directory group policies.',
        '2. Discover workstation was left unlocked during break, enabling Office Prank protocol.',
        '3. Restore default corporate wallpaper background image.',
        '4. Lock screen using shortcut Win + L to demonstrate security posture compliance.',
        '5. Close ticket: "Desktop aesthetic restored. Workstation locking habit trained."'
      ]
    },
    {
      title: 'SOP-17: Bluetooth headphones disconnected and user hearing music on speakers',
      steps: [
        '1. Pause audio stream before user plays anything highly unprofessional.',
        '2. Force Bluetooth pairing scan between user headset and target computer asset.',
        '3. Disable default audio mapping to physical motherboard auxiliary speakers.',
        '4. Put on headphones to verify sweet synth beats are playing safely on ear.',
        '5. Close ticket: "Audio telemetry routed back to private listening containers."'
      ]
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">SYS_KB: OPERATIONS_RUNBOOKS</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">NODES: {String(runbooks.length).padStart(2, '0')}_LOADED</span>
      </div>

      <div className="w-full flex flex-col gap-3">
        {runbooks.map((rb, idx) => (
          <div 
            key={idx}
            className="border border-white/5 bg-[#121212] rounded-xl overflow-hidden text-left"
          >
            <button
              onClick={() => {
                setActiveRb(activeRb === idx ? -1 : idx);
                playSynthBeep(600, 'sine', 0.05);
              }}
              className="w-full px-4 py-2.5 bg-white/[0.01] flex items-center justify-between font-mono text-[10px] text-telemetry-white uppercase font-bold"
            >
              <span>{rb.title}</span>
              <span>{activeRb === idx ? '[-]' : '[+]'}</span>
            </button>
            
            {activeRb === idx && (
              <div className="p-4 bg-black/45 border-t border-white/5 font-mono text-[9px] text-[#A1A1AA] flex flex-col gap-2 select-text">
                {rb.steps.map((step, sIdx) => (
                  <div key={sIdx} className="leading-relaxed leading-normal">{step}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 16. ADMINISTRATIVE CREDITS SCROLL DECRYPT (Archives #20)
// ----------------------------------------------------
function CreditsScroll() {
  const [scrollLines, setScrollLines] = useState([]);

  const lines = [
    'INITIATING DECRYPTION DIRECTIVE...',
    '======================================',
    'BRENDAN ZWONITZER - CORE ARCHITECT PORTFOLIO',
    'VITE + REACT 19 COMPILATION PIPELINE',
    'TAILWIND CSS V3 COBALT BLUE DESIGN SCHEME',
    'FRAMER MOTION SPRING DYNAMICS INTEGRATED',
    'LUCIDE NODE VECTOR LIBRARIES ATTACHED',
    'HTML5 CANVAS ANIMATED PARTICLE BACKDROP',
    'WEB AUDIO API REALTIME SOUND FX GENERATORS',
    '======================================',
    'SHA256 CHECKSUM VERIFIED // COMPILATION NOMINAL',
    'ALL SANDBOX PORTFOLIO SERVICES SECURED',
    'DECRYPTION DIRECTIVE SUCCESS. END SCROLL.'
  ];

  useEffect(() => {
    setScrollLines([]);
    playSynthBeep(780, 'sine', 0.08);
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        const lineContent = lines[currentLine]; // Capture synchronously to prevent React batching index mismatch
        setScrollLines((prev) => [...prev, lineContent]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center font-sans select-none w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between w-full border-b border-white/5 pb-2">
        <span className="font-mono text-xs text-[#71717A] uppercase tracking-wider">SYS_DECRYPT: CREDITS_LOG</span>
        <span className="font-mono text-xs text-telemetry-accent font-bold">STATUS: OK</span>
      </div>

      {/* Credit log terminal */}
      <div className="w-full border border-white/5 bg-black/45 rounded-xl p-4 font-mono text-[9px] text-left text-telemetry-silver flex flex-col gap-2 min-h-[140px] leading-relaxed select-text">
        {scrollLines.map((line, idx) => (
          <div 
            key={idx}
            className={line.includes('================') ? 'text-[#3F3F46] select-none' : line.includes('DECRYPTION') ? 'text-telemetry-accent font-bold' : ''}
          >
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}
