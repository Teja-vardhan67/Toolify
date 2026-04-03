import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toolService } from '../../services/apiService';

export default function ListingModal({ isOpen, onClose, onComplete }) {
  const [name, setName] = useState('');
  const [spec, setSpec] = useState('');
  const [category, setCategory] = useState('Heavy Duty');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !spec || !currentUser) return;
    setLoading(true);

    try {
      await toolService.create({
        name,
        spec,
        category,
        imageUrl: imageUrl || 'https://placehold.co/600x400/1e1e1e/4caf50?text=ASSET_IMG',
        ownerId: currentUser.uid,
        ownerName: currentUser.displayName || currentUser.email || 'OPERATOR',
        status: 'available'
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
      <div className="w-full max-w-lg bg-surface-container border-2 border-outline-variant relative">
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-primary"></div>
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-primary"></div>

        <div className="bg-surface-container-high border-b border-outline-variant p-4 flex justify-between items-center">
          <div>
            <span className="text-[9px] font-mono text-primary tracking-widest uppercase block">DB_INSERT_LAYER</span>
            <h2 className="font-headline font-black text-xl tracking-tighter">ADD_TO_STASH</h2>
          </div>
          <button onClick={onClose} className="text-secondary hover:text-primary transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-secondary tracking-widest uppercase mb-1">Asset_Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. DeWalt Hammer Drill"
                className="w-full bg-surface-container-lowest border border-outline p-3 font-mono text-sm text-on-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-secondary tracking-widest uppercase mb-1">Hardware_Spec</label>
              <input
                type="text"
                required
                value={spec}
                onChange={(e) => setSpec(e.target.value)}
                placeholder="e.g. 20V MAX XR Brushless"
                className="w-full bg-surface-container-lowest border border-outline p-3 font-mono text-sm text-on-surface focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-secondary tracking-widest uppercase mb-1">Image_URL (Optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-surface-container-lowest border border-outline p-3 font-mono text-sm text-secondary focus:border-primary focus:outline-none"
              />
            </div>
            
            <div className="p-4 border border-outline-variant bg-surface-container-lowest">
               <p className="text-xs font-mono leading-tight text-secondary">
                 By listing this tool, it will become visible in the global INVENTORY ENGINE. Other verified operators in your sector may request a COMMAND_PROTOCOL to borrow it. You maintain full authority to APPROVE or REJECT any incoming requests.
               </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !name || !spec}
            className={`w-full h-14 font-headline font-black text-lg flex items-center justify-center gap-3 transition-all ${
              !loading && name && spec
                ? 'bg-primary-container text-surface hover:bg-primary active:scale-[0.98]'
                : 'bg-surface-container-high text-outline cursor-not-allowed'
            }`}
          >
            {loading ? <span className="material-symbols-outlined animate-spin">sync</span> : <span className="material-symbols-outlined">upload</span>}
            {loading ? 'TRANSMITTING...' : 'INITIALIZE_LISTING'}
          </button>
        </form>
      </div>
    </div>
  );
}
