import './App.css'
import Header from './components/header'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import Ranking from './pages/Ranking'
import GameExact from './pages/GameExact'
import GameCompare from './pages/GameCompare'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/game/exact" element={<GameExact />} />
          <Route path="/game/compare" element={<GameCompare />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
