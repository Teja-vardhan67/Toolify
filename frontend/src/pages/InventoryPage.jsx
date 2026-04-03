import { useState, useEffect } from 'react';
import TopAppBar from '../components/layout/TopAppBar';
import SideNav from '../components/layout/SideNav';
import BottomNav from '../components/layout/BottomNav';
import DataTape from '../components/layout/DataTape';
import HandshakeModal from '../components/modals/HandshakeModal';
import ProtocolToast from '../components/notifications/ProtocolToast';
import { toolService } from '../services/apiService';

export default function InventoryPage() {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTools() {
      try {
        const data = await toolService.getAll();
        setTools(data);
      } catch (error) {
        console.error("Failed to fetch inventory:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTools();
  }, []);

  const handleInitTransfer = (tool) => {
    setSelectedTool(tool);
    setShowModal(true);
  };

  const handleConfirmProtocol = () => {
    setShowModal(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body dot-matrix">
      <TopAppBar />
      <SideNav />

      <main className="pt-20 pb-24 px-4 lg:ml-64 max-w-7xl mx-auto">
        {/* Command Palette Search */}
        <section className="mb-8">
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-primary">terminal</span>
            </div>
            <input
              className="w-full bg-surface-container-high border-b border-outline py-5 pl-14 pr-20 font-mono text-sm tracking-wider focus:border-primary transition-colors placeholder:text-secondary/40"
              placeholder="CMD+K TO INVENTORY SEARCH..."
              type="text"
            />
            <div className="absolute inset-y-0 right-4 flex items-center gap-2">
              <kbd className="hidden md:block px-2 py-1 bg-surface-container-highest border border-outline-variant text-[10px] font-mono text-secondary">CMD</kbd>
              <kbd className="hidden md:block px-2 py-1 bg-surface-container-highest border border-outline-variant text-[10px] font-mono text-secondary">K</kbd>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 gap-px bg-outline-variant border border-outline-variant mb-8">
          <div className="bg-surface p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[10px] text-secondary tracking-[0.2em] uppercase mb-1">ITEMS_SHARED</p>
                <p className="font-headline text-4xl font-bold">14</p>
              </div>
              <span className="material-symbols-outlined text-primary-fixed-dim">inventory_2</span>
            </div>
          </div>
          <div className="bg-surface p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-mono text-[10px] text-secondary tracking-[0.2em] uppercase mb-1">TRUST_RATING</p>
                <p className="font-headline text-4xl font-bold">98<span className="text-sm text-secondary">%</span></p>
              </div>
              <span className="material-symbols-outlined text-on-tertiary-fixed">verified_user</span>
            </div>
            <div className="h-1 bg-surface-container-highest w-full">
              <div className="h-full bg-primary-container" style={{ width: '98%' }}></div>
            </div>
          </div>
        </section>

        {/* Inventory Engine */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-headline text-2xl font-bold tracking-tight uppercase">THE_INVENTORY_ENGINE</h2>
            <span className="font-mono text-[10px] text-secondary uppercase bg-surface-container-high px-2 py-1">V_2.04_STABLE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading && <div className="font-mono text-primary animate-pulse">LOADING_DATA_STREAM...</div>}
            {!loading && tools.length === 0 && <div className="font-mono text-secondary">NO_ITEMS_FOUND</div>}
            {!loading && tools.map((tool) => (
              <article key={tool.id} className="bg-surface-container border border-outline-variant relative group overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${tool.status === 'available' ? 'bg-primary-container' : 'bg-outline-variant'}`}></div>

                <div className="p-4 border-b border-outline-variant flex justify-between items-center">
                  <span className="font-mono text-[10px] text-secondary">EQ_TAG: {tool.id}</span>
                  {tool.status === 'available' ? (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-on-tertiary-fixed text-[10px] font-bold uppercase">
                      <span className="w-1.5 h-1.5 bg-[#4CAF50]"></span> AVAILABLE
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold uppercase">
                      <span className="w-1.5 h-1.5 bg-error"></span> IN USE
                    </span>
                  )}
                </div>

                <div className="aspect-[16/9] bg-surface-container-lowest relative">
                  <img
                    alt={tool.name}
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 ${tool.status === 'in_use' ? 'opacity-50 group-hover:opacity-70' : 'opacity-80 group-hover:opacity-100'}`}
                    src={tool.imageUrl || tool.image}
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-headline text-xl font-bold mb-1">{tool.name}</h3>
                  <p className="font-mono text-xs text-secondary mb-4 tracking-tighter">SPEC_01: {tool.spec}</p>
                  {tool.status === 'available' ? (
                    <button
                      onClick={() => handleInitTransfer(tool)}
                      className="w-full py-3 bg-surface-container-highest border border-outline hover:bg-primary-container hover:text-on-primary font-mono text-xs font-bold transition-all duration-75 uppercase"
                    >
                      INIT_TRANSFER
                    </button>
                  ) : (
                    <button
                      className="w-full py-3 bg-surface-container-low border border-outline-variant text-outline-variant font-mono text-xs font-bold uppercase cursor-not-allowed"
                      disabled
                    >
                      LOCKED_UNTIL_{tool.lockedUntil}
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Request Access CTA */}
        <section className="mb-12 flex flex-col items-center">
          <button className="group relative px-12 py-6 bg-primary-container text-surface font-headline font-black text-xl uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
            <span className="relative z-10">REQUEST ACCESS</span>
            <div className="absolute inset-0 border-2 border-primary translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
          </button>
          <p className="mt-4 font-mono text-[10px] text-secondary tracking-widest">ENCRYPTED_CONNECTION_SECURE</p>
        </section>

        {/* Live Activity Feed */}
        <section className="bg-surface-container-lowest border border-outline-variant overflow-hidden mb-8">
          <div className="p-3 border-b border-outline-variant flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-[10px] text-on-surface uppercase tracking-widest">LIVE_ACTIVITY_FEED</span>
          </div>
          <div className="p-4 font-mono text-xs leading-relaxed space-y-1 text-secondary">
            <p><span className="text-primary">[14:22:01]</span> USER_ID_4492 -&gt; <span className="text-on-surface">BORROWED</span> -&gt; ITEM_ID_MK-0912</p>
            <p><span className="text-primary">[13:58:45]</span> USER_ID_0012 -&gt; <span className="text-error">RETURNED</span> -&gt; ITEM_ID_DW-4401</p>
            <p><span className="text-primary">[12:15:30]</span> USER_ID_8831 -&gt; <span className="text-on-surface">BORROWED</span> -&gt; ITEM_ID_BS-2209</p>
            <p><span className="text-primary">[11:04:12]</span> USER_ID_2104 -&gt; <span className="text-on-surface">BORROWED</span> -&gt; ITEM_ID_TS-7781</p>
          </div>
        </section>
      </main>

      {/* Data Tape */}
      <DataTape />
      <BottomNav />

      {/* Modals & Toasts */}
      <HandshakeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        tool={selectedTool}
        onComplete={handleConfirmProtocol}
      />
      <ProtocolToast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
