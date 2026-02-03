
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants';

interface ApiKeyGateProps {
  children: React.ReactNode;
}

export const ApiKeyGate: React.FC<ApiKeyGateProps> = ({ children }) => {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      try {
        if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
          const result = await window.aistudio.hasSelectedApiKey();
          setHasKey(result);
        } else {
          // If the API isn't present, assume we are in an environment with process.env.API_KEY already
          setHasKey(true);
        }
      } catch (e) {
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  const handleOpenSelect = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Assume success as per instructions to avoid race conditions
      setHasKey(true);
    }
  };

  if (hasKey === null) return null; // Still checking

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
          <div className="dark-glass rounded-[3rem] p-12 shadow-2xl text-center space-y-10 border border-white/5">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-20 h-20 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/40">
                <ICONS.Shield className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">Authorization</h1>
                <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">Neural Compute Requirement</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-slate-400 text-sm leading-relaxed">
                This enterprise-grade intelligence core requires a valid <span className="text-white font-bold">API Key</span> from a paid GCP project to utilize Gemini 3 Pro reasoning.
              </p>
              
              <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 text-left">
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                  <ICONS.Brain className="w-3 h-3" /> Requirements
                </p>
                <ul className="text-xs text-slate-500 space-y-2">
                  <li className="flex gap-2">
                    <span className="text-indigo-400">•</span>
                    Select a key from a project with billing enabled.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-indigo-400">•</span>
                    Review <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-400 underline underline-offset-4 hover:text-indigo-300">Billing Docs</a> for details.
                  </li>
                </ul>
              </div>

              <button 
                onClick={handleOpenSelect}
                className="w-full bg-white text-slate-900 px-8 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <ICONS.Sparkles className="w-4 h-4 text-indigo-600" />
                Select API Key
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
