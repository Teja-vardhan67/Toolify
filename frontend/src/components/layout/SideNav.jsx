import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/dashboard', label: 'COMMAND_CENTER', icon: 'grid_view' },
  { path: '/inventory', label: 'INVENTORY_ENGINE', icon: 'database' },
  { path: '#', label: 'HANDSHAKE_PROT', icon: 'handshake' },
  { path: '#', label: 'NEIGHBOR_LEDGER', icon: 'list_alt' },
];

export default function SideNav() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-14 bottom-0 z-40 bg-surface border-r border-outline-variant">
      <div className="p-6 border-b border-outline-variant">
        <span className="font-mono text-xs tracking-widest uppercase text-secondary">OPERATOR_MENU</span>
      </div>
      <nav className="flex-1 py-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-6 py-4 font-mono text-xs tracking-widest uppercase transition-all duration-75 ${
                isActive
                  ? 'bg-primary-container text-surface font-bold'
                  : 'text-secondary hover:border-l-4 hover:border-primary-container hover:bg-on-tertiary-fixed/20'
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-outline-variant">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-surface-container-highest border border-outline-variant flex items-center justify-center">
            <span className="material-symbols-outlined text-xs">person</span>
          </div>
          <div>
            <p className="font-mono text-[10px] text-secondary">OPERATOR_ID</p>
            <p className="font-mono text-xs font-bold text-on-surface">UNIT_42_ALPHA</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
