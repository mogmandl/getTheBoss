import Header from './components/header'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContextFirebase'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Ranking from './pages/Ranking'
import GameExact from './pages/GameExact'
import GameCompare from './pages/GameCompare'

function AppContent() {
  const location = useLocation()
  const isGamePage = location.pathname.startsWith('/game/')

  return (
    <>
      {!isGamePage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/game/exact" element={<GameExact />} />
        <Route path="/game/compare" element={<GameCompare />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
