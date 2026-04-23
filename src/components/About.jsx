import { useState } from 'react';
import Navbar from './NavBar';
import { supabase } from '../supabase';
import {
  Briefcase, Code2, Github, Linkedin, Mail, Globe,
  Star, Send, CheckCircle, Loader2, Sparkles, Zap,
  Target, Shield, Bell, User, MessageSquare, Heart,
} from 'lucide-react';

const GLASS = {
  background: 'rgba(15,23,42,0.6)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
};

const FEATURES = [
  { icon: Briefcase, color: '#818cf8', title: 'Job Finder',          desc: 'Search thousands of jobs via JSearch API with real-time results and smart filtering.' },
  { icon: Sparkles,  color: '#f59e0b', title: 'AI Cover Letters',    desc: 'Groq-powered AI generates personalized cover letters tailored to each job description.' },
  { icon: Zap,       color: '#4ade80', title: 'Auto Apply',          desc: 'Bulk-apply to all search results in one click — cover letter copied, job site opened.' },
  { icon: Target,    color: '#22d3ee', title: 'Application Tracker', desc: 'Track every application through Saved → Applied → Interview → Offer stages.' },
  { icon: User,      color: '#a78bfa', title: 'Profile & Resume',    desc: 'Upload your PDF resume; text is auto-extracted and used to personalise AI outputs.' },
  { icon: Bell,      color: '#f87171', title: 'Push Notifications',  desc: 'Web-push alerts keep you updated on application status changes in real time.' },
  { icon: Shield,    color: '#34d399', title: 'Supabase Backend',    desc: 'All data is securely stored in Supabase with Row Level Security policies.' },
  { icon: Globe,     color: '#60a5fa', title: 'PWA Ready',           desc: 'Installable as a Progressive Web App — works offline and feels native on any device.' },
];

const RATINGS = [1, 2, 3, 4, 5];

