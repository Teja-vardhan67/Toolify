import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { handshakeService } from '../../services/apiService';

export default function HandshakeModal({ isOpen, onClose, tool, onComplete }) {
  const [selectedDate, setSelectedDate] = useState(25);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const dates = [
    { day: 24, month: 'OCT', weekday: 'THU' },
    { day: 25, month: 'OCT', weekday: 'FRI' },
    { day: 26, month: 'OCT', weekday: 'SAT' },
    { day: 27, month: 'OCT', weekday: 'SUN' },
    { day: 28, month: 'OCT', weekday: 'MON' },
  ];

  const handleConfirm = async () => {
    if (!agreed || !tool || !currentUser) return;
    setLoading(true);
    try {
      await handshakeService.requestBorrow({
        toolId: tool.id,
        borrowerId: currentUser.uid,
        ownerId: tool.ownerId || 'SYSTEM',
        returnDate: `2024-10-${selectedDate}`,
        safetyAgreed: true
      });
      if (onComplete) onComplete();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-surface-dim/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container border-2 border-outline-variant relative">
        {/* Corner Decorations */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary"></div>

        {/* Modal Header */}
        <div className="bg-surface-container-high border-b border-outline-variant p-4 flex justify-between items-center">
          <div>
            <span className="text-[9px] font-mono text-primary tracking-widest uppercase block">Security Layer: Encrypted</span>
            <h2 className="font-headline font-black text-xl tracking-tighter">HANDSHAKE_PROT</h2>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Tool Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-outline-variant p-3">
              <span className="text-[9px] font-mono text-secondary uppercase block mb-1">Subject_Asset</span>
              <span className="font-mono text-sm font-bold text-on-surface line-clamp-1">{tool?.name || 'ASSET'}</span>
            </div>
            <div className="border border-outline-variant p-3">
              <span className="text-[9px] font-mono text-secondary uppercase block mb-1">Asset_Owner</span>
              <span className="font-mono text-sm font-bold text-primary truncate block">{tool?.ownerName || 'COMMUNITY_STASH'}</span>
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest">RETURN_DEADLINE</span>
              <span className="text-[10px] font-mono text-primary">SELECT_NODE</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {dates.map((d) => (
                <button
                  key={d.day}
                  onClick={() => setSelectedDate(d.day)}
                  className={`min-w-[70px] p-3 flex flex-col items-center transition-all ${
                    selectedDate === d.day
                      ? 'border-2 border-primary bg-primary/10'
                      : 'border border-outline-variant bg-surface-container-low'
                  }`}
                >
                  <span className={`text-[10px] font-mono ${selectedDate === d.day ? 'text-primary' : 'text-secondary'}`}>{d.month}</span>
                  <span className="text-xl font-headline font-bold text-on-surface">{d.day}</span>
                  <span className={`text-[8px] font-mono ${selectedDate === d.day ? 'text-primary' : 'text-secondary'}`}>{d.weekday}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Safety Check */}
          <label className="flex items-start gap-4 p-4 border border-outline-variant bg-surface-container-lowest cursor-pointer group">
            <div className="relative mt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="h-5 w-5 appearance-none border-2 border-outline checked:bg-primary checked:border-primary transition-all cursor-pointer"
              />
              {agreed && (
                <span className="material-symbols-outlined absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16px] text-surface font-bold pointer-events-none">
                  check
                </span>
              )}
            </div>
            <span className="text-xs font-mono leading-tight text-secondary group-hover:text-on-surface transition-colors">
              I agree to return this tool in its current condition to {tool?.ownerName || 'the owner'}. Any physical damage or mechanical failure will be reported immediately via the LEDGER module.
            </span>
          </label>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            disabled={!agreed || loading}
            className={`w-full h-14 font-headline font-black text-lg flex items-center justify-center gap-3 transition-all ${
              agreed && !loading
                ? 'bg-primary-container text-surface active:scale-[0.98] hover:bg-primary'
                : 'bg-surface-container-high text-outline cursor-not-allowed'
            }`}
          >
            {loading ? (
              <span className="material-symbols-outlined animate-spin">sync</span>
            ) : (
              <span className="material-symbols-outlined" style={{ animationDuration: '4s' }}>settings</span>
            )}
            {loading ? 'TRANSMITTING...' : 'CONFIRM_PROTOCOL'}
          </button>

          {/* Diagnostics Footer */}
          <div className="pt-2 border-t border-outline-variant flex justify-between font-mono text-[9px] text-secondary">
            <span>SYS_TOKEN: 4x99-PROTO-F</span>
            <span>LATENCY: 14MS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
