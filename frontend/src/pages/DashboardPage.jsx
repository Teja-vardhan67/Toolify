import { useState, useEffect } from 'react';
import TopAppBar from '../components/layout/TopAppBar';
import SideNav from '../components/layout/SideNav';
import BottomNav from '../components/layout/BottomNav';
import DataTape from '../components/layout/DataTape';
import ListingModal from '../components/modals/ListingModal';
import { useAuth } from '../contexts/AuthContext';
import { toolService, handshakeService } from '../services/apiService';

export default function DashboardPage() {
  const [showListingModal, setShowListingModal] = useState(false);
  const [activeLeases, setActiveLeases] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [myStash, setMyStash] = useState([]);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const [leases, requests, stash] = await Promise.all([
        handshakeService.getByBorrower(currentUser.uid),
        handshakeService.getByOwner(currentUser.uid),
        toolService.getByOwner(currentUser.uid)
      ]);
      
      setActiveLeases(leases.filter(l => l.status === 'approved'));
      setIncomingRequests(requests.filter(r => r.status === 'pending'));
      setMyStash(stash);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, [currentUser]);

  const handleApprove = async (id) => {
    await handshakeService.approve(id);
    loadDashboardData();
  };

  const handleReject = async (id) => {
    await handshakeService.reject(id);
    loadDashboardData();
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body">
      <TopAppBar />
      <SideNav />

      <main className="lg:ml-64 pt-14 pb-16 lg:pb-0 min-h-screen">
        <DataTape position="top" />

        <div className="p-4 lg:p-8 space-y-8 mt-6">
          {/* Header */}
          <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-outline-variant pb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-primary"></div>
                <span className="font-mono text-[10px] tracking-widest text-primary uppercase">MODULE_DASHBOARD</span>
              </div>
              <h2 className="text-3xl font-headline font-bold text-on-surface leading-none tracking-tight">COMMAND_CENTER</h2>
            </div>
            <button
              onClick={() => setShowListingModal(true)}
              className="px-6 py-3 bg-primary-container text-surface font-black tracking-widest uppercase hover:bg-primary transition-colors text-sm font-headline"
            >
              + ADD TO INVENTORY
            </button>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Incoming Requests (Lender Role) */}
            <section className="space-y-4">
              <h3 className="font-headline text-lg font-bold tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 bg-error animate-pulse"></span>
                INCOMING_PROTOCOLS ({incomingRequests.length})
              </h3>
              
              <div className="space-y-4">
                {incomingRequests.length === 0 && <p className="font-mono text-secondary text-sm">NO_PENDING_REQUESTS</p>}
                {incomingRequests.map((req) => (
                  <div key={req.id} className="bg-surface-container border border-outline-variant p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-mono text-xs text-secondary uppercase mb-1">BORROWER_ID: {req.borrowerId}</p>
                        <p className="font-headline font-bold text-lg">ASSET_{req.toolId}</p>
                      </div>
                      <span className="text-[10px] bg-error-container text-on-error-container font-mono px-2 py-1 uppercase">PENDING_APPROVAL</span>
                    </div>
                    <p className="font-mono text-xs text-secondary border border-outline-variant p-2">
                      REQUESTED_UNTIL: {req.returnDate}
                    </p>
                    <div className="flex gap-2">
                      <button onClick={() => handleApprove(req.id)} className="flex-1 py-2 bg-primary-container hover:bg-primary text-surface font-bold text-xs uppercase font-mono">
                        APPROVE
                      </button>
                      <button onClick={() => handleReject(req.id)} className="flex-1 py-2 border border-outline text-secondary hover:bg-surface-container-high font-bold text-xs uppercase font-mono">
                        REJECT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Active Leases (Borrower Role) */}
            <section className="space-y-4">
              <h3 className="font-headline text-lg font-bold tracking-widest uppercase flex items-center gap-2 border-b border-outline-variant pb-2">
                ACTIVE_LEASES ({activeLeases.length})
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {activeLeases.length === 0 && <p className="font-mono text-secondary text-sm">NO_ACTIVE_LEASES</p>}
                {activeLeases.map((lease) => (
                  <div key={lease.id} className="bg-surface-container-low border border-outline flex">
                    <div className="w-4 bg-primary-container h-full"></div>
                    <div className="p-4 w-full">
                      <p className="font-mono text-[10px] text-secondary uppercase mb-1">ASSET: {lease.toolId}</p>
                      <h4 className="font-headline font-bold text-lg mb-2">OWNER: {lease.ownerId}</h4>
                      <p className="font-mono text-xs border border-outline-variant border-dashed p-2">
                        RETURN_DEADLINE: <span className="text-primary font-bold">{lease.returnDate}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* My Stash (Lender View) */}
          <section className="space-y-4 pt-8 border-t border-outline-variant">
            <h3 className="font-headline text-lg font-bold tracking-widest uppercase flex items-center gap-2">
              MY_STASH ({myStash.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {myStash.length === 0 && <p className="font-mono text-secondary text-sm col-span-2">STASH_EMPTY</p>}
              {myStash.map((tool) => (
                <div key={tool.id} className="bg-surface-container border border-outline-variant">
                  <div className="aspect-square bg-surface-container-lowest relative overflow-hidden">
                    <img src={tool.imageUrl} alt={tool.name} className={`w-full h-full object-cover ${tool.status === 'in_use' ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}`} />
                  </div>
                  <div className="p-3">
                    <p className="font-mono text-[10px] text-secondary uppercase mb-1">{tool.spec}</p>
                    <h4 className="font-headline font-bold text-sm leading-tight truncate">{tool.name}</h4>
                    <span className={`inline-block mt-2 text-[8px] font-mono px-1 py-0.5 border ${tool.status === 'in_use' ? 'border-error text-error' : 'border-primary text-primary'}`}>
                      {tool.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <BottomNav />

      <ListingModal
        isOpen={showListingModal}
        onClose={() => setShowListingModal(false)}
        onComplete={() => {
          setShowListingModal(false);
          loadDashboardData();
        }}
      />
    </div>
  );
}
