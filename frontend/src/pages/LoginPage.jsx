import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import TopAppBar from '../components/layout/TopAppBar';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [progress, setProgress] = useState(0);

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Simulate the biometric scan progress visually after successful auth
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => navigate('/dashboard'), 300);
            return 100;
          }
          return prev + 20;
        });
      }, 150);
    } catch (error) {
      console.error("Auth failed:", error.message);
      alert("AUTH_FAILED: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body flex flex-col overflow-hidden">
      <TopAppBar systemStatus="LOCKED" />

      <main className="flex-grow flex items-center justify-center relative p-6 pt-14">
        {/* Scanline & Background */}
        <div className="absolute inset-0 scanline-overlay opacity-20 z-0"></div>
        <div className="absolute inset-0 biometric-grid opacity-10 z-0"></div>

        {/* Crosshair Corners */}
        <div className="absolute top-20 left-10 w-8 h-8 border-t-2 border-l-2 border-outline-variant"></div>
        <div className="absolute top-20 right-10 w-8 h-8 border-t-2 border-r-2 border-outline-variant"></div>
        <div className="absolute bottom-16 left-10 w-8 h-8 border-b-2 border-l-2 border-outline-variant"></div>
        <div className="absolute bottom-16 right-10 w-8 h-8 border-b-2 border-r-2 border-outline-variant"></div>

        {/* Auth Terminal */}
        <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 bg-surface-container-lowest border border-outline-variant">
          {/* Left Column: Biometric */}
          <div className="hidden md:flex flex-col p-8 border-r border-outline-variant bg-surface-container-low/50">
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-[10px] text-secondary tracking-widest uppercase">Biometric_Scan_v2.4</span>
              <div className="w-2 h-2 bg-primary-container animate-pulse"></div>
            </div>
            <div className="flex-grow flex items-center justify-center py-12">
              <div className="relative">
                <span className="material-symbols-outlined text-[160px] text-primary-container/30" style={{ fontVariationSettings: "'wght' 100" }}>
                  fingerprint
                </span>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_rgba(255,180,164,0.8)] animate-scan-line"></div>
              </div>
            </div>
            <div className="mt-auto space-y-4 font-mono text-[10px] text-secondary/60">
              <div className="flex justify-between border-b border-outline-variant/30 pb-1">
                <span>LATENCY_MS</span>
                <span className="text-on-surface">14.02</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-1">
                <span>ENCRYPTION_TYPE</span>
                <span className="text-on-surface">AES_256_GCM</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/30 pb-1">
                <span>KERNEL_HASH</span>
                <span className="text-on-surface">0x7F22...A91</span>
              </div>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-10">
              <div className="inline-block px-2 py-1 bg-primary-container text-on-primary-container font-mono text-[10px] font-bold mb-4">
                AUTH_GATE
              </div>
              <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface uppercase mb-2">
                Identify Personnel
              </h1>
              <p className="font-mono text-xs text-secondary tracking-tighter">
                PROVISIONING_MODE: SECURE_CHANNEL_ACTIVE
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-8">
              {/* Identity ID */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase text-secondary mb-1 tracking-widest">
                  [IDENTITY_ID]
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary-container text-on-surface font-mono text-sm py-3 transition-colors placeholder:text-outline/40"
                  placeholder="OPERATOR@TOOLIFY.OS"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-container transition-all duration-300 group-focus-within:w-full glow-bottom"></div>
              </div>

              {/* Access Key */}
              <div className="group relative">
                <label className="block font-mono text-[10px] uppercase text-secondary mb-1 tracking-widest">
                  [ACCESS_KEY]
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-t-0 border-x-0 border-b-2 border-outline-variant focus:border-primary-container text-on-surface font-mono text-sm py-3 transition-colors placeholder:text-outline/40"
                  placeholder="••••••••••••••••"
                />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-container transition-all duration-300 group-focus-within:w-full glow-bottom"></div>
              </div>

              {/* Progress & Button */}
              <div className="pt-6 space-y-4">
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between font-mono text-[9px] text-secondary">
                    <span>SYSTEM_DECRYPTING...</span>
                    <span className="text-primary-container">{progress >= 100 ? 'COMPLETE' : 'READY'}</span>
                  </div>
                  <div className="w-full h-1 bg-surface-container-highest">
                    <div
                      className="h-full bg-primary-container glow-primary transition-all duration-150"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-container text-on-primary-fixed font-headline font-bold uppercase tracking-[0.2em] py-4 text-sm hover:bg-primary transition-colors duration-75 flex items-center justify-center gap-3 active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-sm">lock_open</span>
                  AUTHENTICATE
                </button>
              </div>

              {/* Abort Link */}
              <div className="text-center pt-4">
                <Link
                  to="/signup"
                  className="font-mono text-[10px] text-secondary hover:text-primary transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-xs">add</span>
                  [PROVISION_NEW_ACCOUNT]
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Data Tape Footer */}
      <footer className="bg-surface-container-lowest border-t border-outline-variant h-8 flex items-center overflow-hidden z-50">
        <div className="whitespace-nowrap flex animate-marquee">
          {[1, 2].map((set) => (
            <div key={set} className="flex items-center gap-8 px-4 font-mono text-[10px] text-secondary/60">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-container"></span> LOG_ENTRY: SESSION_INITIALIZED_PORT_8080</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-outline-variant"></span> LATENCY: 14MS</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-container"></span> KERNEL: V1.0.4-STABLE</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-outline-variant"></span> SECURE_HANDSHAKE: COMPLETE</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary-container"></span> OPERATOR_ID: UNKNOWN</span>
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-outline-variant"></span> THREAT_LEVEL: ZERO</span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
