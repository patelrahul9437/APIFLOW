import React from 'react';
import { useSelector } from 'react-redux';

function App() {
  const redux_theme = useSelector((state) => state.theme);
  // Using the condition from themeSlice: true corresponds to Light mode, false to Dark mode.
  const isLight = redux_theme.theme === true;

  return (
    <div className={`w-full min-h-screen ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#050505] text-slate-100'} font-sans transition-colors duration-500`}>
      {/* Hero Section */}
      <section className="relative w-full pt-28 pb-20 overflow-hidden flex flex-col items-center text-center px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 left-[10%] w-[30rem] h-[30rem] bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-[20%] right-[10%] w-[30rem] h-[30rem] bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        
        <div className="z-10 max-w-5xl mx-auto flex flex-col items-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border ${isLight ? 'border-blue-200 bg-blue-50/50 text-blue-800 backdrop-blur-sm' : 'border-blue-900/50 bg-blue-900/20 text-blue-300 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]'}`}>
             <span className="flex h-2 w-2 rounded-full bg-blue-500 mb-0.5 animate-ping"></span>
             <span className="text-sm font-medium tracking-wide">ApiFlow v2.0 is now live</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 leading-tight">
            The modern standard for <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 drop-shadow-sm">
              API Testing
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl max-w-3xl mb-12 font-light ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Supercharge your developer workflow. Build, debug, and monitor your APIs with an intuitive, lightning-fast interface designed for power users.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:shadow-[0_0_35px_rgba(79,70,229,0.5)] transform hover:-translate-y-1">
              Start Building Now
            </button>
            <button className={`px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:-translate-y-1 ${isLight ? 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:shadow-lg' : 'bg-[#111] text-slate-200 border border-slate-800 hover:bg-gray-800 hover:shadow-lg hover:border-gray-700'}`}>
              View Documentation
            </button>
          </div>
        </div>

        {/* Mock App Interface Preview */}
        <div className="mt-20 w-full max-w-6xl mx-auto z-10 group cursor-default">
          <div className={`rounded-2xl overflow-hidden border shadow-2xl ${isLight ? 'border-slate-200 bg-white/80 backdrop-blur-xl shadow-slate-300/50' : 'border-slate-800/80 bg-slate-900/80 backdrop-blur-xl shadow-indigo-500/10'} transition-all duration-700 transform scale-[0.98] group-hover:scale-100 group-hover:-translate-y-2`}>
            {/* Header bar */}
            <div className={`flex items-center px-4 py-3 border-b ${isLight ? 'border-slate-200 bg-slate-100/50' : 'border-slate-800 bg-[#0a0f18]/50'}`}>
              <div className="flex gap-2.5">
                <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shadow-[0_0_5px_rgba(251,191,36,0.5)]"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></div>
              </div>
              <div className={`ml-6 px-4 py-1.5 rounded-md text-xs font-mono flex-1 text-center truncate ${isLight ? 'bg-slate-200/50 text-slate-600' : 'bg-slate-950/50 text-slate-400 border border-slate-800/50'}`}>
                GET https://api.apiflow.dev/v1/users/profile
              </div>
            </div>
            {/* Body */}
            <div className="flex flex-col md:flex-row min-h-[420px]">
              {/* Sidebar */}
              <div className={`w-full md:w-64 border-r p-4 ${isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800/50 bg-[#0b101a]/50'}`}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-4 opacity-50 px-2">Collections</div>
                <div className="space-y-1 font-mono text-sm">
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${isLight ? 'bg-blue-100/50 text-blue-700' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-blue-500 text-xs">GET</span> 
                      <span className="font-medium">/users</span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-800/20 ${isLight ? 'hover:bg-slate-100 text-slate-700' : 'text-slate-300'}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-emerald-500 text-xs">POST</span> 
                      <span className="font-medium">/auth/login</span>
                    </div>
                  </div>
                  <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-800/20 ${isLight ? 'hover:bg-slate-100 text-slate-700' : 'text-slate-300'}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-amber-500 text-xs">PUT</span> 
                      <span className="font-medium">/settings</span>
                    </div>
                  </div>
                   <div className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors hover:bg-slate-800/20 ${isLight ? 'hover:bg-slate-100 text-slate-700' : 'text-slate-300'}`}>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-rose-500 text-xs">DEL</span> 
                      <span className="font-medium">/users/1</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Main panel */}
              <div className="flex-1 p-6 font-mono text-sm relative">
                 <div className="flex justify-between items-center mb-6 border-b pb-3 border-slate-700/20">
                   <div className="flex gap-6">
                     <span className="text-blue-500 border-b-2 border-blue-500 pb-3 -mb-[14px] cursor-pointer font-semibold">Response</span>
                     <span className={`cursor-pointer opacity-60 hover:opacity-100 pb-3 transition-opacity ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Headers (12)</span>
                     <span className={`cursor-pointer opacity-60 hover:opacity-100 pb-3 transition-opacity ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Cookies</span>
                   </div>
                   <div className="flex gap-4 items-center">
                     <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-bold">200 OK</span>
                     <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>142 ms</span>
                     <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>2.4 KB</span>
                   </div>
                 </div>
                 <pre className={`p-5 rounded-xl overflow-x-auto text-[13px] leading-relaxed shadow-inner border ${isLight ? 'bg-[#f8fafc] text-slate-800 border-slate-200' : 'bg-[#0d1117] text-slate-300 border-slate-800'}`}>
                   <code className="block mt-1">
<span className="text-pink-500">{'{'}</span><br/>
{'  '}<span className="text-blue-400">"status"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"success"</span>,<br/>
{'  '}<span className="text-blue-400">"data"</span><span className="text-slate-400">:</span> <span className="text-pink-500">{'{'}</span><br/>
{'    '}<span className="text-blue-400">"id"</span><span className="text-slate-400">:</span> <span className="text-amber-400">"usr_9x8a7b6c"</span>,<br/>
{'    '}<span className="text-blue-400">"email"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"developer@apiflow.com"</span>,<br/>
{'    '}<span className="text-blue-400">"plan"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"enterprise"</span>,<br/>
{'    '}<span className="text-blue-400">"metadata"</span><span className="text-slate-400">:</span> <span className="text-pink-500">{'{'}</span><br/>
{'      '}<span className="text-blue-400">"created_at"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"2026-03-27T10:00:00Z"</span>,<br/>
{'      '}<span className="text-blue-400">"last_login"</span><span className="text-slate-400">:</span> <span className="text-emerald-400">"2026-03-27T14:05:58Z"</span><br/>
{'    '}<span className="text-pink-500">{'}'}</span>,<br/>
{'    '}<span className="text-blue-400">"rate_limit"</span><span className="text-slate-400">:</span> <span className="text-pink-500">{'{'}</span><br/>
{'      '}<span className="text-blue-400">"limit"</span><span className="text-slate-400">:</span> <span className="text-amber-400">10000</span>,<br/>
{'      '}<span className="text-blue-400">"remaining"</span><span className="text-slate-400">:</span> <span className="text-amber-400">9998</span><br/>
{'    '}<span className="text-pink-500">{'}'}</span><br/>
{'  '}<span className="text-pink-500">{'}'}</span><br/>
<span className="text-pink-500">{'}'}</span>
                   </code>
                 </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-24 px-6 relative z-10 ${isLight ? 'bg-white' : 'bg-[#03060c]'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Designed for speed and power</h2>
            <p className={`text-xl max-w-2xl mx-auto font-light ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Everything you need to orchestrate your APIs, packed into a blazing fast interface.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${isLight ? 'bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100' : 'bg-[#0d121c] hover:bg-[#111723] border border-slate-800/50 hover:border-slate-700 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center mb-6 text-blue-500 shadow-inner">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className={`${isLight ? 'text-slate-600' : 'text-slate-400'} leading-relaxed font-light`}>Built on a modern stack to ensure your requests are executed instantly with zero latency.</p>
            </div>
            {/* Feature 2 */}
            <div className={`p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${isLight ? 'bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100' : 'bg-[#0d121c] hover:bg-[#111723] border border-slate-800/50 hover:border-slate-700 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center mb-6 text-purple-500 shadow-inner">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Military-Grade Security</h3>
              <p className={`${isLight ? 'text-slate-600' : 'text-slate-400'} leading-relaxed font-light`}>Your API keys and credentials never leave your local environment unless explicitly synced.</p>
            </div>
            {/* Feature 3 */}
            <div className={`p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 ${isLight ? 'bg-slate-50 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 border border-slate-100' : 'bg-[#0d121c] hover:bg-[#111723] border border-slate-800/50 hover:border-slate-700 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]'}`}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 flex items-center justify-center mb-6 text-emerald-500 shadow-inner">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sync Anywhere</h3>
              <p className={`${isLight ? 'text-slate-600' : 'text-slate-400'} leading-relaxed font-light`}>Seamlessly synchronize your collections across devices and collaborate in real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 relative overflow-hidden flex justify-center px-4">
        {/* Decorative elements */}
        <div className={`absolute inset-0 max-w-7xl mx-auto rounded-[3rem] ${isLight ? 'bg-blue-600/5' : 'bg-blue-900/10'} mix-blend-overlay`}></div>
        <div className={`relative z-10 max-w-5xl w-full p-16 md:p-24 rounded-[3rem] text-center border overflow-hidden ${isLight ? 'bg-white border-blue-100 shadow-xl' : 'bg-slate-900/80 backdrop-blur-3xl border-slate-800 shadow-[0_0_50px_rgba(37,99,235,0.05)]'}`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
          
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight relative z-10">Ready to upgrade your workflow?</h2>
          <p className={`text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light relative z-10 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Join thousands of developers using ApiFlow to build faster and more reliable APIs.</p>
          <button className="relative z-10 px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-2xl hover:shadow-xl dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
             Get ApiFlow Free
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className={`py-10 text-center border-t ${isLight ? 'border-slate-200 text-slate-500' : 'border-slate-800/50 text-slate-500'}`}>
        <p className="font-light">© 2026 ApiFlow Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
