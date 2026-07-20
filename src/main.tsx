import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import App from './App';

// 저장된 테마를 첫 렌더 전에 즉시 적용 (FOUC 방지)
const savedTheme = localStorage.getItem('byebye:theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = savedTheme ?? (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', theme);

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
