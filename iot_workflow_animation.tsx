import React, { useState, useEffect } from 'react';
import { Server, Cloud, Database, Cpu, LayoutDashboard, Activity } from 'lucide-react';

// --- CSS Animations Injection ---
const styleSheet = `
  @keyframes waterFlow {
    0% { background-position: 0% 50%; }
    100% { background-position: -200% 50%; }
  }
  .animate-water {
    background: linear-gradient(90deg, #0f172a 0%, #1e3a8a 20%, #3b82f6 50%, #1e3a8a 80%, #0f172a 100%);
    background-size: 200% 100%;
    animation: waterFlow 4s linear infinite;
  }
  
  @keyframes pulseNode {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.1); opacity: 0.8; box-shadow: 0 0 15px #10b981; }
  }
  .node-active { animation: pulseNode 2s infinite; }

  @keyframes packetLeftToCenter {
    0% { left: 15%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { left: 50%; opacity: 0; }
  }
  .anim-packet-l2c { animation: packetLeftToCenter 2s linear infinite; }

  @keyframes packetRightToCenter {
    0% { right: 15%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { right: 50%; opacity: 0; }
  }
  .anim-packet-r2c { animation: packetRightToCenter 2s linear infinite; }

  @keyframes packetHorizontal {
    0% { left: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { left: 100%; opacity: 0; }
  }
  .anim-packet-hz { animation: packetHorizontal 1.5s linear infinite; }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  .anim-blink { animation: blink 1s infinite; }

  /* Traveling Horizontal Wireless Wave Animation (Scene 3) */
  @keyframes waveTravel {
    0% {
      left: 0%;
      opacity: 0;
      transform: translateY(-50%) scale(0.6);
    }
    15% {
      opacity: 1;
      transform: translateY(-50%) scale(0.85);
    }
    85% {
      opacity: 1;
      transform: translateY(-50%) scale(1.05);
      filter: drop-shadow(0 0 6px currentColor);
    }
    100% {
      left: 100%;
      opacity: 0;
      transform: translateY(-50%) scale(1.2);
    }
  }
  .anim-wave-travel {
    animation: waveTravel 2.4s infinite linear both;
    opacity: 0;
  }

  /* Traveling Vertical Downwards Wireless Wave Animation (Scene 4) */
  @keyframes waveTravelVerticalDown {
    0% {
      top: 0%;
      opacity: 0;
      transform: translateX(-50%) scale(0.6) rotate(90deg);
    }
    15% {
      opacity: 1;
      transform: translateX(-50%) scale(0.85) rotate(90deg);
    }
    85% {
      opacity: 1;
      transform: translateX(-50%) scale(1.05) rotate(90deg);
      filter: drop-shadow(0 0 6px currentColor);
    }
    100% {
      top: 100%;
      opacity: 0;
      transform: translateX(-50%) scale(1.2) rotate(90deg);
    }
  }
  .anim-wave-v-down {
    animation: waveTravelVerticalDown 1.6s infinite linear both;
    opacity: 0;
  }

  /* Traveling Vertical Upwards Wireless Wave Animation (Scene 4) */
  @keyframes waveTravelVerticalUp {
    0% {
      bottom: 0%;
      opacity: 0;
      transform: translateX(-50%) scale(0.6) rotate(-90deg);
    }
    15% {
      opacity: 1;
      transform: translateX(-50%) scale(0.85) rotate(-90deg);
    }
    85% {
      opacity: 1;
      transform: translateX(-50%) scale(1.05) rotate(-90deg);
      filter: drop-shadow(0 0 6px currentColor);
    }
    100% {
      bottom: 100%;
      opacity: 0;
      transform: translateX(-50%) scale(1.2) rotate(-90deg);
    }
  }
  .anim-wave-v-up {
    animation: waveTravelVerticalUp 1.6s infinite linear both;
    opacity: 0;
  }
`;

