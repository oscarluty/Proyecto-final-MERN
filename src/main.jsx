import React from 'react'
import ReactDOM from 'react-dom/client'
import { EcommerceApp } from './EcommerceApp'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <EcommerceApp></EcommerceApp>
      </React.StrictMode>,
    </BrowserRouter>
  </AuthProvider>
)
