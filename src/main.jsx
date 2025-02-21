import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Correo from './components/Correo.jsx'
import NavBar from './components/NavBar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar/>
    <Correo />
  </StrictMode>,
)