export default function About() {
  const [rating, setRating]         = useState(0);
  const [hovered, setHovered]       = useState(0);
  const [name, setName]             = useState('');
  const [message, setMessage]       = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [error, setError]           = useState('');

  const submitFeedback = async () => {
    if (!message.trim()) { setError('Please write a message.'); return; }
    if (!rating)         { setError('Please select a rating.'); return; }
    setError('');
    setSubmitting(true);
    const { error: dbErr } = await supabase.from('feedbacks').insert({
      name:    name.trim() || 'Anonymous',
      message: message.trim(),
      rating,
    });
    setSubmitting(false);
    if (dbErr) { setError(dbErr.message); return; }
    setSubmitted(true);
    setName(''); setMessage(''); setRating(0);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200">
      <Navbar />

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-cyan-900/20 blur-[120px]" />
        <div className="absolute top-[40%] right-[10%] w-[25%] h-[25%] rounded-full bg-violet-900/15 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Hero */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-2xl mb-5 border border-indigo-500/30"
            style={{ ...GLASS, boxShadow: '0 0 32px rgba(99,102,241,0.25)' }}>
            <Code2 size={36} className="text-indigo-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-cyan-400 mb-3">
            ABOUT THIS APP
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A modern self-development platform built to supercharge your job search with AI, automation, and real-time tracking — all in one place.
          </p>
        </div>

        {/* App Overview */}
        <div className="rounded-3xl p-6 sm:p-8" style={GLASS}>
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Sparkles size={13} /> What is this app?
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            <span className="text-white font-semibold">Self-Development App</span> is an all-in-one career toolkit designed for job seekers who want to move fast. It combines live job search, AI-generated cover letters, one-click bulk applications, and a full application tracker — backed by a serverless Supabase backend and Groq's blazing-fast LLM API.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            Built as a Progressive Web App, it works seamlessly on desktop and mobile, supports offline usage, and delivers real-time push notifications so you never miss an update on your applications.
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Zap size={13} /> Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FEATURES.map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="rounded-2xl p-4 flex gap-4 items-start" style={GLASS}>
                <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: color + '18', border: `1px solid ${color}30` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-200 mb-0.5">{title}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Founder / Developer ── */}
        <div className="rounded-3xl overflow-hidden" style={{ position: 'relative', background: 'rgba(10,10,30,0.7)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,139,250,0.1)' }}>

          {/* Top gradient bar */}
          <div style={{ height: 2, background: 'linear-gradient(90deg, #a78bfa 0%, #22d3ee 50%, #4ade80 100%)' }} />

          {/* Subtle grid bg */}
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(167,139,250,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

          <div className="relative px-6 sm:px-10 pt-6 pb-2">
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.45)', fontFamily: 'monospace' }}>
              ◈ Meet the Founder
            </span>
          </div>

          <div className="relative flex flex-col sm:flex-row gap-8 sm:gap-10 px-6 sm:px-10 py-8 items-center sm:items-start">

            {/* Left — avatar + socials */}
            <div className="shrink-0 flex flex-col items-center gap-4">

              {/* Avatar ring */}
              <div style={{ position: 'relative', padding: 3, borderRadius: 28, background: 'linear-gradient(135deg, #a78bfa, #22d3ee, #4ade80)', boxShadow: '0 0 40px rgba(167,139,250,0.3)' }}>
                <div style={{ width: 108, height: 108, borderRadius: 24, background: 'linear-gradient(145deg, #1a1040 0%, #0a0f1e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 30, background: 'linear-gradient(135deg, #a78bfa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    SK
                  </span>
                </div>
                {/* Online indicator */}
                <div style={{ position: 'absolute', bottom: 6, right: 6, width: 14, height: 14, borderRadius: '50%', background: '#4ade80', border: '2.5px solid #0a0f1e', boxShadow: '0 0 10px #4ade80' }} />
              </div>

              {/* Available badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 20, background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#4ade80', letterSpacing: '0.1em', fontFamily: 'monospace' }}>AVAILABLE</span>
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-2 w-full">
                {[
                  { icon: Github,   label: 'GitHub',   href: 'https://github.com/shahidkm',      color: '#e2e8f0' },
                  { icon: Linkedin, label: 'LinkedIn',  href: 'https://linkedin.com/in/shahidkm', color: '#60a5fa' },
                  { icon: Mail,     label: 'Email',     href: 'mailto:shahid@example.com',        color: '#4ade80' },
                ].map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                    style={{ background: color + '0d', border: `1px solid ${color}20`, color, minWidth: 130, textDecoration: 'none' }}
                    onMouseEnter={e => { e.currentTarget.style.background = color + '1a'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = color + '0d'; e.currentTarget.style.transform = 'translateX(0)'; }}>
                    <Icon size={13} />{label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — bio */}
            <div className="flex-1 text-center sm:text-left">

              {/* Name */}
              <h3 style={{ fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: 'clamp(24px, 4vw, 34px)', letterSpacing: '-0.01em', lineHeight: 1.1, marginBottom: 10, background: 'linear-gradient(135deg, #ffffff 40%, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Shahid KM
              </h3>

              {/* Role badges */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-5">
                {[
                  { label: 'Full-Stack Developer', color: '#a78bfa' },
                  { label: 'AI Enthusiast',        color: '#22d3ee' },
                  { label: 'Product Builder',      color: '#f59e0b' },
                ].map(({ label, color }) => (
                  <span key={label} style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: color + '12', border: `1px solid ${color}28`, color }}>
                    {label}
                  </span>
                ))}
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 20 }} />

              {/* Bio */}
              <p className="text-slate-300 text-sm leading-[1.85] mb-2">
                I build products at the intersection of <span className="text-violet-300 font-semibold">great design</span> and <span className="text-cyan-300 font-semibold">intelligent automation</span>. My focus is on shipping fast, iterating faster, and making every interaction feel effortless.
              </p>
              <p className="text-slate-500 text-sm leading-[1.85] mb-7">
                This app was born from a real frustration — job hunting is broken. So I built the tool I wished existed: AI-powered, fully automated, and beautifully simple.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { value: '3+',   label: 'Years Building', color: '#a78bfa' },
                  { value: '10+',  label: 'Apps Shipped',   color: '#22d3ee' },
                  { value: '100%', label: 'Open Source',    color: '#4ade80' },
                ].map(({ value, label, color }) => (
                  <div key={label} className="rounded-2xl p-3 text-center"
                    style={{ background: color + '08', border: `1px solid ${color}18` }}>
                    <div className="text-xl font-black mb-0.5" style={{ color, fontFamily: 'Orbitron, monospace' }}>{value}</div>
                    <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest leading-tight">{label}</div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {[
                  { label: 'React',      color: '#61dafb' },
                  { label: 'TypeScript', color: '#3b82f6' },
                  { label: 'Node.js',    color: '#4ade80' },
                  { label: 'Supabase',   color: '#3ecf8e' },
                  { label: 'AI / LLM',   color: '#f59e0b' },
                  { label: 'UI / UX',    color: '#f472b6' },
                ].map(({ label, color }) => (
                  <span key={label} className="px-3 py-1.5 rounded-xl text-[11px] font-bold font-mono"
                    style={{ background: color + '12', border: `1px solid ${color}25`, color }}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quote footer */}
          <div className="relative flex items-center gap-4 px-6 sm:px-10 py-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.25)' }}>
            <div style={{ width: 3, height: 36, borderRadius: 4, background: 'linear-gradient(180deg, #a78bfa, #22d3ee)', flexShrink: 0 }} />
            <p className="text-xs text-slate-500 italic leading-relaxed">
              "The best tools are the ones you forget you're using — they just work."
            </p>
          </div>
        </div>

        {/* Feedback */}
        <div className="rounded-3xl p-6 sm:p-8" style={{ ...GLASS, border: '1px solid rgba(34,211,238,0.12)' }}>
          <h2 className="text-xs font-bold text-cyan-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <MessageSquare size={13} /> Leave Feedback
          </h2>

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-8">
              <CheckCircle size={40} className="text-emerald-400" />
              <p className="text-emerald-400 font-bold text-lg">Thank you for your feedback!</p>
              <p className="text-slate-500 text-sm">Your response has been saved.</p>
              <button onClick={() => setSubmitted(false)}
                className="mt-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                style={{ background: 'rgba(34,211,238,0.1)', border: '1px solid rgba(34,211,238,0.3)', color: '#22d3ee' }}>
                Submit Another
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-1.5 block">Your Name (optional)</label>
                <input value={name} onChange={e => setName(e.target.value)}
                  placeholder="Anonymous"
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none"
                  style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>

              <div>
                <label className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-2 block">Rating</label>
                <div className="flex gap-2">
                  {RATINGS.map(n => (
                    <button key={n} onClick={() => setRating(n)}
                      onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)}
                      className="transition-transform hover:scale-110 active:scale-95">
                      <Star size={28} style={{ fill: n <= (hovered || rating) ? '#f59e0b' : 'transparent', color: n <= (hovered || rating) ? '#f59e0b' : '#334155', transition: 'all 0.15s' }} />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-xs text-amber-400 font-mono self-center">
                      {['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][rating]}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 font-mono uppercase tracking-widest mb-1.5 block">Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)}
                  placeholder="Share your thoughts, suggestions, or bug reports..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none resize-none"
                  style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>

              {error && <p className="text-red-400 text-xs font-mono">{error}</p>}

              <button onClick={submitFeedback} disabled={submitting}
                className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: 'rgba(34,211,238,0.15)', border: '1px solid rgba(34,211,238,0.4)', color: '#22d3ee' }}>
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {submitting ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center pb-6">
          <p className="text-slate-600 text-xs font-mono flex items-center justify-center gap-1.5">
            Built with <Heart size={11} className="text-red-500" fill="#ef4444" /> by Shahid KM · {new Date().getFullYear()}
          </p>
        </div>

      </div>
    </div>
  );
}
