import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Globe, Server, Cpu, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TechnicalSandboxCard({ triggerToast }) {
  const [expandedIndex, setExpandedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('rag');
  const [consoleLines, setConsoleLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Terminal input states (Asset #4)
  const [cmdInput, setCmdInput] = useState('');
  
  // Interactive Network Map states (Asset #3)
  const [activeNode, setActiveNode] = useState(null);
  const [pulseTrigger, setPulseTrigger] = useState(false);

  const projects = [
    {
      title: 'Local Autonomous AI Agent Pipelines (Ollama & RAG)',
      bullets: [
        'Built offline, data-secure LLM workflows using Ollama and RAG architecture to test private AI assistants, secure document retrieval, and automation use cases within a controlled local infrastructure environment.',
        'Developed internal-style web interfaces for autonomous agents to evaluate scheduling, inventory tracking, health analytics, and controlled web-browsing workflows as infrastructure automation concepts.'
      ],
      actions: []
    },
    {
      title: 'Full-Stack Web Development & Commercial Platforms',
      bullets: [
        'Designed, deployed, and maintained production web environments, including mtwellness.us and wellscleaningwell.com, with emphasis on uptime, DNS management, and operational reliability.',
        'Managed Cloudflare DNS, edge routing, web performance, and application delivery configurations to support secure and reliable business web operations.',
        'Architected a custom POS and business management workflow for cold-snap-cryo.us to support client onboarding, sales tracking, and operational reporting through centralized business tooling.'
      ],
      actions: [
        { label: 'mtwellness.us', url: 'https://mtwellness.us', icon: <Globe size={12} /> },
        { label: 'wellscleaningwell.com', url: 'https://wellscleaningwell.com', icon: <Globe size={12} /> },
        { label: 'cold-snap-cryo.us POS', url: 'https://cold-snap-cryo.us', icon: <Globe size={12} /> }
      ]
    },
    {
      title: 'Enterprise Homelab Network Environment',
      bullets: [
        'Maintain a private lab with a dedicated Linux server and isolated network stack for testing scripts, multi-tenant configurations, and localized AI model performance.'
      ],
      actions: []
    }
  ];

  const terminalPayloads = {
    rag: [
      'SYSTEM: INITIATING SECURE LOCAL PIPELINE...',
      'EXECUTING: ollama run deepseek-coder:6.7b',
      'QUERY VECTOR DB: Searching secure offline cache...',
      'RETRIEVAL COMPLETE: 42 nodes matched (0.41s)',
      'TELEMETRY STATUS: SECURE_OPERATIONAL (100% private)'
    ],
    intune: [
      'SYSTEM: EXECUTING MULTI-SYSTEMS ENDPOINT AUDIT...',
      'AUDITING: OneDrive secure sync status... OK',
      'RECOVERING: BitLocker encrypted partition trace... OK',
      'COMPLIANCE SYNC: Aligning Microsoft Intune profiles...',
      'TELEMETRY STATUS: ACTIVE (Device SLA 100% compliant)'
    ],
    dns: [
      'SYSTEM: EXECUTING ROUTING STATUS CHECKS...',
      'RESOLVING: mtwellness.us -> DNS Edge Active',
      'HANDSHAKE: wellscleaningwell.com -> SSL Verified',
      'ORCHESTRATING: cold-snap-cryo.us POS Proxy -> Active',
      'TELEMETRY STATUS: STABLE (Cloudflare edge optimized)'
    ]
  };

  // Simulates typewriter-style console streams on tab change
  useEffect(() => {
    setConsoleLines([]);
    setIsTyping(true);
    const lines = terminalPayloads[activeTab];
    let currentLine = 0;

    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        setConsoleLines((prev) => [...prev, `[${timeStr}] ${lines[currentLine]}`]);
        currentLine++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [activeTab]);

  // Terminal Easter Egg command submit handler (Asset #4)
  const handleCommandSubmit = (e) => {
    e.preventDefault();
    const cmd = cmdInput.trim().toLowerCase();
    if (!cmd) return;

    setCmdInput('');
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    triggerToast?.(`COMMAND SUBMITTED: ${cmd.toUpperCase()}`, "cmd");

    if (cmd === 'clear') {
      setConsoleLines([]);
      return;
    }

    setConsoleLines((prev) => [...prev, `[${timeStr}] guest@zwonitzer-node:~$ ${cmd}`]);

    setTimeout(() => {
      if (cmd === 'help') {
        setConsoleLines((prev) => [
          ...prev,
          `[${timeStr}] -- AVAILABLE TERMINAL DIRECTIVES:`,
          `[${timeStr}]    [help]   - Display commands registry`,
          `[${timeStr}]    [skills] - Logs system developer capabilities`,
          `[${timeStr}]    [ping]   - Pings edge CDN gateway node`,
          `[${timeStr}]    [secret] - Decrypts administrative trace`,
          `[${timeStr}]    [clear]  - Purges all console rows`
        ]);
      } else if (cmd === 'skills') {
        setConsoleLines((prev) => [
          ...prev,
          `[${timeStr}] -- DEVELOPER CAPABILITIES REGISTRY:`,
          `[${timeStr}]    * OS: Windows / macOS / Linux`,
          `[${timeStr}]    * Cloud: Cisco Meraki / Ubiquiti / Entra ID`,
          `[${timeStr}]    * SecOps: SentinelOne / SaaS Alerts / Intune`,
          `[${timeStr}]    * AI: Ollama / Local RAG / Prompt Engineering`
        ]);
      } else if (cmd === 'ping') {
        setConsoleLines((prev) => [
          ...prev,
          `[${timeStr}] PINGING CDN GATEWAY CLUSTER...`,
          `[${timeStr}] PING SUCCESS: Host 'cloudflare-edge' resolved in 11ms`,
          `[${timeStr}] STATUS: STABLE (DNS caching verified)`
        ]);
      } else if (cmd === 'secret') {
        setConsoleLines((prev) => [
          ...prev,
          `[${timeStr}] DECRYPTING ADM_TRACER...`,
          `[${timeStr}]    ___  ___  _  _  ____ ____ _  _  _ `,
          `[${timeStr}]    |==] |==] |\\/|  |___ |  | |\\/|  | `,
          `[${timeStr}]    |__] |  \\ |  |  |___ |__| |  |__| `,
          `[${timeStr}] ACCESS GRANTED // SANDBOX DECROWDED`
        ]);
      } else {
        setConsoleLines((prev) => [
          ...prev,
          `[${timeStr}] ERROR: Directives '${cmd}' not recognized. Type 'help' for registry.`
        ]);
      }
    }, 250);
  };

  // Node ping handler (Asset #3)
  const handleNodeClick = (nodeName) => {
    setActiveNode(nodeName);
    setPulseTrigger(true);
    triggerToast?.(`NODE PING INITIATED: ${nodeName.toUpperCase()}`, "sec");

    setTimeout(() => {
      setPulseTrigger(false);
    }, 1200);
  };

  return (
    <div className="border border-white/5 bg-white/[0.01] backdrop-blur-2xl rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-white/10 transition-colors duration-300">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-lg md:text-xl font-bold font-sans text-telemetry-white">
            Technical Sandbox: Local AI, Full-Stack, Homelab
          </h3>
          <span className="font-mono text-[9px] text-[#71717A] tracking-wider uppercase">sys.dev_sandbox</span>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-telemetry-silver font-sans leading-relaxed">
          Production applications, private neural pipelines, and isolated virtual debugging sandboxes. Toggle the diagnostic console below to inspect logs.
        </p>

        {/* INTERACTIVE DIAGNOSTIC COMMAND CONSOLE (Asset #4 / #10) */}
        <div className="bg-black/45 border border-white/5 rounded-xl font-mono text-[11px] p-4 text-[#A1A1AA] flex flex-col gap-3 shadow-inner mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <span className="text-telemetry-accent flex items-center gap-1.5 font-bold uppercase select-none">
              <span className="inline-block w-1.5 h-1.5 bg-telemetry-accent rounded-full animate-pulse"></span>
              DIAGNOSTIC_SHELL_V2.1
            </span>
            {/* Clickable tabs */}
            <div className="flex gap-2">
              {Object.keys(terminalPayloads).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 py-0.5 rounded border text-[9px] uppercase transition-colors select-none ${
                    activeTab === tab 
                      ? 'border-telemetry-accent text-telemetry-accent bg-telemetry-accent/5' 
                      : 'border-white/5 hover:border-white/10 hover:text-telemetry-white'
                  }`}
                >
                  [{tab}]
                </button>
              ))}
            </div>
          </div>
          
          {/* Console printed lines terminal output */}
          <div className="flex flex-col gap-1.5 min-h-[95px] select-text">
            {consoleLines.map((line, lIdx) => (
              <div key={lIdx} className="flex gap-2 leading-relaxed">
                <span className="text-[#52525B] select-none">&gt;&gt;</span>
                <span className={line.includes('STATUS:') || line.includes('DECRYPTING') ? 'text-telemetry-accent font-bold' : ''}>
                  {line}
                </span>
              </div>
            ))}
            {isTyping && (
              <span className="inline-block w-1.5 h-3 bg-[#A1A1AA] animate-pulse select-none ml-2"></span>
            )}
          </div>

          {/* Interactive Shell command line input (Asset #4) */}
          <form onSubmit={handleCommandSubmit} className="flex gap-2 items-center border-t border-white/5 pt-2 mt-1">
            <span className="text-[#52525B] select-none font-bold">&gt;_</span>
            <input 
              type="text"
              value={cmdInput}
              onChange={(e) => setCmdInput(e.target.value)}
              placeholder="Type help, skills, ping, secret, clear..."
              className="flex-1 bg-transparent border-none outline-none font-mono text-[10px] text-telemetry-white placeholder-[#3F3F46]"
            />
          </form>
        </div>

        {/* Accordion Projects List with Slide-and-Glow (Asset #7) */}
        <div className="flex flex-col gap-3 mt-4">
          {projects.map((proj, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div 
                key={idx}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded 
                    ? 'border-telemetry-accent/35 bg-white/[0.02]/80 shadow-[0_0_15px_rgba(59,130,246,0.12)]' 
                    : 'border-white/5 bg-white/[0.01] hover:border-white/10'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/[0.01] text-left font-sans text-xs transition-colors hover:bg-white/[0.03]"
                >
                  <span className="font-bold text-telemetry-white text-sm">{proj.title}</span>
                  {isExpanded ? <ChevronUp size={14} className="text-telemetry-silver" /> : <ChevronDown size={14} className="text-telemetry-silver" />}
                </button>

                {/* Animated content expansion */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, filter: "blur(5px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(5px)" }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 bg-[#121212]/40 border-t border-white/5 font-sans text-xs text-telemetry-silver flex flex-col gap-4">
                        
                        {/* Rich bullet list */}
                        <div className="flex flex-col gap-2.5">
                          {proj.bullets.map((bullet, bIdx) => (
                            <div key={bIdx} className="flex gap-2.5 items-start">
                              <span className="text-telemetry-accent font-bold mt-0.5 select-none font-mono">&gt;</span>
                              <p className="flex-1 text-telemetry-silver leading-relaxed text-xs md:text-sm">{bullet}</p>
                            </div>
                          ))}
                        </div>

                        {/* INTERACTIVE NETWORK TOPOLOGY MAP (Asset #3 - Rendered inside Homelab accordion index 2) */}
                        {idx === 2 && (
                          <div className="border border-white/5 bg-black/35 rounded-xl p-4 flex flex-col gap-3 font-mono text-[9px] text-[#A1A1AA] select-none mt-2">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                              <span className="text-telemetry-white font-bold flex items-center gap-1.5">
                                <Activity size={10} className="text-telemetry-accent animate-pulse" />
                                PRIVATE_NETWORK_TOPOLOGY
                              </span>
                              <span>PING: {activeNode ? `${activeNode.toUpperCase()} (SUCCESS)` : 'AWAITING_TRIGGER'}</span>
                            </div>
                            
                            {/* SVG Network node topology mapping grid */}
                            <div className="flex justify-center py-2 relative">
                              <svg className="w-full max-w-sm h-28" viewBox="0 0 320 100">
                                {/* Dotted connection lines */}
                                <path id="path-gateway-server" d="M 50,50 L 160,25" fill="none" stroke="#27272A" strokeWidth="1.5" strokeDasharray="3,3" />
                                <path id="path-server-ai" d="M 160,25 L 270,50" fill="none" stroke="#27272A" strokeWidth="1.5" strokeDasharray="3,3" />
                                <path id="path-gateway-ai" d="M 50,50 L 270,50" fill="none" stroke="#27272A" strokeWidth="1.5" strokeDasharray="3,3" />

                                {/* Light packet pulses traversing paths (Asset #3) */}
                                {pulseTrigger && (
                                  <>
                                    <motion.circle r="3.5" fill="#3B82F6" className="drop-shadow-[0_0_6px_#3B82F6]">
                                      <animateMotion dur="1s" repeatCount="1" path="M 50,50 L 160,25" />
                                    </motion.circle>
                                    <motion.circle r="3.5" fill="#3B82F6" className="drop-shadow-[0_0_6px_#3B82F6]">
                                      <animateMotion dur="1s" repeatCount="1" path="M 160,25 L 270,50" />
                                    </motion.circle>
                                  </>
                                )}

                                {/* Nodes (Clickable circle vectors) */}
                                <g className="cursor-pointer" onClick={() => handleNodeClick('gateway')}>
                                  <circle cx="50" cy="50" r="14" fill="#121212" stroke={activeNode === 'gateway' ? '#3B82F6' : '#27272A'} strokeWidth="1.5" className="transition-all hover:stroke-white" />
                                  <text x="50" y="53" textAnchor="middle" fill="#E4E4E7" className="font-sans text-[8px] font-bold select-none">GW</text>
                                </g>
                                
                                <g className="cursor-pointer" onClick={() => handleNodeClick('server')}>
                                  <circle cx="160" cy="25" r="14" fill="#121212" stroke={activeNode === 'server' ? '#3B82F6' : '#27272A'} strokeWidth="1.5" className="transition-all hover:stroke-white" />
                                  <text x="160" y="28" textAnchor="middle" fill="#E4E4E7" className="font-sans text-[8px] font-bold select-none">SRV</text>
                                </g>

                                <g className="cursor-pointer" onClick={() => handleNodeClick('ai')}>
                                  <circle cx="270" cy="50" r="14" fill="#121212" stroke={activeNode === 'ai' ? '#3B82F6' : '#27272A'} strokeWidth="1.5" className="transition-all hover:stroke-white" />
                                  <text x="270" y="53" textAnchor="middle" fill="#E4E4E7" className="font-sans text-[8px] font-bold select-none">AI</text>
                                </g>

                                {/* Labels under nodes */}
                                <text x="50" y="80" textAnchor="middle" fill="#71717A" className="text-[7px]">GATEWAY</text>
                                <text x="160" y="55" textAnchor="middle" fill="#71717A" className="text-[7px]">LINUX_SRV</text>
                                <text x="270" y="80" textAnchor="middle" fill="#71717A" className="text-[7px]">OLLAMA_RAG</text>
                              </svg>
                            </div>
                            <span className="text-[7px] text-[#52525B] text-center uppercase select-none">CLICK ANY NODE TO TRIGGER PACKET TELEMETRY TEST PING</span>
                          </div>
                        )}
                        
                        {proj.actions.length > 0 && (
                          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                            {proj.actions.map((act, actIdx) => (
                              <a
                                key={actIdx}
                                href={act.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.01] text-[10px] font-mono text-telemetry-white hover:text-telemetry-accent hover:border-telemetry-accent transition-colors"
                              >
                                {act.icon}
                                <span>{act.label}</span>
                                <ExternalLink size={10} className="opacity-60" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Controls */}
      <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="font-mono text-[9px] text-[#52525B]">PORTS_EXPOSED: CLOUDFLARE_EDGE</span>
        <button 
          onClick={() => setExpandedIndex(expandedIndex === 0 ? 1 : 0)}
          className="px-4 py-2 rounded-lg border border-white/5 bg-white/[0.01] text-xs font-sans text-telemetry-white hover:bg-white/[0.04] hover:border-white/15 transition-all active:scale-98"
        >
          Toggle Node State
        </button>
      </div>
    </div>
  );
}
