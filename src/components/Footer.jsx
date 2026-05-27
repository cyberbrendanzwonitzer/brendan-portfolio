import React, { useState, useEffect } from 'react';
import { Award, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Footer({ triggerToast }) {
  const [activeLog, setActiveLog] = useState(0);

  const certifications = [
    {
      name: "CompTIA A+",
      status: "VERIFIED",
      color: "border-[#1E40AF]/60 bg-[#1E3A8A]/30 text-[#60A5FA]",
      icon: <CheckCircle2 size={13} className="text-telemetry-accent animate-pulse-slow" />
    },
    {
      name: "CompTIA Network+",
      status: "IN PROGRESS",
      color: "border-[#713F12] bg-[#422006] text-[#FACC15]",
      icon: <RefreshCw size={12} className="text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
    },
    {
      name: "CompTIA Security+",
      status: "IN PROGRESS",
      color: "border-[#713F12] bg-[#422006] text-[#FACC15]",
      icon: <RefreshCw size={12} className="text-yellow-400 animate-spin" style={{ animationDuration: '4s' }} />
    }
  ];

  const mockLogs = [
    'SYS: [DNS] Edge caching validated (mtwellness.us SLA 99.9% uptime verified)',
    'SYS: [INTUNE] Casework OneDrive sync restoral trace: SUCCESS (SHA256 verified)',
    'SYS: [SEC] SentinelOne threat analysis isolated container sweep: 0 incidents found',
    'SYS: [RAG] Local Ollama deepseek neural weights: 100% operational (42 database nodes)',
    'SYS: [SYS] Fort Worth Texas branch-office node_01 thermal state: NOMINAL'
  ];

  // Cycles through rolling sys-logs (Asset #6)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % mockLogs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSystemDiagnostics = () => {
    triggerToast?.("DIAG_SYNC: RUNNING SWEEP... ALL SERVICES ONLINE // LATENCY: 12ms // SSL & SEC PROTOCOLS: 100% HEALTHY", "sec");
  };

  return (
    <footer className="border-t border-white/5 bg-white/[0.01] backdrop-blur-xl px-6 pt-12 pb-8 safe-bottom select-none mt-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* CompTIA Badge Panel */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs text-[#6E6E77] uppercase tracking-wider">
            INFRASTRUCTURE CREDENTIALS & IN-FLIGHT CERTIFICATIONS
          </span>
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 px-3 py-2 rounded border font-mono text-xs ${cert.color} shadow-sm transition-all duration-300 hover:scale-102`}
              >
                <Award size={14} />
                <span>{cert.name}</span>
                <span className="text-[10px] opacity-40">•</span>
                <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                  {cert.icon}
                  {cert.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Diagonal Terminal Splice & Corporate Vibe */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-white/5 pt-6 font-mono text-[10px] text-[#6E6E77]">
          
          <div className="flex flex-col gap-1">
            <span className="text-telemetry-white font-semibold uppercase tracking-wider">
              BRENDAN ZWONITZER © {new Date().getFullYear()}
            </span>
            <span className="text-[9px]">
              DESIGNED IN SECURE_SANDBOX_NODE_V1 • ALL RIGHTS RESERVED.
            </span>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button 
              onClick={handleSystemDiagnostics}
              className="hover:text-telemetry-accent border border-transparent hover:border-telemetry-border px-2 py-1 rounded transition-all duration-200"
            >
              [RUN_SYSTEM_DIAGNOSTICS]
            </button>
            <span className="text-[#3A3A40] hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              STATUS: <strong className="text-telemetry-accent">ONLINE</strong>
            </span>
          </div>

        </div>

        {/* Dynamic Rolling Sys-Log Banner (Asset #6) */}
        <div className="border border-white/5 bg-black/45 rounded-lg p-2.5 font-mono text-[9px] text-[#71717A] flex items-center gap-2 overflow-hidden relative">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-telemetry-accent animate-pulse select-none"></span>
          <span className="text-telemetry-accent font-semibold uppercase select-none">LOG_STREAM:</span>
          <div className="flex-1 transition-all duration-500 ease-out select-text">
            {mockLogs[activeLog]}
          </div>
          <span className="hidden sm:inline text-[#3F3F46] font-mono text-[8px] uppercase select-none">NODE_STATUS: SYNCED</span>
        </div>

      </div>
    </footer>
  );
}
