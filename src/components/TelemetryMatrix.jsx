import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Reusable counting component that handles numeric ranges and text
function TelemetryCounter({ value, duration = 1.8 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [displayVal, setDisplayVal] = useState("");

  useEffect(() => {
    const numbers = value.match(/\d+/g);
    if (!numbers) {
      setDisplayVal(value);
      return;
    }

    const numericTargets = numbers.map(Number);
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      let index = 0;
      const updatedString = value.replace(/\d+/g, () => {
        const target = numericTargets[index++];
        const currentVal = Math.floor(progress * target);
        return currentVal.toString();
      });

      setDisplayVal(updatedString);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayVal(value);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayVal}</span>;
}

export default function TelemetryMatrix() {
  const metrics = [
    {
      id: "networks",
      value: "35+",
      label: "Multi-Tenant",
      sublabel: "Networks Managed",
      desc: "MSP scale endpoints",
      sparkline: "M 0 16 Q 15 16 30 10 T 60 2"
    },
    {
      id: "tickets",
      value: "40-50+",
      label: "Daily Tickets",
      sublabel: "Resolved",
      desc: "High-volume SLA queues",
      sparkline: "M 0 10 L 12 10 L 18 2 L 24 18 L 30 10 L 42 10 L 48 16 L 54 4 L 60 10"
    },
    {
      id: "hires",
      value: "14+",
      label: "Technical New",
      sublabel: "Hires Trained",
      desc: "Onboarding & mentorship",
      sparkline: "M 0 18 L 15 18 L 15 12 L 35 12 L 35 4 L 60 4"
    },
    {
      id: "comptia",
      value: "Comptia",
      label: "Comptia A+",
      sublabel: "Verified",
      desc: "Validated infrastructure logs",
      sparkline: "M 0 10 Q 15 2 30 10 T 60 10"
    },
    {
      id: "builds",
      value: "3+",
      label: "Full-Stack Builds",
      sublabel: "Deployed",
      desc: "Cloudflare & RAG apps",
      sparkline: "M 0 15 Q 15 15 22 2 T 35 18 T 48 2 Q 55 15 60 15"
    },
    {
      id: "csat",
      value: "97%",
      label: "Customer Satisfaction",
      sublabel: "SLA CSAT Score",
      desc: "End-user support audits",
      sparkline: "M 0 18 Q 15 2 30 14 T 60 2"
    }
  ];

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto relative">
      {/* Glowing Background Sine Wave Infrastructure Vector Chart */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.08] px-12 py-16">
        <svg className="w-full h-full" viewBox="0 0 1000 280" preserveAspectRatio="none">
          {/* Horizontal Grid lines */}
          <line x1="0" y1="70" x2="1000" y2="70" stroke="#27272A" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="0" y1="140" x2="1000" y2="140" stroke="#27272A" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="0" y1="210" x2="1000" y2="210" stroke="#27272A" strokeWidth="0.5" strokeDasharray="3,3" />
          
          <defs>
            <linearGradient id="wave-gradient-white" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          {/* The white translucent wave fill */}
          <path 
            d="M 0,220 Q 180,90 350,170 T 700,110 T 850,200 T 1000,140 L 1000,280 L 0,280 Z" 
            fill="url(#wave-gradient-white)"
          />
          {/* Main white wave path */}
          <path 
            d="M 0,220 Q 180,90 350,170 T 700,110 T 850,200 T 1000,140" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="2.0"
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
            strokeLinecap="round"
          />
          {/* Secondary thin gray path */}
          <path 
            d="M 0,200 Q 180,110 350,190 T 700,130 T 850,220 T 1000,160" 
            fill="none" 
            stroke="#A1A1AA" 
            strokeWidth="0.75"
            strokeDasharray="4,4"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Unified Executive Dashboard Container */}
      <motion.div 
        className="border border-white/5 bg-white/[0.01] backdrop-blur-2xl rounded-2xl p-6 md:p-10 relative overflow-hidden shadow-2xl select-none z-10"
        initial={{ opacity: 0, filter: "blur(15px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.0, ease: "easeOut" }}
      >

        {/* Section Header */}
        <div className="relative z-10 flex flex-col mb-10 text-left">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-telemetry-white font-sans">
            Brendan Zwonitzer | <span className="text-telemetry-silver font-light">Systems Administrator & Automation Engineer</span>
          </h2>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5 relative z-10">
          {metrics.map((m, idx) => (
            <motion.div 
              key={m.id}
              className="p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/10 flex flex-col justify-between items-center text-center min-h-[185px] hover:bg-white/[0.04] hover:border-white/20 hover:shadow-2xl transition-all duration-300 relative group"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: idx * 0.1, duration: 0.7, ease: "easeOut" }}
            >
              <div className="absolute top-2 right-2 font-mono text-[8px] text-[#4A4A52] uppercase group-hover:text-telemetry-accent transition-colors">
                slot_0{idx + 1}
              </div>

              {/* Number & Sparkline side-by-side */}
              <div className="flex items-center justify-between w-full mt-4 gap-3">
                <span className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-telemetry-white leading-none">
                  <TelemetryCounter value={m.value} />
                </span>
                
                {/* SVG Vector Sparkline */}
                <div className="w-14 h-6 text-telemetry-accent opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-full h-full" viewBox="0 0 60 20">
                    <motion.path
                      d={m.sparkline}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0, filter: "blur(1.5px)" }}
                      animate={{ pathLength: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.8, ease: "easeOut", delay: idx * 0.12 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Text descriptions */}
              <div className="flex flex-col gap-0.5 mt-4 font-sans w-full">
                <span className="text-xs font-bold text-telemetry-white tracking-wide leading-snug">
                  {m.label}
                </span>
                <span className="text-xs text-[#A1A1AA] leading-snug">
                  {m.sublabel}
                </span>
                <span className="text-[9px] font-mono text-[#52525B] uppercase mt-1 leading-none">
                  {m.desc}
                </span>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Bottom Timeline */}
        <div className="flex justify-between mt-10 border-t border-white/5 pt-5 font-sans text-[10px] text-[#71717A] relative z-10 select-none">
          <span className="tracking-wide">JAN</span>
          <span className="tracking-wide">FEB</span>
          <span className="tracking-wide font-medium text-telemetry-white">MAR</span>
          <span className="tracking-wide">APR</span>
          <span className="tracking-wide">MAY</span>
        </div>

      </motion.div>
    </section>
  );
}
