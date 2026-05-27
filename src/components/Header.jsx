import { Mail, Phone, MapPin, FileDown } from 'lucide-react';

export default function Header({ triggerToast }) {
  return (
    <div className="px-6 mt-2">
      <header className="border border-white/5 bg-white/[0.01] backdrop-blur-xl shadow-2xl rounded-2xl p-6 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        
        {/* Left Section: Name, Titles, Contacts, and Social Links */}
        <div className="flex-1 flex flex-col">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-telemetry-white leading-none">
              Brendan Zwonitzer
            </h1>
            <h2 className="text-xs md:text-sm font-mono tracking-wider text-telemetry-accent mt-2 font-semibold uppercase">
              IT Support Specialist & Systems Administrator // Endpoint Security // Microsoft 365 // Network Infrastructure
            </h2>
          </div>

          {/* Contact Details with custom icons */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 font-mono text-xs text-telemetry-silver select-text">
            <span className="flex items-center gap-1.5 hover:text-telemetry-accent transition-colors">
              <MapPin size={13} className="text-telemetry-accent" />
              Fort Worth, TX Area
            </span>
            <a href="tel:801-541-7131" className="flex items-center gap-1.5 hover:text-telemetry-accent transition-colors">
              <Phone size={13} className="text-telemetry-accent" />
              801-541-7131
            </a>
            <a href="mailto:Cyberbrendanzwonitzer@gmail.com" className="flex items-center gap-1.5 hover:text-telemetry-accent transition-colors">
              <Mail size={13} className="text-telemetry-accent" />
              Cyberbrendanzwonitzer@gmail.com
            </a>
          </div>

          {/* Inline Link Group */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <a 
              href="https://www.linkedin.com/in/brendan-zwonitzer-481000258/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-telemetry-border bg-telemetry-card/50 text-xs font-mono text-telemetry-white hover:text-telemetry-accent hover:border-telemetry-accent hover:shadow-glow-emerald transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span>[LinkedIn Profile]</span>
            </a>
            <a 
              href="https://github.com/brendanzwonitzer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded border border-telemetry-border bg-telemetry-card/50 text-xs font-mono text-telemetry-white hover:text-telemetry-accent hover:border-telemetry-accent hover:shadow-glow-emerald transition-all duration-300"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>[GitHub Registry]</span>
            </a>
          </div>
        </div>

        {/* Right Section: Resume Download Action Button */}
        <div className="w-full md:w-auto flex flex-col justify-end mt-2 md:mt-0">
          <a 
            href="/Brendan_Zwonitzer_Resume.pdf" 
            download
            onClick={() => triggerToast?.("ATS_RESUME.PDF LOADED // VERIFICATION: SUCCESS (SHA256 CHECKSUM VERIFIED)", "sec")}
            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 h-12 rounded border border-telemetry-accent text-telemetry-accent font-mono text-xs uppercase tracking-widest bg-transparent hover:bg-telemetry-accent hover:text-telemetry-bg hover:shadow-glow-emerald-strong active:scale-95 transition-all duration-300"
            style={{ minHeight: '48px' }}
          >
            <FileDown size={16} />
            <span>Download ATS Resume.pdf</span>
          </a>
          <span className="hidden md:block font-mono text-[9px] text-[#4A4A52] text-right mt-1.5 uppercase tracking-widest">
            SHA256: F14A89C...
          </span>
        </div>

      </div>
    </header>
    </div>
  );
}
