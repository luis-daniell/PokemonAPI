import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PokemonDetail from './pages/PokemonDetail'
import React from 'react'
import './index.css'
import App from './App.jsx'
/* createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
 */

createRoot( document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<App/>}/>

        <Route path="/pokemon/:id" element= {<PokemonDetail />}/>
        

      </Routes>
    </BrowserRouter>

  </React.StrictMode>

)