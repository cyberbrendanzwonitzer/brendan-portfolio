import React from 'react';
import { ArrowRight, Cpu, Globe, Database, Network, HardDrive } from 'lucide-react';

export default function ProductionForge() {
  const projects = [
    {
      id: "proj_ai_pipelines",
      title: "Local Autonomous AI Agent Pipelines (Ollama & RAG)",
      icon: <Database size={18} className="text-telemetry-accent" />,
      payload: "Offline local infrastructure utilizing Ollama and Retrieval-Augmented Generation (RAG) to guarantee strict enterprise data privacy. Built custom user interfaces for autonomous scheduling, inventory management, and log analytics agents.",
      actions: [
        {
          label: "View Local Architecture Blueprint / GitHub",
          url: "https://github.com/brendanzwonitzer/local-ai-rag",
          type: "github"
        }
      ],
      rackSlot: "U03-U04"
    },
    {
      id: "proj_web_platforms",
      title: "Full-Stack Web Development & Commercial Platforms",
      icon: <Globe size={18} className="text-telemetry-accent" />,
      payload: "Production-designed and maintained commercial business applications including mtwellness.us, wellscleaningwell.com, and a custom Point-of-Sale (POS) system for cold-snap-cryo.us. Hosted and optimized utilizing Cloudflare for DNS edge orchestration, advanced routing, performance cache, and edge security.",
      actions: [
        {
          label: "mtwellness.us",
          url: "https://mtwellness.us",
          type: "web"
        },
        {
          label: "wellscleaningwell.com",
          url: "https://wellscleaningwell.com",
          type: "web"
        },
        {
          label: "cold-snap-cryo.us POS",
          url: "https://cold-snap-cryo.us",
          type: "web"
        }
      ],
      rackSlot: "U02"
    },
    {
      id: "proj_homelab",
      title: "Enterprise Homelab Network Environment",
      icon: <Network size={18} className="text-telemetry-accent" />,
      payload: "Dedicated physical Linux servers and isolated virtual network stacks utilized as a secure sandbox to compile code, benchmark open-source AI models, and debug multi-tenant routing configurations without affecting production environments.",
      actions: [
        {
          label: "Homelab Runbooks / GitHub",
          url: "https://github.com/brendanzwonitzer/homelab-runbooks",
          type: "github"
        }
      ],
      rackSlot: "U01"
    }
  ];

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 font-mono text-xs text-[#6E6E77] uppercase tracking-wider select-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-telemetry-accent"></span>
          SYS_FORGE: PRODUCTION_DEPLOYMENTS (SERVER_RACK)
        </span>
        <span>SLOTS_OCCUPIED: 03_OF_08</span>
      </div>

      {/* Server Rack Frame */}
      <div className="flex flex-col gap-6 relative select-none">
        
        {projects.map((proj, index) => (
          <div 
            key={proj.id}
            className="border border-telemetry-border bg-[#101011] rounded relative flex flex-col hover:border-telemetry-accent/40 hover:shadow-glow-emerald transition-all duration-300 group"
          >
            
            {/* PHYSICAL RACK BLADE STYLING (Desktop: Horizontal layout) */}
            <div className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-telemetry-border bg-[#0D0D0E]">
              
              {/* Rack mount ears/bracket (Left) */}
              <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-2.5 h-2.5 rounded-full border border-telemetry-border bg-telemetry-bg flex items-center justify-center font-bold text-[6px] text-telemetry-silver select-none">✕</span>
                <span className="font-mono text-[8px] text-telemetry-silver">{proj.rackSlot}</span>
              </div>

              {/* Server Name / Logo */}
              <div className="flex-1 flex items-center gap-3 ml-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-telemetry-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-telemetry-accent"></span>
                </span>
                <div className="flex items-center gap-2">
                  {proj.icon}
                  <h3 className="font-mono text-xs uppercase tracking-wider text-telemetry-white font-bold select-text">
                    {proj.title}
                  </h3>
                </div>
              </div>

              {/* Status Indicator Lights */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9px] text-[#4A4A52]">LINK_SPEED: 10_GBPS</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-telemetry-accent animate-pulse-slow"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-telemetry-accent opacity-40"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/20"></span>
                </div>
              </div>

              {/* Rack mount ears/bracket (Right) */}
              <div className="ml-6 flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                <span className="w-2.5 h-2.5 rounded-full border border-telemetry-border bg-telemetry-bg flex items-center justify-center font-bold text-[6px] text-telemetry-silver select-none">✕</span>
              </div>

            </div>

            {/* Mobile Header Block (Collapses into vertical stack) */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0D0D0E] border-b border-telemetry-border">
              <div className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-telemetry-accent animate-pulse"></span>
                <div className="flex items-center gap-1.5">
                  {proj.icon}
                  <h3 className="font-mono text-[11px] uppercase tracking-wider text-telemetry-white font-bold">
                    {proj.title}
                  </h3>
                </div>
              </div>
              <span className="font-mono text-[9px] text-telemetry-silver">{proj.rackSlot}</span>
            </div>

            {/* Inner Payload Details */}
            <div className="p-4 md:p-6 flex flex-col gap-4">
              <p className="text-xs md:text-sm text-telemetry-silver font-sans leading-relaxed select-text">
                {proj.payload}
              </p>

              {/* Actions Section */}
              <div className="mt-2">
                {/* Desktop: Horizontal inline links */}
                <div className="hidden lg:flex flex-wrap items-center gap-4">
                  <span className="font-mono text-[10px] text-[#4A4A52] uppercase">DEPLOYMENT_VERIFICATION:</span>
                  {proj.actions.map((act, actIdx) => (
                    <a
                      key={actIdx}
                      href={act.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-telemetry-border bg-telemetry-card/50 hover:bg-telemetry-darkzinc hover:text-telemetry-accent hover:border-telemetry-accent hover:shadow-glow-emerald transition-all duration-300 font-mono text-[11px] text-telemetry-white"
                    >
                      <span>{act.type === 'github' ? '📁' : '🔗'} {act.label}</span>
                    </a>
                  ))}
                </div>

                {/* Mobile: Vertical stacked full-width outline pills with arrow */}
                <div className="lg:hidden flex flex-col gap-2">
                  <span className="font-mono text-[9px] text-[#4A4A52] uppercase mb-1">VERIFICATION ENDPOINTS:</span>
                  {proj.actions.map((act, actIdx) => (
                    <a
                      key={actIdx}
                      href={act.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-4 h-12 rounded border border-telemetry-border bg-telemetry-card/50 text-xs font-mono text-telemetry-white hover:border-telemetry-accent hover:text-telemetry-accent transition-all duration-200 active:scale-98"
                      style={{ minHeight: '48px' }}
                    >
                      <span className="flex items-center gap-2">
                        <span>{act.type === 'github' ? '📁' : '🔗'}</span>
                        <span>{act.label}</span>
                      </span>
                      <ArrowRight size={14} className="text-telemetry-accent" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        ))}
        
      </div>
    </section>
  );
}
