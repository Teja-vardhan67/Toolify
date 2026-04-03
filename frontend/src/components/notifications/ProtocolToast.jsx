import { useEffect, useState } from 'react';

export default function ProtocolToast({ isOpen, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed top-16 right-4 z-[60] max-w-[calc(100vw-2rem)] transition-all duration-300 ${visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="bg-surface-container-high border border-primary p-4 flex flex-col gap-3 shadow-[8px_8px_0px_0px_rgba(255,87,51,0.2)]">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">sync_alt</span>
            <span className="font-mono text-xs font-bold text-primary">PROTOCOL_INITIATED</span>
          </div>
          <button onClick={onClose}>
            <span className="material-symbols-outlined text-secondary text-sm hover:text-primary transition-colors">close</span>
          </button>
        </div>
        <div className="font-mono text-sm text-on-surface border-l-2 border-primary-container pl-3">
          Wait for Owner Approval.
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="w-2 h-2 bg-primary-container animate-pulse"></span>
          <span className="font-mono text-[9px] text-secondary uppercase tracking-widest">AWAITING_HANDSHAKE_V4</span>
        </div>
      </div>
    </div>
  );
}
