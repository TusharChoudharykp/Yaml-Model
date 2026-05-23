export default function Login() {
  const handleLogin = () => {
    //window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;

    window.location.href =
      "http://localhost:5000/auth/github";
  };

  return (
    <div className="h-screen w-screen flex flex-col lg:flex-row bg-neutral-950 text-white font-sans overflow-hidden relative">

      {/* Visual Ambient Overlay */}
      <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] bg-rose-600/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] bg-violet-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* LEFT PANEL: High-Fashion Editorial Brand Block */}
      <div className="flex-1 flex flex-col justify-between p-8 lg:p-16 border-b lg:border-b-0 lg:border-r border-neutral-900 bg-neutral-950/40 backdrop-blur-md relative z-10">

        {/* Editorial Sub-tag */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-rose-600 rounded-none animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-rose-500">
            Internal Operations Hub
          </span>
        </div>

        {/* Dynamic Typography Hero Segment */}
        <div className="my-auto py-12 lg:py-0">
          <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.85] mb-6 select-none">
            ML DEPLOY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-violet-500">
              PORTAL.
            </span>
          </h1>
          <p className="text-neutral-400 text-xs uppercase tracking-widest font-semibold max-w-sm leading-relaxed">
            Automated GitOps configuration orchestration engine for hyper-scale cluster environments.
          </p>
        </div>

        {/* Footer Meta */}
        <div className="text-[10px] text-neutral-600 tracking-wider uppercase font-medium">
          &copy; 2026 Production Operations Infrastructure.
        </div>
      </div>

      {/* RIGHT PANEL: Pure Interactive Authorization Stage */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-neutral-900/30 backdrop-blur-xl relative z-10">
        <div className="w-full max-w-sm space-y-8">

          {/* Action Header Label */}
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-xs uppercase tracking-[0.25em] font-black text-white">
              Gatekeeper Verification
            </h2>
            <p className="text-neutral-500 text-xs font-medium">
              Secure authentication handshake through engineering organization records.
            </p>
          </div>

          {/* Interactive Button Module */}
          <div className="relative group">
            {/* Outer hover lighting accent lines */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-600 to-violet-600 rounded-none blur opacity-30 group-hover:opacity-60 transition duration-500" />

            <button
              onClick={handleLogin}
              className="relative w-full bg-white hover:bg-neutral-100 text-neutral-950 transition-all duration-300 text-xs uppercase tracking-[0.2em] py-5 px-6 font-black rounded-none shadow-2xl flex items-center justify-center gap-3 group"
            >
              {/* Minimal SVG GitHub Icon */}
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Continue via GitHub
            </button>
          </div>

          {/* Minimal security statement banner */}
          <p className="text-[10px] text-neutral-600 text-center uppercase tracking-wider font-semibold pt-4">
            Authorized Personnel Access Only
          </p>

        </div>
      </div>
    </div>
  );
}