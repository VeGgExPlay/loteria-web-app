import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CronometerProvider } from './context/Cronometer.jsx'
import { CardsGameProvider } from './context/CardsGame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CronometerProvider>
      <CardsGameProvider>
        <App />
      </CardsGameProvider>
    </CronometerProvider>
  </StrictMode>,
)