export default function App() {
  const [scene, setScene] = useState(0);
  const totalScenes = 4;

  const handleNext = () => setScene((s) => Math.min(totalScenes - 1, s + 1));
  const handlePrev = () => setScene((s) => Math.max(0, s - 1));

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden">
      <style>{styleSheet}</style>

      {/* Header */}
      <header className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center z-10">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Activity className="text-emerald-400" />
          CitySense IoT Workflow
        </h1>
        <div className="flex gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-2 w-8 rounded-full ${scene === i ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          ))}
        </div>
      </header>

      {/* Main Scene Container */}
      <main className="flex-1 relative overflow-hidden flex items-center justify-center p-4">
        {scene === 0 && <Scene1 />}
        {scene === 1 && <Scene2 />}
        {scene === 2 && <Scene3 />}
        {scene === 3 && <Scene4 />}
      </main>

      {/* Navigation Controls */}
      <footer className="p-6 border-t border-slate-800 bg-slate-900 flex justify-between items-center z-10">
        <p className="text-slate-400 text-sm">
          {scene === 0 && "Step 1: Nodes collecting and transmitting data"}
          {scene === 1 && "Step 2: Master Node pushing to EMQX Broker"}
          {scene === 2 && "Step 3: Edge Processing & Storage pipeline"}
          {scene === 3 && "Step 4: Real-time Dashboard data retrieval"}
        </p>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            disabled={scene === 0}
            className="px-6 py-2 rounded-md bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={scene === totalScenes - 1}
            className="px-6 py-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next Step
          </button>
        </div>
      </footer>
    </div>
  );
}

