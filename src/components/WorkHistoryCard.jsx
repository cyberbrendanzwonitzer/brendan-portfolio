import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WorkHistoryCard() {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const jobs = [
    {
      company: 'Accoona',
      location: 'Dallas, TX',
      role: 'Desktop Support Technician & Systems Administrator',
      period: 'Dec 2024 – Present',
      bullets: [
        'Support 35+ multi-tenant client environments ranging from 20 to 400+ endpoints, serving as a primary escalation point for endpoint, identity, network, and security issues without a dedicated L2 support path.',
        'Configure site infrastructure rollouts using Cisco Meraki and Ubiquiti UniFi to build stable logical and physical network environments for remote branches and client offices.',
        'Administer user lifecycles, access provisioning, and identity changes through Active Directory and Microsoft Entra ID while supporting Conditional Access policies and security controls.',
        'Isolate compromised endpoints and user accounts using SentinelOne and SaaS Alerts, then coordinate remediation, re-imaging, account recovery, and post-incident user security awareness.',
        'Support Windows 11 migration readiness across client endpoints by auditing device compliance, patch status, asset inventory, and endpoint readiness requirements.',
        'Reduced repeat troubleshooting and accelerated team resolution times by building an internal knowledge base with standardized fixes, escalation notes, and client-specific support procedures.'
      ],
      status: 'ACTIVE'
    },
    {
      company: 'Unisys',
      location: 'Dallas, TX',
      role: 'Services Support Rep 2',
      period: 'Sept 2023 – Dec 2024',
      bullets: [
        'Resolved 40 to 50 hardware, software, and network tickets daily in a high-volume enterprise queue while maintaining strict SLA expectations.',
        'Restored user productivity during cascading endpoint deployment failures involving BitLocker recovery, OneDrive sync issues, Outlook profile corruption, and Microsoft Intune compliance mismatches.',
        'Onboarded and trained 14+ technical new hires while acting as an informal escalation resource for troubleshooting workflow, ticket handling, and desk performance.',
        'Troubleshot multi-system access, device, application, and network disruptions for enterprise users to maintain business continuity and operational uptime.'
      ],
      status: 'ARCHIVED'
    },
    {
      company: 'Investment Realty Advisors',
      location: 'Midvale, UT',
      role: 'Maintenance Operations Supervisor',
      period: 'Oct 2022 – Sept 2023',
      bullets: [
        'Coordinated service operations, asset tracking, vendor dispatch, and workflow prioritization across a portfolio of 90+ properties.',
        'Coordinated ticket-style Propertyware work order queues, vendor dispatch, and service follow-up to maintain operational continuity across 90+ properties.'
      ],
      status: 'ARCHIVED'
    }
  ];

  return (
    <div className="border border-white/5 bg-white/[0.01] backdrop-blur-2xl rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-white/10 transition-colors duration-300">
      <div className="flex flex-col gap-4">
        {/* Title */}
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="text-lg md:text-xl font-bold font-sans text-telemetry-white">
            Work History: Accoona & Unisys
          </h3>
          <span className="font-mono text-[9px] text-[#71717A] tracking-wider uppercase">sys.journal_trace</span>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-telemetry-silver font-sans leading-relaxed">
          Chronological record of multi-tenant enterprise support, systems administration, and SecOps telemetry across enterprise clusters.
        </p>

        {/* Accordion Jobs List */}
        <div className="flex flex-col gap-3 mt-4">
          {jobs.map((job, idx) => {
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
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-telemetry-white text-sm">{job.company}</span>
                      <span className="text-[10px] text-[#71717A] font-mono">({job.location})</span>
                    </div>
                    <span className="text-telemetry-accent italic text-[11px] font-mono">{job.role}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline font-mono text-[10px] text-[#71717A]">{job.period}</span>
                    {isExpanded ? <ChevronUp size={14} className="text-telemetry-silver" /> : <ChevronDown size={14} className="text-telemetry-silver" />}
                  </div>
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
                      <div className="p-4 bg-[#121212]/40 border-t border-white/5 font-sans text-xs text-telemetry-silver flex flex-col gap-2.5">
                        {job.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex gap-2.5 items-start">
                            <span className="text-telemetry-accent font-bold mt-0.5 select-none font-mono">&gt;</span>
                            <p className="flex-1 text-telemetry-silver leading-relaxed text-xs md:text-sm">{bullet}</p>
                          </div>
                        ))}
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
        <span className="font-mono text-[9px] text-[#52525B]">ENVIRONMENT: SECURE-PROD</span>
        <button 
          onClick={() => setExpandedIndex(expandedIndex === 0 ? 1 : 0)}
          className="px-4 py-2 rounded-lg border border-white/5 bg-white/[0.01] text-xs font-sans text-telemetry-white hover:bg-white/[0.04] hover:border-white/15 transition-all active:scale-98"
        >
          Toggle Audit Node
        </button>
      </div>
    </div>
  );
}
