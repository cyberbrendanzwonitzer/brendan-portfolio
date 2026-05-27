import React from 'react';
import { Briefcase, Terminal } from 'lucide-react';

export default function InfrastructureLogs() {
  const logEntries = [
    {
      company: 'Accoona',
      role: 'Desktop Support Technician & Systems Administrator',
      period: 'Dec 2024 – Present',
      bullets: [
        'Orchestrate multi-tenant network management at MSP scale up to 400+ endpoints, executing configuration changes without an L2 path.',
        'Manage end-to-end Cisco Meraki and Ubiquiti UniFi network hardware rollouts, securing branch-office telemetry.',
        'Supervise Active Directory and Microsoft Entra ID (Azure AD) identity life cycles, auditing user provisioning and security groups.',
        'Lead SecOps incident response, remediating cyber threats utilizing SentinelOne and SaaS Alerts real-time monitoring.',
        'Authored and maintained a central internal Knowledge Base (KB), decreasing onboarding cycles and ticket handoff times.'
      ],
      status: 'ACTIVE'
    },
    {
      company: 'Unisys',
      role: 'Services Support Rep 2',
      period: 'Sept 2023 – Dec 2024',
      bullets: [
        'Managed high-volume enterprise queues, resolving 40–50 complex technical support tickets daily with strict SLA compliance.',
        'Remediated cascading BitLocker and Microsoft Intune enrollment failures, restoring operational states across hundreds of nodes.',
        'Spearheaded technical onboarding and peer mentorship, successfully training and onboarding 14+ technical new hires.'
      ],
      status: 'ARCHIVED'
    },
    {
      company: 'Investment Realty Advisors',
      role: 'Maintenance Operations Supervisor',
      period: 'Oct 2022 – Sept 2023',
      bullets: [
        'Supervised 90+ multi-site real estate property queues utilizing Propertyware, automating maintenance dispatch workflows.',
        'Pioneered proactive tenant communication and client retention programs, boosting service satisfaction ratings.'
      ],
      status: 'ARCHIVED'
    }
  ];

  return (
    <section className="px-6 py-6 max-w-7xl mx-auto select-text">
      <div className="flex items-center justify-between mb-4 font-mono text-xs text-[#6E6E77] uppercase tracking-wider select-none">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-telemetry-accent"></span>
          SYS_LOG: WORK_HISTORY_JOURNAL
        </span>
        <span>SECURITY: ROOT_ACCESS_GRANTED</span>
      </div>

      <div className="flex flex-col gap-6">
        {logEntries.map((entry, idx) => (
          <div 
            key={idx}
            className="border border-telemetry-border bg-telemetry-card rounded-lg relative overflow-hidden group hover:border-telemetry-accent/30 transition-all duration-300"
          >
            {/* Log Header: Row layout with absolute dates */}
            <div className="flex flex-col md:flex-row md:items-center justify-between px-4 py-3 bg-[#0D0D0E] border-b border-telemetry-border/40 font-mono text-xs text-telemetry-silver select-none">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="text-[#6E6E77] hidden sm:inline">[STATION_LOG_{idx + 1}]</span>
                <span className="text-telemetry-white font-bold">{entry.company}</span>
                <span className="text-[#4A4A52] hidden sm:inline">//</span>
                <span className="text-telemetry-accent italic">{entry.role}</span>
              </div>
              <div className="mt-1 md:mt-0 font-semibold text-telemetry-white flex items-center gap-2">
                <span className="inline-block px-1.5 py-0.5 rounded bg-[#1C1917] text-[9px] border border-[#2E2A24] font-semibold text-telemetry-silver">
                  {entry.status}
                </span>
                <span>{entry.period}</span>
              </div>
            </div>

            {/* Bullets List with Custom Log Line Styling */}
            <div className="p-4 md:p-6 font-mono text-xs leading-relaxed text-[#A1A1AA] flex flex-col gap-3">
              {entry.bullets.map((bullet, bIdx) => (
                <div 
                  key={bIdx} 
                  className="flex gap-3 pl-3 items-start select-text"
                  style={{ paddingLeft: '12px' }} // Fallback constraint
                >
                  <span className="text-telemetry-accent mt-0.5 select-none font-bold">
                    &gt;_
                  </span>
                  <p className="flex-1 font-sans text-xs md:text-sm text-telemetry-silver">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Status Footer (pure aesthetic telemetry detail) */}
            <div className="px-4 py-1.5 border-t border-telemetry-border/20 bg-telemetry-card/30 font-mono text-[9px] text-[#4A4A52] flex justify-between select-none">
              <span>NODE_ID: ACC_0{idx + 1}_LOG_TRACE</span>
              <span>CHECKSUM: OK_V1.0</span>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
