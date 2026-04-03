import { Link, useLocation } from 'react-router-dom';

export default function TopAppBar({ systemStatus = "ONLINE" }) {
  const location = useLocation();
  const isAuth = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-14 bg-surface border-b border-outline-variant">
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">terminal</span>
        <Link to="/" className="flex items-center gap-0">
          <span className="font-mono font-bold text-primary border-l-2 border-primary-container pl-2 uppercase tracking-tighter text-lg">
            TOOLIFY_OS_v1.0
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isAuth ? (
          <div className="font-label uppercase tracking-widest text-xs text-secondary">
            SYSTEM_STATUS: <span className="text-primary-container">{systemStatus === "LOCKED" ? "LOCKED" : "ONLINE"}</span>
          </div>
        ) : (
          <button className="w-10 h-10 flex items-center justify-center text-secondary hover:bg-primary-container/10 hover:text-primary">
            <span className="material-symbols-outlined">search</span>
          </button>
        )}
        <span className="material-symbols-outlined text-secondary hover:text-primary cursor-pointer hidden md:block">
          settings_input_component
        </span>
      </div>
    </header>
  );
}
