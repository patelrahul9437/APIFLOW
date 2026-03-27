import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Api() {
  const redux_theme = useSelector((state) => state.theme);
  const isLight = redux_theme.theme === true;

  const [body, setBody] = useState(`{\n  "email": "developer@apiflow.com",\n  "password": "hashed_pwd_secret"\n}`);

  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.apiflow.dev/v1/users/profile');
  const [activeTab, setActiveTab] = useState('params');

  const color_codes_bg = {
    200: 'bg-emerald-500/10',
    201: 'bg-emerald-500/10',
    204: 'bg-emerald-500/10',
    400: 'bg-rose-500/10',
    401: 'bg-rose-500/10',
    403: 'bg-rose-500/10',
    404: 'bg-rose-500/10',
    500: 'bg-rose-500/10',
    503: 'bg-rose-500/10',
  }

  const color_codes_text = {
    200: 'text-emerald-500',
    201: 'text-emerald-500',
    204: 'text-emerald-500',
    400: 'text-rose-500',
    401: 'text-rose-500',
    403: 'text-rose-500',
    404: 'text-rose-500',
    500: 'text-rose-500',
    503: 'text-rose-500',
  }

  const color_codes_border = {
    200: 'border-emerald-500/20',
    201: 'border-emerald-500/20',
    204: 'border-emerald-500/20',
    400: 'border-rose-500/20',
    401: 'border-rose-500/20',
    403: 'border-rose-500/20',
    404: 'border-rose-500/20',
    500: 'border-rose-500/20',
    503: 'border-rose-500/20',
  }

  const status_message = {
    200: 'Ok',
    201: 'Created',
    204: 'No Content',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
  }

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const [status_color_code,setStatusColorCode] = useState({})


  const status_ui = (status) => {

    if(status >= 200 && status < 300){
        setStatusColorCode({
            bg: "bg-emerald-500/10",
            text: "text-emerald-500",
            border: "border-emerald-500/20",
            message: "Ok",
        })
    }
    else if(status >= 400 && status < 500){
        setStatusColorCode({
            bg: "bg-rose-500/10",
            text: "text-rose-500",
            border: "border-rose-500/20",
            message: "Error",
        })
    }
    else if(status >= 500 && status < 600){
        setStatusColorCode({
            bg: "bg-rose-500/10",
            text: "text-rose-500",
            border: "border-rose-500/20",
            message: "Error",
        })
    }else{
        setStatusColorCode({
            bg: "bg-rose-500/10",
            text: "text-rose-500",
            border: "border-rose-500/20",
            message: "Error",
        })
    }

    
  }

    const handleSend = async () => {
        setLoading(true);
        const startTime = Date.now();

        try {
            const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            };

            if (method !== "GET" && body) {
            options.body = body;
            }

            const res = await fetch(url, options);

            let data;
            try {
            data = await res.json();
            } catch {
            data = await res.text(); // fallback
            }

            const endTime = Date.now();

            setResponse({
            status: res.status,
            status_message: status_message[res.status] || "Unknown",
            time: `${endTime - startTime} ms`, // ✅ real time
            size: `${(JSON.stringify(data).length / 1024).toFixed(2)} KB`, // ✅ correct KB
            data,
            });

            status_ui(res.status);

        } catch (error) {
            setResponse({
            status: "NETWORK ERROR",
            status_message: "Failed",
            time: "0 ms",
            size: "0 KB",
            data: error.message,
            });

            status_ui(500);
        }

        setLoading(false);
        };

        

  const getMethodColor = (m) => {
    switch(m) {
      case 'GET': return 'text-blue-500';
      case 'POST': return 'text-emerald-500';
      case 'PUT': return 'text-amber-500';
      case 'DELETE': return 'text-rose-500';
      case 'PATCH': return 'text-purple-500';
      default: return 'text-slate-500';
    }
  };

  // Helper function to beautifully format incoming JSON objects dynamcially
  const syntaxHighlight = (json) => {
    if (!json) return '';
    let jsonStr = typeof json !== 'string' ? JSON.stringify(json, undefined, 2) : json;
    jsonStr = jsonStr.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'text-amber-400 font-bold'; // number
        let value = match;
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'text-blue-500'; // key
                // remove quotes from keys for cleaner look 
                value = match.replace(/^"|":$/g, '') + '<span class="text-slate-500">:</span>';
            } else {
                cls = 'text-emerald-500'; // string
            }
        } else if (/true|false/.test(match)) {
            cls = 'text-purple-500'; // boolean
        } else if (/null/.test(match)) {
            cls = 'text-rose-400'; // null
        }
        return `<span class="${cls}">${value}</span>`;
    });
  };

  return (
    <div className={`w-full min-h-[calc(100vh-80px)] pt-6 pb-10 px-4 md:px-8 ${isLight ? 'bg-slate-50 text-slate-800' : 'bg-[#050505] text-slate-200'} font-sans transition-colors duration-500 flex justify-center`}>
      <div className={`w-full max-w-400 flex flex-col xl:flex-row gap-0 rounded-3xl overflow-hidden border ${isLight ? 'bg-white/80 border-slate-200 shadow-2xl shadow-slate-200/50' : 'bg-[#0a0f18]/90 border-slate-800 shadow-[0_0_50px_rgba(59,130,246,0.05)]'} backdrop-blur-xl transition-all duration-500`}>
        
        {/* Sidebar Collection View */}
        <div className={`w-full xl:w-72 flex border-r ${isLight ? 'border-slate-200 bg-slate-50/50' : 'border-slate-800/80 bg-[#0b101a]/50'} flex flex-col`}>
          <div className="p-5 border-b border-transparent">
            <h2 className={`font-bold text-xs tracking-widest uppercase ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Workspace Memory</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {['/users/profile', '/auth/login', '/settings/keys', '/data/export'].map((path, i) => {
              const methods = ['GET', 'POST', 'PUT', 'DELETE'];
              const m = methods[i];
              return (
                <div key={i} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${i === 0 ? (isLight ? 'bg-blue-50 text-blue-800 border-l-4 border-l-blue-500' : 'bg-blue-500/10 text-blue-300 border border-blue-500/20 border-l-4 border-l-blue-500') : (isLight ? 'hover:bg-slate-100/80 text-slate-600 border border-transparent border-l-4 border-l-transparent' : 'hover:bg-slate-800/40 text-slate-400 border border-transparent border-l-4 rounded border-l-transparent')}`}>
                  <div className="flex items-center gap-3 font-mono text-sm overflow-hidden">
                    <span className={`font-bold text-[11px] w-9 flex ${getMethodColor(m)}`}>{m}</span>
                    <span className="truncate">{path}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-h-[700px] mt-10">
          {/* Header & URL Action Bar */}
          <div className={`p-4 md:p-6 border-b flex ${isLight ? 'border-slate-200 bg-white/50' : 'border-slate-800/80 bg-slate-900/30'}`}>
            <div className={`flex w-full flex-col md:flex-row gap-2 md:gap-0 md:rounded-2xl border shadow-sm transition-colors ${isLight ? 'bg-white border-slate-200 shadow-slate-200/50' : 'bg-[#0d131c] border-slate-700/60 focus-within:border-blue-500/50'} rounded-2xl md:p-1.5`}>
              <div className={`flex items-center px-4 py-2 md:rounded-xl font-bold text-sm border-r border-transparent ${isLight ? 'bg-slate-100 text-slate-700' : 'bg-slate-800 text-slate-300'} md:mr-1`}>
                <select 
                  className="bg-transparent outline-none cursor-pointer appearance-none pr-4 font-mono font-bold tracking-wide"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter request endpoint URL..." 
                className={`flex-1 bg-transparent px-4 py-3 md:py-2 outline-none font-mono text-sm w-full transition-colors ${isLight ? 'placeholder-slate-400 text-slate-700' : 'placeholder-slate-600 text-slate-300'}`}
              />
              <button 
                onClick={handleSend}
                className="mx-1 md:mx-0 px-8 py-3 md:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-semibold text-sm transition-all duration-300 shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transform hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2 md:mt-0"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <>
                    <span>Send Protocol</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Settings & Execution Visualizer */}
          <div className="flex-1 flex flex-col xl:flex-row overflow-hidden min-h-0">
            
            {/* Request Settings Tab */}
            <div className={`w-full xl:w-1/2 border-r flex flex-col min-h-0 ${isLight ? 'border-slate-200' : 'border-slate-800/80'}`}>
              <div className={`flex px-2 border-b ${isLight ? 'border-slate-200 bg-slate-50/30' : 'border-slate-800/80 bg-slate-950/40'}`}>
                {['Params', 'Headers', 'Body', 'Auth'].map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`px-6 py-3.5 text-sm font-semibold transition-colors border-b-2 ${activeTab === tab.toLowerCase() ? 'border-blue-500 text-blue-500' : `border-transparent ${isLight ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}`}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-transparent min-h-0">
                {activeTab === 'params' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-12 gap-3 items-center">
                      <input type="text" placeholder="Key" className={`col-span-12 md:col-span-5 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'} focus:shadow-[0_0_10px_rgba(59,130,246,0.1)]`} defaultValue="limit" />
                      <input type="text" placeholder="Value" className={`col-span-12 md:col-span-6 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'} focus:shadow-[0_0_10px_rgba(59,130,246,0.1)]`} defaultValue="100" />
                      <button className={`col-span-12 md:col-span-1 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-rose-50 hover:border-rose-200' : 'border-slate-800 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                    <div className="grid grid-cols-12 gap-3 items-center opacity-70 hover:opacity-100 transition-opacity">
                      <input type="text" placeholder="New Key..." className={`col-span-12 md:col-span-5 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'}`} />
                      <input type="text" placeholder="New Value..." className={`col-span-12 md:col-span-6 px-4 py-3 rounded-xl border-2 font-mono text-sm bg-transparent outline-none focus:border-blue-500 transition-colors ${isLight ? 'border-slate-200 placeholder-slate-400' : 'border-slate-800 placeholder-slate-600 focus:bg-slate-800/30'}`} />
                      <button className={`col-span-12 md:col-span-1 p-3 rounded-xl border-2 flex justify-center items-center transition-colors ${isLight ? 'border-slate-200 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 hover:border-emerald-200' : 'border-slate-800 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                      </button>
                    </div>
                  </div>
                )}
                {activeTab === 'body' && (
                  <div className={`w-full h-full rounded-2xl border-2 p-5 font-mono text-sm focus-within:border-blue-500 transition-all min-h-0 ${isLight ? 'border-slate-200 bg-white shadow-inner' : 'border-slate-800 bg-[#0d131c]'}`}>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className={`w-full h-full bg-transparent outline-none resize-none ${isLight ? 'text-slate-700' : 'text-slate-300'}`}
                      placeholder="{\n  &quot;key&quot;: &quot;value&quot;\n}"
                      spellCheck="false"
                      defaultValue={`{\n  "email": "developer@apiflow.com",\n  "password": "hashed_pwd_secret"\n}`}
                    ></textarea>
                  </div>
                )}
                {(activeTab === 'headers' || activeTab === 'auth') && (
                  <div className={`p-10 text-center flex flex-col items-center justify-center h-full ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <svg className={`w-12 h-12 mb-4 ${isLight ? 'text-slate-300' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    <span className="font-semibold text-base mb-1">Configuration Needed</span>
                    <span className="text-sm opacity-80 max-w-xs">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} specific configurations will be available automatically based on endpoint requirements.</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Realtime API Response Visualizer */}
            <div className={`w-full xl:w-2/3 flex flex-col relative min-h-0 ${isLight ? 'bg-slate-50/50' : 'bg-[#0a0f18]/30'}`}>
              <div className={`flex justify-between items-center px-6 py-3 border-b shrink-0 ${isLight ? 'border-slate-200 bg-slate-100/30' : 'border-slate-800/80 bg-slate-950/20'}`}>
                <h3 className="text-sm font-semibold tracking-wide flex items-center gap-1 w-1/3">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                   Transmission Response
                </h3>
                {response && (
                  <div className="flex gap-1 items-start justify-center">
                    <span className={`px-3 py-1 rounded-md ${status_color_code.bg} ${status_color_code.text} ${status_color_code.border} text-xs font-bold tracking-widest uppercase`}>{response.status} {response.status_message}</span>
                    <span className={`text-xs font-mono font-medium px-2 py-1 rounded border ${isLight ? 'text-slate-500 border-slate-200 bg-white' : 'text-slate-400 border-slate-700 bg-slate-800'}`}>{response.time}</span>
                    <span className={`text-xs font-mono font-medium px-2 py-1 rounded border ${isLight ? 'text-slate-500 border-slate-200 bg-white' : 'text-slate-400 border-slate-700 bg-slate-800'}`}>{response.size}</span>
                  </div>
                )}
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-6 relative min-h-0">
                {!response && !loading && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center opacity-60">
                    <div className="relative">
                       <div className={`absolute inset-0 rounded-full blur-xl mix-blend-multiply opacity-20 ${isLight ? 'bg-blue-400' : 'bg-blue-600'}`}></div>
                       <div className={`relative w-24 h-24 rounded-full flex items-center justify-center mb-6 border-2 border-dashed ${isLight ? 'bg-slate-100 text-slate-400 border-slate-300' : 'bg-slate-800/50 text-slate-500 border-slate-700'}`}>
                         <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                       </div>
                    </div>
                    <p className={`text-lg font-bold mb-2 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>Ready to Transmit</p>
                    <p className={`text-sm ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Configure your request and hit Send to analyze protocols.</p>
                  </div>
                )}
                {loading && (
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                      <p className={`mt-6 text-sm font-mono tracking-widest uppercase font-bold animate-pulse ${isLight ? 'text-blue-500' : 'text-blue-400'}`}>Handshaking...</p>
                   </div>
                )}
                {response && !loading && (
                  <div className={`w-full h-fit min-h-full rounded-2xl border-2 p-5 md:p-6 font-mono text-[13px] md:text-[14px] leading-relaxed shadow-inner overflow-auto ${isLight ? 'bg-white text-slate-800 border-slate-200' : 'bg-[#0d131c] text-white border-slate-800'} transition-all`}>
                    <pre className="whitespace-pre-wrap break-all md:wrap-break-word">
                      <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(response.data) }}>
                      </code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Api;