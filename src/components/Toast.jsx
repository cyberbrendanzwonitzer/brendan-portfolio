import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Activity } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const getHeaderIcon = (type) => {
    switch (type) {
      case 'sec':
        return <ShieldCheck className="text-telemetry-accent" size={14} />;
      case 'cmd':
        return <Terminal className="text-telemetry-accent" size={14} />;
      default:
        return <Activity className="text-telemetry-accent" size={14} />;
    }
  };

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, scale: 0.95, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 w-80 border border-white/10 bg-[#0E0E0F]/85 backdrop-blur-2xl rounded-xl p-4 shadow-2xl font-mono text-[11px] select-none cursor-pointer"
          onClick={onClose}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 text-telemetry-white">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
              {getHeaderIcon(toast.type)}
              {toast.type === 'sec' ? 'SECURITY_MONITOR' : toast.type === 'cmd' ? 'CMD_DIRECTIVE' : 'TELEMETRY_LOG'}
            </span>
            <span className="text-[#52525B] hover:text-telemetry-white text-[9px]">[CLOSE]</span>
          </div>

          {/* Payload msg */}
          <div className="text-telemetry-silver leading-relaxed leading-snug break-all">
            {toast.msg}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
