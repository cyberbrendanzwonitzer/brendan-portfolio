import React, { useState } from 'react';
import StatusBanner from './components/StatusBanner';
import Header from './components/Header';
import Summary from './components/Summary';
import TelemetryMatrix from './components/TelemetryMatrix';
import WorkHistoryCard from './components/WorkHistoryCard';
import TechnicalSandboxCard from './components/TechnicalSandboxCard';
import SkillsGrid from './components/SkillsGrid';
import Footer from './components/Footer';
import BackgroundParticles from './components/BackgroundParticles';
import Toast from './components/Toast';
import OperationsHub from './components/OperationsHub';

export default function App() {
  const [toast, setToast] = useState(null);

  const triggerToast = (msg, type = 'sec') => {
    setToast({ msg, type });
  };

  return (
    <div className="min-h-screen bg-[#070708] text-telemetry-white font-sans flex flex-col relative overflow-hidden select-none">
      
      {/* Canvas Ambient Particles */}
      <BackgroundParticles />

      {/* Frosted Toast Alerts (Asset #5) */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Soft Architectural Glassmorphic Hues (Background glow layers) */}
      <div className="ambient-glow absolute top-[-10%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-blue-500/[0.04] blur-[140px] pointer-events-none z-0"></div>
      <div className="ambient-glow absolute bottom-[20%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-zinc-400/[0.02] blur-[160px] pointer-events-none z-0"></div>
      <div className="ambient-glow absolute top-[40%] left-[20%] w-[35vw] h-[35vw] rounded-full bg-blue-600/[0.015] blur-[120px] pointer-events-none z-0"></div>

      {/* Sleek Subtle Telemetry Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.25] grid-telemetry"></div>

      {/* Minimalist Top Status Bar */}
      <StatusBanner />

      {/* Central Single-Page Frosted Glass Dashboard */}
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col gap-6 relative z-10 py-6">
        
        {/* Floating Frosted Glass Header */}
        <Header triggerToast={triggerToast} />

        {/* Console Summary Glass Block */}
        <Summary />

        {/* 5-Column Dashboard Overlaid on White Vector Curves */}
        <TelemetryMatrix />

        {/* Dual-column Frosted Accordion Grids */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-6">
          <WorkHistoryCard triggerToast={triggerToast} />
          <TechnicalSandboxCard triggerToast={triggerToast} />
        </div>

        {/* Monochromatic Skills grid */}
        <SkillsGrid />

        {/* Systems Operations & Extras Hub */}
        <OperationsHub triggerToast={triggerToast} />

      </main>

      {/* Frosted Badge Footer */}
      <Footer triggerToast={triggerToast} />

    </div>
  );
}
