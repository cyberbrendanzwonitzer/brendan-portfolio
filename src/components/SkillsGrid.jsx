import React, { useState } from 'react';
import { Terminal, Cloud, ShieldAlert, Cpu } from 'lucide-react';

export default function SkillsGrid() {
  const [activeCard, setActiveCard] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const skillCategories = [
    {
      id: 'os_core',
      title: 'OS Core',
      icon: <Terminal className="text-telemetry-accent" size={16} />,
      items: [
        {
          name: 'Windows 10/11',
          brandColor: '#00ADEF',
          glowColor: 'rgba(0, 173, 239, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
            </svg>
          )
        },
        {
          name: 'macOS',
          brandColor: '#E4E4E7',
          glowColor: 'rgba(228, 228, 231, 0.35)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.83-.98 2.94.1.04 1.12-.04 2.81-1.33z" />
            </svg>
          )
        },
        {
          name: 'Linux',
          brandColor: '#FCC624',
          glowColor: 'rgba(252, 198, 36, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-2.3 0-4.3 1.5-4.3 3.4 0 .3 0 .7.1 1-.8.6-1.5 1.5-1.9 2.5-.5-.1-.9-.1-1.4-.1-1.4 0-2.5 1-2.5 2.2 0 1 .8 1.8 1.9 2.1-.2.8-.3 1.6-.3 2.5 0 5.4 3.8 9.8 8.5 9.8s8.5-4.4 8.5-9.8c0-.9-.1-1.7-.3-2.5 1.1-.3 1.9-1.1 1.9-2.1 0-1.2-1.1-2.2-2.5-2.2-.5 0-.9 0-1.4.1-.4-1-1.1-1.9-1.9-2.5.1-.3.1-.7.1-1 0-1.9-2-3.4-4.3-3.4zm0 1.2c1.7 0 3.1 1 3.1 2.2 0 .2 0 .5-.1.7l-.1.4.3.2c.7.4 1.2 1.1 1.5 1.9l.1.3.3-.1c.3 0 .7-.1 1-.1.7 0 1.3.5 1.3 1 0 .5-.5.9-1.1 1l-.4.1.1.4c.2.7.3 1.4.3 2.1 0 4.6-3.1 8.3-7 8.3s-7-3.7-7-8.3c0-.7.1-1.4.3-2.1l.1-.4-.4-.1c-.6-.1-1.1-.5-1.1-1 0-.5.6-1 1.3-1 .3 0 .7.1 1 .1l.3.1.1-.3c.3-.8.8-1.5 1.5-1.9l.3-.2-.1-.4c-.1-.2-.1-.5-.1-.7 0-1.2 1.4-2.2 3.1-2.2zm-2.4 4.8c-.7 0-1.2.5-1.2 1.2s.5 1.2 1.2 1.2 1.2-.5 1.2-1.2-.5-1.2-1.2-1.2zm4.8 0c-.7 0-1.2.5-1.2 1.2s.5 1.2 1.2 1.2 1.2-.5 1.2-1.2-.5-1.2-1.2-1.2zm-4.8 4.2c-.3 0-.6.2-.6.5v.6c0 .3.3.5.6.5h4.8c.3 0 .6-.2.6-.5v-.6c0-.3-.3-.5-.6-.5H9.6z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'cloud_network',
      title: 'Cloud & Network',
      icon: <Cloud className="text-telemetry-accent" size={16} />,
      items: [
        {
          name: 'Cisco Meraki',
          brandColor: '#7EB338',
          glowColor: 'rgba(126, 179, 56, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM5.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8.5 18a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm5-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3-4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          )
        },
        {
          name: 'Ubiquiti UniFi',
          brandColor: '#055FFF',
          glowColor: 'rgba(5, 95, 255, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3-8l3-3 3 3H9z" />
            </svg>
          )
        },
        {
          name: 'Active Directory',
          brandColor: '#1F74B4',
          glowColor: 'rgba(31, 116, 180, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12c-2.7 0-5.8 1.28-6 2v1h12v-1c-.2-.72-3.3-2-6-2z" />
            </svg>
          )
        },
        {
          name: 'Entra ID (Azure AD)',
          brandColor: '#0078D4',
          glowColor: 'rgba(0, 120, 212, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
            </svg>
          )
        },
        {
          name: 'Cloudflare',
          brandColor: '#F38020',
          glowColor: 'rgba(243, 128, 32, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.72 13.9c-.1.2-.28.32-.48.32H6.76c-.2 0-.38-.12-.48-.32-.12-.22-.12-.48 0-.7l3.6-7.2c.1-.2.28-.32.48-.32h3.28c.2 0 .38.12.48.32l3.6 7.2c.12.22.12.48 0 .7z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'secops_stack',
      title: 'SecOps Stack',
      icon: <ShieldAlert className="text-telemetry-accent" size={16} />,
      items: [
        {
          name: 'SentinelOne',
          brandColor: '#7A36FF',
          glowColor: 'rgba(122, 54, 255, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 16c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
            </svg>
          )
        },
        {
          name: 'SaaS Alerts',
          brandColor: '#FF3333',
          glowColor: 'rgba(255, 51, 51, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
            </svg>
          )
        },
        {
          name: 'Jira',
          brandColor: '#0052CC',
          glowColor: 'rgba(0, 82, 204, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.53 2C11.14 2 10.82 2.32 10.82 2.71v7.65c0 .39.32.71.71.71h7.65c.39 0 .71-.32.71-.71V2.71C19.89 2.32 19.57 2 19.18 2h-7.65zM4.71 10.82h7.65c.39 0 .71-.32.71-.71V2.47c0-.39-.32-.71-.71-.71H4.71C4.32 1.76 4 2.08 4 2.47v7.65c0 .39.32.71.71.71zm6.82 11.42c.39 0 .71-.32.71-.71v-7.65c0-.39-.32-.71-.71-.71H3.88c-.39 0-.71.32-.71.71v7.65c0 .39.32.71.71.71h7.65z" />
            </svg>
          )
        },
        {
          name: 'Microsoft Intune',
          brandColor: '#00B4D8',
          glowColor: 'rgba(0, 180, 216, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm-5 20c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-4H7V4h10v13z" />
            </svg>
          )
        },
        {
          name: 'BitLocker',
          brandColor: '#FFB900',
          glowColor: 'rgba(255, 185, 0, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          )
        },
        {
          name: 'Log Debugging',
          brandColor: '#06B6D4',
          glowColor: 'rgba(6, 182, 212, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2zm0 4H7v-2h10v2zm0-8H7V7h10v2z" />
            </svg>
          )
        }
      ]
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: <Cpu className="text-telemetry-accent" size={16} />,
      items: [
        {
          name: 'GenAI Workflows',
          brandColor: '#A855F7',
          glowColor: 'rgba(168, 85, 247, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          )
        },
        {
          name: 'Ollama',
          brandColor: '#E4E4E7',
          glowColor: 'rgba(228, 228, 231, 0.35)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a1.5 1.5 0 1 1-3 0v-4a1.5 1.5 0 1 1 3 0zM12 9a1.5 1.5 0 1 1 1.5-1.5A1.5 1.5 0 0 1 12 9z" />
            </svg>
          )
        },
        {
          name: 'RAG Architecture',
          brandColor: '#06B6D4',
          glowColor: 'rgba(6, 182, 212, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0-2 .9-2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z" />
            </svg>
          )
        },
        {
          name: 'Full-Stack Web Dev',
          brandColor: '#61DAFB',
          glowColor: 'rgba(97, 218, 251, 0.45)',
          svg: (
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current transition-all" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11.414L7.707 13.75l1.414 1.414L12.25 12.08v5.67h2v-5.67l3.129 3.084 1.414-1.414L15 10.586V4.75h-4v5.836z" />
            </svg>
          )
        }
      ]
    }
  ];

  const handleCardClick = (cardId) => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setActiveCard(activeCard === cardId ? null : cardId);
    }
  };

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto select-none">
      <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#6E6E77] uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-telemetry-accent"></span>
          SYS_MATRIX: COMPONENT_LEVEL_CAPABILITIES
        </span>
        <span className="hidden sm:inline">DEVICES: ALL_NODE_COMPATIBLE</span>
      </div>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category) => {
          const isColoredOnMobile = activeCard === category.id;

          return (
            <div
              key={category.id}
              onClick={() => handleCardClick(category.id)}
              className={`border border-white/5 bg-white/[0.01] backdrop-blur-xl rounded-2xl p-6 flex flex-col gap-6 relative overflow-hidden transition-all duration-300 group cursor-pointer ${
                isColoredOnMobile ? 'shadow-2xl border-telemetry-accent/20 border-white/10' : 'hover:border-white/10 hover:shadow-2xl'
              }`}
            >
              {/* Glassmorphic Card "Status Audit" Pulse Laser Scan (Asset #10) */}
              <div className="absolute inset-0 bg-gradient-to-b from-telemetry-accent/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-telemetry-accent/40 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_4s_linear_infinite] pointer-events-none z-10"></div>

              {/* Header inside Card */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className="font-mono text-xs uppercase tracking-wider text-telemetry-white font-semibold">
                    {category.title}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-[#4A4A52] uppercase">
                  {category.id}_CLASS
                </span>
              </div>

              {/* Grid of Grayscale Icons that colorize with Glow Refraction (Asset #8) */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-6">
                {category.items.map((item, idx) => {
                  const isActiveGlow = hoveredIcon === item.name || isColoredOnMobile;
                  return (
                    <div
                      key={idx}
                      className="flex flex-col items-center justify-center gap-2 group/icon text-center"
                    >
                      {/* Grayscale -> color SVG logo with dynamic inline glow dropshadows */}
                      <div
                        onMouseEnter={() => setHoveredIcon(item.name)}
                        onMouseLeave={() => setHoveredIcon(null)}
                        className={`transition-all duration-500 ease-out transform cursor-pointer ${
                          isActiveGlow ? 'scale-110' : 'grayscale opacity-50'
                        }`}
                        style={{
                          color: isActiveGlow ? item.brandColor : undefined,
                          filter: isActiveGlow ? `drop-shadow(0 0 10px ${item.glowColor})` : undefined
                        }}
                      >
                        {item.svg}
                      </div>

                      {/* Item label */}
                      <span className="font-mono text-[10px] text-telemetry-silver group-hover/icon:text-telemetry-white transition-colors duration-300">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Decorative Console Elements */}
              <div className="absolute bottom-1 right-2 font-mono text-[8px] text-[#4A4A52] opacity-40 select-none uppercase">
                {isColoredOnMobile ? 'MOBILE_TAP_GLOW_ACTIVE' : 'DESKTOP_HOVER_GLOW_ENABLED'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
