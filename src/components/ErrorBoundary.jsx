import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-slate-800 border border-red-500/50 rounded-2xl p-6 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-500 text-red-400 flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 mb-1">Command Center Recovery Mode</h2>
            <p className="text-xs text-slate-400 mb-4">
              A UI rendering exception was intercepted. Telemetry and live ingestion services remain safe.
            </p>
            <div className="p-3 bg-slate-950 rounded-lg text-left font-mono text-[11px] text-red-300 mb-4 overflow-x-auto max-h-32">
              {this.state.error?.message || "Unknown rendering exception"}
            </div>
            <button
              onClick={this.handleReload}
              className="w-full py-2.5 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Command Center</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
