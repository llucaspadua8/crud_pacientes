import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConfirmProvider } from "material-ui-confirm";

createRoot(document.getElementById('root')!).render(
  <ConfirmProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ConfirmProvider>
)
