import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextFirebase'
import { useTranslation } from 'react-i18next'
import Logo from './Logo'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { t } = useTranslation()

  const handleLogout = async () => {
    await logout()
    navigate('/signin')
  }

  return (
    <header className="border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* 로고 */}
          <div className="cursor-pointer" onClick={() => navigate('/')}>
            <Logo size="sm" />
          </div>

          {/* 네비게이션 */}
          <nav className="flex items-center gap-6">
            {user ? (
              <>
                <button onClick={() => navigate('/game/exact')} className="hover:text-blue-600">
                  {t('header.exactGame')}
                </button>
                <button onClick={() => navigate('/game/compare')} className="hover:text-blue-600">
                  {t('header.compareGame')}
                </button>
                <button onClick={() => navigate('/ranking')} className="hover:text-blue-600">
                  {t('common.ranking')}
                </button>
                <button onClick={() => navigate('/profile')} className="hover:text-blue-600">
                  {t('common.profile')}
                </button>
                <LanguageSwitcher />
                <button onClick={handleLogout} className="border border-gray-300 px-4 py-1 hover:bg-gray-100">
                  {t('common.logout')}
                </button>
              </>
            ) : (
              <>
                <LanguageSwitcher />
                <button onClick={() => navigate('/signin')} className="border border-blue-600 text-blue-600 px-4 py-1 hover:bg-blue-50">
                  {t('common.login')}
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
