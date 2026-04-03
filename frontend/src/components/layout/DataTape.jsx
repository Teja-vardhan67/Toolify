import { dataTapeMessages } from '../../data/mockData';

export default function DataTape({ messages = dataTapeMessages, position = "bottom" }) {
  const positionClasses = position === "top"
    ? "fixed top-14 left-0 w-full z-40"
    : "fixed bottom-16 lg:bottom-0 w-full z-40";

  const borderClass = position === "top"
    ? "border-b border-outline-variant"
    : "border-t border-outline-variant";

  return (
    <div className={`${positionClasses} h-6 bg-surface-container-lowest ${borderClass} overflow-hidden flex items-center`}>
      <div className="flex whitespace-nowrap animate-marquee">
        {[...messages, ...messages].map((msg, i) => (
          <span key={i} className="flex items-center gap-2 mx-8">
            <span className={`w-1.5 h-1.5 ${i % 2 === 0 ? 'bg-primary-container' : 'bg-outline-variant'}`}></span>
            <span className="font-mono text-[10px] text-secondary/60 uppercase tracking-widest">{msg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
