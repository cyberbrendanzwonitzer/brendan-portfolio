import React from 'react';

export default function Summary() {
  return (
    <section className="px-6 py-2 max-w-7xl mx-auto select-text">
      <div className="border border-white/5 bg-white/[0.01] backdrop-blur-xl shadow-2xl rounded-2xl p-6 md:p-8 relative overflow-hidden">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-telemetry-accent">
            <span className="inline-block w-2 h-2 bg-telemetry-accent rounded-full animate-pulse"></span>
            <span>SECURE SHELL CONSOLE: INCOMING BRIEFING</span>
          </div>
          
          <p className="text-sm md:text-base text-telemetry-silver leading-relaxed font-sans max-w-5xl">
            I am an <strong className="text-telemetry-white font-semibold">Analytical IT Support Specialist and Systems Administrator</strong> with hands-on experience supporting multi-tenant MSP environments, endpoint operations, identity management, and network infrastructure. I am highly skilled across Microsoft 365, Entra ID, Intune, Active Directory, Cisco Meraki, UniFi, SentinelOne, and SaaS security platforms. I am known for technical ownership, clear documentation, client rapport, and automation-minded troubleshooting.
          </p>
        </div>
      </div>
    </section>
  );
}
