import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Brands from './pages/Brands'
import BlindBoxes from './pages/BlindBoxes'
import SplashScreen from './pages/SplashScreen'
import Header from './components/Header'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Always show splash screen for now (comment out this line after testing)
    // const hasSeenSplash = localStorage.getItem('hasSeenSplash')
    // if (hasSeenSplash) {
    //   setShowSplash(false)
    // }

    // Dev shortcut: Press 'R' + 'S' to reset splash
    const handleKeyPress = (e) => {
      if (e.key === 'r' || e.key === 'R') {
        const handleSecondKey = (e2) => {
          if (e2.key === 's' || e2.key === 'S') {
            localStorage.removeItem('hasSeenSplash')
            setShowSplash(true)
            document.removeEventListener('keydown', handleSecondKey)
          }
        }
        document.addEventListener('keydown', handleSecondKey)
        setTimeout(() => document.removeEventListener('keydown', handleSecondKey), 2000)
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (showSplash) {
    return <SplashScreen onComplete={() => {
      localStorage.setItem('hasSeenSplash', 'true')
      setShowSplash(false)
    }} />
  }

  return (
    <BrowserRouter>
      <Header />
      <main className="app-container">
        {/* Animated BlindBox Decoration */}
        <div className="blindbox-decoration">
          <div className="floating-boxes">
            <div className="floating-box"></div>
            <div className="floating-box"></div>
            <div className="floating-box"></div>
            <div className="floating-box"></div>
          </div>
        </div>
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/brands/*"
            element={<ProtectedRoute><Brands /></ProtectedRoute>}
          />
          <Route path="/blindboxes" element={<BlindBoxes />} />
          <Route path="/" element={<Navigate to="/blindboxes" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
