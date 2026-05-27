import React, { useState, useEffect } from 'react';

export default function StatusBanner() {
  const [cpuLoad, setCpuLoad] = useState(1.8);

  // Simulates minor system fluctuations in CPU load
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad((prev) => {
        const delta = Math.random() * 0.6 - 0.3;
        const next = prev + delta;
        return Math.max(1.2, Math.min(2.8, parseFloat(next.toFixed(1))));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Circle circumference is 2 * PI * r = 2 * 3.14159 * 7 = 44
  const radius = 7;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (cpuLoad / 3.0) * circumference;

  return (
    <div className="w-full flex items-center justify-between border-b border-white/5 bg-[#0A0A0B] px-6 py-4 select-none relative z-20">
      <div className="flex items-center">
        <span className="text-telemetry-white font-sans font-bold text-sm tracking-wide">
          Brendan Zwonitzer
        </span>
      </div>
      <div className="flex items-center gap-3">
        {/* HUD System Dial (Asset #7) */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#71717A]">
          <span>CPU_SYS: {cpuLoad}%</span>
          <svg className="w-4 h-4 transform -rotate-90 text-telemetry-accent" viewBox="0 0 20 20">
            <circle 
              cx="10" 
              cy="10" 
              r={radius} 
              fill="none" 
              stroke="rgba(255,255,255,0.05)" 
              strokeWidth="2" 
            />
            <circle 
              cx="10" 
              cy="10" 
              r={radius} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <span className="text-[#3F3F46] text-xs">|</span>
        <div className="flex items-center gap-2">
          <span className="text-[#A1A1AA] font-sans text-xs tracking-wide">Operational</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-telemetry-accent"></span>
          </span>
        </div>
      </div>
    </div>
  );
}
