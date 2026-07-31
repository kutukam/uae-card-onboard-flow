import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initCoBrowse } from './cobrowse'

createRoot(document.getElementById("root")!).render(<App />);

// Fire-and-forget: never blocks or breaks the app if the service is unreachable.
void initCoBrowse();
