import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

// Diagnostic alerts
const diag = [];
diag.push('UA: ' + navigator.userAgent.slice(0, 80));
diag.push('Online: ' + navigator.onLine);
diag.push('SW support: ' + ('serviceWorker' in navigator));
diag.push('Root el: ' + !!document.getElementById('root'));

try {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(r => console.log('SW registered:', r.scope))
      .catch(e => alert('SW Error: ' + e.message));
  }
} catch(e) {
  diag.push('SW exception: ' + e.message);
}

window.addEventListener('error', e => {
  alert('JS Error: ' + e.message + '\nFile: ' + e.filename + '\nLine: ' + e.lineno);
});

window.addEventListener('unhandledrejection', e => {
  alert('Promise Error: ' + (e.reason?.message || e.reason));
});

console.log('DIAG:', diag.join(' | '));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
