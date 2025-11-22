import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

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

      {/* 중앙 항목: md 이상 항상 보이고. 작은 화면은 햄버거로 열면 아래 드롭다운이 나타남 */}
      <div className="flex-1 flex justify-center">
        <div className="hidden md:flex gap-8">
          <button onClick={onHomeClick} className="px-2" aria-label="home">홈입니다.</button>
          <button onClick={onRankingClick} className="px-2" aria-label="ranking">랭킹입니다.</button>
        </div>
      </div>

      {/* 모바일 드롭다운 (오른쪽에 붙음) */}
      <div aria-hidden={!mobileOpen}>
        <div
          className={`md:hidden absolute top-full right-4 z-20 min-w-[140px] mt-2 bg-gray-200 rounded-md transform origin-top-right transition-all duration-150 ${
            mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col">
            <button onClick={onHomeClick} className="w-full text-center py-2">홈입니다.</button>
            <button onClick={onRankingClick} className="w-full text-center py-2">랭킹입니다.</button>
          </div>
        </div>
      </div>

      {/* 오른쪽: 프로필 + (모바일에 보이는) 햄버거 */}
      <div className="flex-none flex items-center gap-2">
        <button onClick={onProfileClick} aria-label="profile">
          {user ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 17l5-5-5-5v10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* 햄버거 (작은 화면에만) - 프로필 오른쪽에 위치 */}
        <button
          className="md:hidden px-2"
          aria-label="menu"
          onClick={() => setMobileOpen(prev => !prev)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}