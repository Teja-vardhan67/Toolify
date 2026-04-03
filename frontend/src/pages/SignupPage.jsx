import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import TopAppBar from '../components/layout/TopAppBar';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', orgId: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) return;
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.name });
      navigate('/dashboard');
    } catch (error) {
      console.error("Signup failed:", error.message);
      alert("PROVISION_FAILED: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body dot-matrix">
      <TopAppBar systemStatus="LOCKED" />

      <main className="min-h-screen pt-[56px] flex flex-col md:flex-row">
        {/* Left Panel: Status */}
        <section className="w-full md:w-1/3 border-r border-outline-variant bg-surface-container-lowest p-6 flex flex-col justify-between">
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 border border-outline-variant px-3 py-1 mb-4 bg-surface-container">
                <div className="w-2 h-2 bg-primary animate-pulse"></div>
                <span className="font-mono text-[10px] tracking-tighter text-secondary">SYSTEM_READINESS: 98%</span>
              </div>
              <h1 className="font-headline font-bold text-4xl leading-none text-on-surface mb-4">ACCOUNT_PROVISION</h1>
              <p className="font-mono text-sm text-secondary leading-relaxed opacity-70">
                Initializing environmental variables for top-level tool orchestration. Operator must verify identity before accessing the core filesystem.
              </p>
            </div>

            {/* Status Log */}
            <div className="border border-outline-variant p-4 font-mono text-[11px] space-y-2 bg-surface-container-lowest">
              <div className="flex justify-between border-b border-outline-variant pb-1">
                <span className="text-secondary">[TIMESTAMP]</span>
                <span className="text-primary-container">LOG_STATE</span>
              </div>
              <div className="text-secondary opacity-50">14:22:01 — Handshaking with node_77...</div>
              <div className="text-secondary opacity-50">14:22:02 — Metadata integrity check [OK]</div>
              <div className="text-secondary opacity-50">14:22:03 — Encrypting provision_token...</div>
              <div className="text-primary border-l-2 border-primary pl-2 bg-primary/5 py-1 mt-2">
                AWAITING_OPERATOR_INPUT...
              </div>
            </div>
          </div>

          {/* Server Image */}
          <div className="mt-12 hidden md:block">
            <div className="w-full h-48 border border-outline-variant relative overflow-hidden grayscale opacity-40">
              <img
                alt="Server room infrastructure"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCy7L8tAEsk0A8-jCJUUlJBpmaf2RF6w4daIoS2g_Lx5kpyLlEQd3pC7cwbU4hcls4S1vB_ir5CGmxiesEoZMW-1h0m5LFv4Db9N5dU6cz6IzeoHi21WrmuQNCWXDMrG2dGgMfujBNohxL-EP_td1CYrYqmK1w80HTXUnbWS8Bzt9Byqbano1M7RmJi9r7Kl-433DG-KL6gkLSu8nGUInc05ZG-Qo-1qaerWY5oCOMbEXbUjDIpPx2prUCHY7gy1wilSv0otibU8sU"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Right Panel: Form */}
        <section className="flex-1 bg-surface-dim p-6 md:p-12 lg:p-20 overflow-y-auto">
          <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Form Header */}
              <div className="flex items-baseline gap-2 border-b border-outline-variant pb-2 mb-8">
                <span className="font-mono text-xs text-primary-container">FORM_REF: 00-AF-10</span>
                <div className="h-[1px] flex-1 bg-outline-variant opacity-30"></div>
                <span className="font-mono text-xs text-secondary">REVISION_2024</span>
              </div>

              {/* Inputs */}
              <div className="space-y-6">
                <div className="group">
                  <label className="block font-mono text-[10px] text-secondary mb-1 uppercase tracking-widest">[OPERATOR_NAME]</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    className="w-full bg-surface-container-low border-b border-outline text-on-surface font-mono p-3 focus:border-primary-container transition-colors placeholder:opacity-20"
                    placeholder="e.g. MARCUS_VAUGHN"
                  />
                </div>

                <div className="group">
                  <label className="block font-mono text-[10px] text-secondary mb-1 uppercase tracking-widest">[EMAIL_COMM]</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    className="w-full bg-surface-container-low border-b border-outline text-on-surface font-mono p-3 focus:border-primary-container transition-colors placeholder:opacity-20"
                    placeholder="operator@toolify.os"
                  />
                </div>

                <div className="group">
                  <label className="block font-mono text-[10px] text-secondary mb-1 uppercase tracking-widest">[ACCESS_TOKEN_KEY]</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={handleChange('password')}
                    className="w-full bg-surface-container-low border-b border-outline text-on-surface font-mono p-3 focus:border-primary-container transition-colors placeholder:opacity-20"
                    placeholder="••••••••"
                  />
                </div>

                <div className="group">
                  <label className="block font-mono text-[10px] text-secondary mb-1 uppercase tracking-widest">[ORGANIZATION_ID]</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.orgId}
                      onChange={handleChange('orgId')}
                      className="w-full bg-surface-container-low border-b border-outline text-on-surface font-mono p-3 pr-10 focus:border-primary-container transition-colors placeholder:opacity-20"
                      placeholder="ORGN-XXXX-XXXX"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-outline text-sm">fingerprint</span>
                  </div>
                </div>
              </div>

              {/* Community Clearance */}
              <div className="border border-outline-variant bg-surface-container-low p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <h3 className="font-headline font-bold text-sm tracking-wide uppercase">Community Clearance</h3>
                </div>
                <p className="font-body text-xs text-secondary mb-6 leading-relaxed">
                  Upload a high-fidelity image of your valid operator identification card. This is required for level-2 clearance protocols.
                </p>
                <div className="border-2 border-dashed border-outline-variant flex flex-col items-center justify-center p-8 hover:border-primary transition-colors cursor-pointer group">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary">add_a_photo</span>
                  <span className="font-mono text-[10px] text-secondary uppercase">Drop photo or CLICK_TO_BROWSE</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary-container text-white font-mono font-bold py-4 border border-primary-fixed-dim hover:bg-primary hover:text-on-primary-fixed transition-all active:translate-y-[1px] flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-50"
                >
                  {loading ? 'TRANSMITTING...' : 'PROVISION_ACCOUNT'}
                  <span className="material-symbols-outlined">{loading ? 'sync' : 'bolt'}</span>
                </button>
                <div className="flex justify-center">
                  <Link
                    to="/login"
                    className="font-mono text-xs text-secondary hover:text-error transition-colors flex items-center gap-2 py-2"
                  >
                    <span className="material-symbols-outlined text-sm">cancel</span>
                    [ABORT_MISSION]
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Data Tape Footer */}
      <footer className="fixed bottom-0 left-0 w-full h-8 bg-surface-container-lowest border-t border-outline-variant flex items-center overflow-hidden z-50">
        <div className="whitespace-nowrap font-mono text-[10px] text-secondary/60 flex gap-8 px-4 items-center">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-on-tertiary-fixed rounded-full"></span> SYSTEM_LIVE</span>
          <span className="opacity-40">:: NODE_WEST_CAN_12 ::</span>
          <span>ENCRYPTION_ACTIVE: AES-256</span>
          <span className="opacity-40">::</span>
          <span className="text-primary-container">PENDING_REGISTRATION: [NULL]</span>
          <span className="opacity-40">::</span>
          <span>ID_VALIDATION: WAITING</span>
          <span className="opacity-40">::</span>
          <span>UPTIME: 99.9982%</span>
        </div>
      </footer>
    </div>
  );
}