// ==========================================
// SCENE 1: Drainage & Nodes
// ==========================================
function Scene1() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Drainage Data Collection</h2>
        <p className="text-slate-400">Nodes 1 and 3 send local data to Node 2 (Master)</p>
      </div>

      {/* Drainage Environment */}
      <div className="relative w-4/5 h-64 border-y-4 border-slate-700 bg-slate-900 rounded-lg overflow-hidden flex items-center">
        {/* Water */}
        <div className="absolute bottom-0 w-full h-32 animate-water opacity-60 mix-blend-screen" />
        
        {/* Grid lines for drainage wall effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* Nodes Container */}
        <div className="relative w-full flex justify-between px-16 z-10">
          
          {/* Node 1 */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-slate-800 border-2 border-emerald-500 rounded-lg flex items-center justify-center node-active z-20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Cpu className="text-emerald-400" />
            </div>
            <span className="text-sm font-mono text-emerald-400 bg-slate-900/80 px-2 py-1 rounded">Node_1</span>
          </div>

          {/* Node 2 (Center) */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 bg-slate-800 border-2 border-blue-500 rounded-lg flex items-center justify-center node-active z-20 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Server className="text-blue-400 w-8 h-8" />
            </div>
            <span className="text-sm font-mono text-blue-400 bg-slate-900/80 px-2 py-1 rounded">Node_2 (Master)</span>
          </div>

          {/* Node 3 */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-slate-800 border-2 border-emerald-500 rounded-lg flex items-center justify-center node-active z-20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Cpu className="text-emerald-400" />
            </div>
            <span className="text-sm font-mono text-emerald-400 bg-slate-900/80 px-2 py-1 rounded">Node_3</span>
          </div>
        </div>

        {/* Data Packets (Node 1 -> Node 2) */}
        <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2">
          <div className="absolute w-3 h-3 bg-emerald-400 rounded-full anim-packet-l2c shadow-[0_0_10px_#34d399]" />
          <div className="absolute w-3 h-3 bg-emerald-400 rounded-full anim-packet-l2c shadow-[0_0_10px_#34d399]" style={{ animationDelay: '1s' }} />
        </div>

        {/* Data Packets (Node 3 -> Node 2) */}
        <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2">
          <div className="absolute w-3 h-3 bg-emerald-400 rounded-full anim-packet-r2c shadow-[0_0_10px_#34d399]" />
          <div className="absolute w-3 h-3 bg-emerald-400 rounded-full anim-packet-r2c shadow-[0_0_10px_#34d399]" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SCENE 2: Node 2 to EMQX
// ==========================================
function Scene2() {
  const [jsonText, setJsonText] = useState("");
  const fullJson = `Topic: drainage/Node_1  QoS: 0
{"node_id": "Node_1", "flow_rate": 2.81, "water_level": 31.6, "timestamp": "2026-04-25T14:53:09", "sample_count": 12}
2026-04-25 14:54:16

Topic: drainage/Node_3  QoS: 0
{"node_id": "Node_3", "flow_rate": 3.16, "water_level": 28.56, "timestamp": "2026-04-25T14:53:09", "sample_count": 12}
2026-04-25 14:54:17`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setJsonText(fullJson.slice(0, i));
      i += 3;
      if (i > fullJson.length) i = 0; // Loop for animation
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">MQTT Broker Ingestion</h2>
        <p className="text-slate-400">Node 2 pushes consolidated data to EMQX Cloud</p>
      </div>

      <div className="flex w-3/4 items-center justify-between gap-8 mt-4">
        {/* Node 2 */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-24 h-24 bg-slate-800 border-2 border-blue-500 rounded-lg flex items-center justify-center node-active">
            <Server className="text-blue-400 w-10 h-10" />
          </div>
          <span className="text-sm font-mono text-blue-400">Node_2 (Master)</span>
        </div>

        {/* Connection Animation */}
        <div className="flex-1 relative h-10 flex items-center">
          <div className="w-full border-t-2 border-dashed border-slate-600 absolute"></div>
          <div className="absolute w-full h-full">
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full top-1/2 -translate-y-1/2 anim-packet-hz shadow-[0_0_10px_#a855f7]" />
            <div className="absolute w-4 h-4 bg-purple-500 rounded-full top-1/2 -translate-y-1/2 anim-packet-hz shadow-[0_0_10px_#a855f7]" style={{ animationDelay: '0.75s' }} />
          </div>
          <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400 bg-slate-950 px-2">MQTT Publish</div>
        </div>

        {/* EMQX Cloud Platform */}
        <div className="flex flex-col items-center gap-4 w-1/2">
          <div className="w-full border border-slate-700 bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
              <Cloud className="text-purple-400 w-5 h-5" />
              <span className="font-semibold text-slate-200">EMQX Cloud Platform</span>
              <span className="ml-auto flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <div className="p-4 h-48 bg-slate-950 font-mono text-xs text-green-400 overflow-hidden whitespace-pre-wrap relative">
               {jsonText}
               <span className="anim-blink inline-block w-2 h-3 bg-green-400 ml-1"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// WIRELESS SIGNAL WAVES CONNECTOR (Traveling with Overlay - Sine Wave version)
// ==========================================
function SignalWaves({ colorClass = "text-amber-500" }) {
  return (
    <div className={`relative w-full h-full pointer-events-none ${colorClass}`}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute top-1/2 -translate-y-1/2 anim-wave-travel"
          style={{ animationDelay: `${i * 0.6}s` }}
        >
          {/* Custom SVG horizontal sine-wave packet (~) */}
          <svg
            className="w-10 h-4"
            viewBox="0 0 40 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 0,6 Q 5,1 10,6 T 20,6 T 30,6 T 40,6" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// SCENE 3: EMQX -> Cloudflare -> Firebase
// ==========================================
function Scene3() {
  const [status, setStatus] = useState("Calculating...");

  useEffect(() => {
    const statuses = ["Calculating...", "Status: NORMAL", "Calculating...", "Status: LOW RISK"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % statuses.length;
      setStatus(statuses[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Cloud Processing Pipeline</h2>
        <p className="text-slate-400">EMQX routes data to Cloudflare Workers for logic, then saves to Firebase</p>
      </div>

      {/* Grid container with math columns layout to map center coordinates perfectly */}
      <div className="relative flex w-full max-w-4xl items-center mt-4 h-64">
        
        {/* EMQX CENTER TO CLOUDFLARE CENTER (12.5% to 50%) */}
        <div 
          className="absolute h-12 z-10 pointer-events-none"
          style={{ left: '12.5%', width: '37.5%' }}
        >
          <SignalWaves colorClass="text-purple-400" />
        </div>

        {/* CLOUDFLARE CENTER TO FIREBASE CENTER (50% to 87.5%) */}
        <div 
          className="absolute h-12 z-10 pointer-events-none"
          style={{ left: '50%', width: '37.5%' }}
        >
          <SignalWaves colorClass="text-orange-400" />
        </div>

        {/* EMQX Column (Width: 25%, centered around 12.5% mark) */}
        <div className="w-1/4 flex flex-col items-center gap-2 relative z-20">
          <div className="w-20 h-20 bg-slate-800 border-2 border-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <Cloud className="text-purple-400 w-8 h-8" />
          </div>
          <span className="font-bold text-purple-400">EMQX Broker</span>
        </div>

        {/* Cloudflare Column (Width: 50%, centered around 50% mark) */}
        <div className="w-2/4 flex flex-col items-center gap-2 relative z-20">
          <div className="w-32 h-24 bg-slate-800 border-2 border-orange-500 rounded-lg flex flex-col items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
            <Cpu className="text-orange-400 w-6 h-6 mb-2 anim-blink" />
            <span className="font-bold text-orange-400 text-sm">Cloudflare Worker</span>
          </div>
          {/* Status calculation popup */}
          <div className="absolute -bottom-12 bg-slate-900 border border-slate-700 px-3 py-1 rounded text-xs font-mono text-emerald-400 flex items-center gap-2">
             <Activity className="w-3 h-3" />
             {status}
          </div>
        </div>

        {/* Firebase Column (Width: 25%, centered around 87.5% mark) */}
        <div className="w-1/4 flex flex-col items-center gap-2 relative z-20">
          <div className="w-20 h-20 bg-slate-800 border-2 border-yellow-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)]">
            <Database className="text-yellow-400 w-8 h-8" />
          </div>
          <span className="font-bold text-yellow-400">Firebase RTDB</span>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// VERTICAL SINE WAVES CONNECTOR (For Scene 4)
// ==========================================
function VerticalSignalWaves({ colorClass = "text-amber-500", direction = "down" }) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${colorClass}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`absolute left-1/2 -translate-x-1/2 ${
            direction === "down" ? "anim-wave-v-down" : "anim-wave-v-up"
          }`}
          style={{ animationDelay: `${i * 0.45}s` }}
        >
          {/* Custom SVG vertical sine-wave packet (~ rotated into direction) */}
          <svg
            className="w-12 h-5"
            viewBox="0 0 40 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 0,6 Q 5,1 10,6 T 20,6 T 30,6 T 40,6" />
          </svg>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// SCENE 4: Dashboard Request Loop
// ==========================================
function Scene4() {
  const [seqState, setSeqState] = useState(0); 
  // 0: DASH_TO_CF (Dash wakes up Cloudflare)
  // 1: CF_TO_DB (Cloudflare queries Firebase)
  // 2: DB_TO_CF (Firebase returns data to Cloudflare)
  // 3: CF_TO_DASH (Cloudflare sends fresh data back to Dash)
  // 4: DISPLAY_STABLE (Dashboard lights up with fresh numbers)

  useEffect(() => {
    let active = true;
    const cycle = async () => {
      while(active) {
        setSeqState(0); // Dashboard sending wake-up request downwards
        await new Promise(r => setTimeout(r, 1800));
        if (!active) break;
        
        setSeqState(1); // Cloudflare querying database downwards
        await new Promise(r => setTimeout(r, 1800));
        if (!active) break;

        setSeqState(2); // Database responding upwards
        await new Promise(r => setTimeout(r, 1800));
        if (!active) break;

        setSeqState(3); // Cloudflare delivering formatted payload upwards
        await new Promise(r => setTimeout(r, 1800));
        if (!active) break;

        setSeqState(4); // Display completed stable data
        await new Promise(r => setTimeout(r, 3500));
      }
    };
    cycle();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Dynamic Header Flow */}
      <div className="text-center mb-4 shrink-0">
        <h2 className="text-2xl font-bold text-white mb-1">Dashboard Data Retrieval</h2>
        <p className="text-slate-400 text-sm">Dashboard requests data via Cloudflare Node.js API</p>
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center relative flex-1 justify-center">
        
        {/* ==================== 1. DASHBOARD CARD (Top) ==================== */}
        <div className={`w-full bg-slate-900 border transition-all duration-500 rounded-xl p-4 shadow-2xl relative z-20 ${
          seqState === 4 ? "border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]" : "border-slate-700"
        }`}>
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
            <LayoutDashboard className={`w-5 h-5 transition-colors ${seqState === 4 ? "text-emerald-400" : "text-slate-400"}`} />
            <span className="font-bold">CitySense Dashboard</span>
            
            {/* Status updates in header matching sequential loop states */}
            {seqState === 0 && <span className="ml-auto text-xs text-orange-400 bg-orange-400/10 px-2 py-1 rounded anim-blink">"Initializing connection..."</span>}
            {seqState === 1 && <span className="ml-auto text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded anim-blink">"Querying Cloudflare API..."</span>}
            {seqState === 2 && <span className="ml-auto text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded anim-blink">"Database retrieving records..."</span>}
            {seqState === 3 && <span className="ml-auto text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded anim-blink">"Pushing processed payload..."</span>}
            {seqState === 4 && <span className="ml-auto text-xs text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded font-bold">● Live Sync Active</span>}
          </div>

          {/* Metrics Displays */}
          <div className="flex gap-4">
            <div className={`flex-1 p-3 rounded-lg border transition-all duration-500 ${
              seqState === 4 
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300" 
                : "bg-slate-950/40 border-slate-800/80 text-slate-500"
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider">Water Level</div>
              <div className="text-2xl font-bold mt-1 transition-all duration-500">
                {seqState === 4 ? "35.0 cm" : "--- cm"}
              </div>
            </div>

            <div className={`flex-1 p-3 rounded-lg border transition-all duration-500 ${
              seqState === 4 
                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300" 
                : "bg-slate-950/40 border-slate-800/80 text-slate-500"
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider">Flow Rate</div>
              <div className="text-2xl font-bold mt-1 transition-all duration-500">
                {seqState === 4 ? "2.62 L/min" : "--- L/min"}
              </div>
            </div>

            <div className="flex-[2] bg-slate-950/40 rounded-lg p-2 border border-slate-800 flex items-end gap-2 h-16 relative overflow-hidden">
               {/* Animated chart bars only populate to full height in step 4 */}
               <div className={`w-4 bg-blue-500/60 rounded-t transition-all duration-700 ${seqState === 4 ? "h-full" : "h-1/5"}`}></div>
               <div className={`w-4 bg-emerald-500/60 rounded-t transition-all duration-700 ${seqState === 4 ? "h-3/4" : "h-1/6"}`}></div>
               <div className={`w-4 bg-blue-500/60 rounded-t transition-all duration-700 ${seqState === 4 ? "h-1/2" : "h-1/5"}`}></div>
               {seqState !== 4 && (
                 <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                   Awaiting Stream
                 </div>
               )}
            </div>
          </div>
        </div>

        {/* ==================== UPPER WAVE SPACE (Dashboard <-> Cloudflare 2) ==================== */}
        <div className="relative w-full h-20 z-10 shrink-0">
          {/* Signal 0: Dashboard requests API (traveling downwards) */}
          {seqState === 0 && (
            <VerticalSignalWaves colorClass="text-orange-400" direction="down" />
          )}
          {/* Signal 3: API pushes completed payload back to Dashboard (traveling upwards) */}
          {seqState === 3 && (
            <VerticalSignalWaves colorClass="text-emerald-400" direction="up" />
          )}
        </div>

        {/* ==================== 2. CLOUDFLARE NODE (Middle) ==================== */}
        <div className={`bg-slate-900 border-2 rounded-xl p-3 flex items-center gap-4 transition-all duration-500 z-20 shrink-0 ${
          seqState === 1 || seqState === 3 
            ? "border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.15)] scale-105" 
            : "border-slate-800"
        }`}>
          <div className={`p-2 rounded-lg ${seqState === 1 || seqState === 3 ? "bg-orange-500/20 text-orange-400" : "bg-slate-800 text-slate-400"}`}>
            <Server className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold transition-colors text-sm ${seqState === 1 || seqState === 3 ? "text-orange-400" : "text-slate-200"}`}>
              Cloudflare 2
            </span>
            <span className="text-[10px] text-slate-400 font-mono">(Node.js API Endpoint)</span>
          </div>
        </div>

        {/* ==================== LOWER WAVE SPACE (Cloudflare 2 <-> Firebase RTDB) ==================== */}
        <div className="relative w-full h-20 z-10 shrink-0">
          {/* Signal 1: Cloudflare queries DB (traveling downwards) */}
          {seqState === 1 && (
            <VerticalSignalWaves colorClass="text-yellow-400" direction="down" />
          )}
          {/* Signal 2: Firebase returns document (traveling upwards) */}
          {seqState === 2 && (
            <VerticalSignalWaves colorClass="text-blue-400" direction="up" />
          )}
        </div>

        {/* ==================== 3. FIREBASE RTDB CARD (Bottom) ==================== */}
        <div className={`bg-slate-900 border-2 rounded-xl p-3 flex items-center gap-4 transition-all duration-500 z-20 shrink-0 ${
          seqState === 2 ? "border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.15)] scale-105" : "border-slate-800"
        }`}>
          <div className={`p-2 rounded-lg ${seqState === 2 ? "bg-yellow-500/20 text-yellow-400" : "bg-slate-800 text-slate-400"}`}>
            <Database className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className={`font-bold transition-colors text-sm ${seqState === 2 ? "text-yellow-400" : "text-slate-200"}`}>
              Firebase RTDB
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Real-time DB Records</span>
          </div>
        </div>

      </div>
    </div>
  );
}