import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import Gen from './Gen.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
    <Gen/>
  </StrictMode>,
)
