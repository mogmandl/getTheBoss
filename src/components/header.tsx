import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import NavCenter from './NavCenter'
import MobileDropdown from './MobileDropdown'
import ProfileMenuButton from './ProfileMenuButton'

export default function Header() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const headerRef = useRef<HTMLDivElement | null>(null)

  const [mobileOpen, setMobileOpen] = useState(false)

  const onProfileClick = () => {
    if (user) {
      navigate('/profile')
      setMobileOpen(false)
      return
    }
    navigate('/signin')
    setMobileOpen(false)
  }

  const onHomeClick = () => {
    navigate('/')
    setMobileOpen(false)
  }

  const onRankingClick = () => {
    navigate('/ranking')
    setMobileOpen(false)
  }

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!mobileOpen) return
      const target = e.target as Node
      if (headerRef.current && !headerRef.current.contains(target)) {
        setMobileOpen(false)
      }
    }

    function onResize() {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }

    document.addEventListener('click', onDocClick)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('click', onDocClick)
      window.removeEventListener('resize', onResize)
    }
  }, [mobileOpen])

  return (
    <div ref={headerRef} className="relative flex items-center justify-between text-2xl bg-gray-200 p-5">
      <div className="flex-none">로고입니다.</div>

      <NavCenter onHomeClick={onHomeClick} onRankingClick={onRankingClick} />

      <MobileDropdown mobileOpen={mobileOpen} onHomeClick={onHomeClick} onRankingClick={onRankingClick} />

      <ProfileMenuButton user={user} onProfileClick={onProfileClick} onToggleMenu={() => setMobileOpen(prev => !prev)} />
    </div>
  )
}