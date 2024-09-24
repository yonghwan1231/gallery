import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AppProvider } from './AppProvider.tsx'
import './App.css'

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>,
)
