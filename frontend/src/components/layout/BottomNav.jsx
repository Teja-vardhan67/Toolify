import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'COMMAND', icon: 'dashboard' },
  { path: '/inventory', label: 'ENGINE', icon: 'construction' },
  { path: '#', label: 'PROTOCOL', icon: 'sync_alt' },
  { path: '#', label: 'LEDGER', icon: 'history_edu' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center lg:hidden h-16 bg-surface border-t border-outline">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center p-2 w-full h-full transition-none ${
              isActive
                ? 'bg-primary-container text-surface'
                : 'text-secondary hover:bg-outline-variant'
            }`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-mono text-[10px] uppercase tracking-tighter">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
