import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextFirebase'
import { useTranslation } from 'react-i18next'

export default function Profile() {
  const { user, logout, deleteUserAccount } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true)
      return
    }

    try {
      setIsDeleting(true)
      await deleteUserAccount()
      alert(t('profile.deleteSuccess'))
      navigate('/')
    } catch (error) {
      alert(t('profile.deleteError'))
      setIsDeleting(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="max-w-md w-full border-2 border-gray-300 p-12 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('profile.title')}</h1>
          <p className="text-gray-600 mb-6">{t('profile.loginRequired')}</p>
          <button
            onClick={() => navigate('/signin')}
            className="border-2 border-blue-600 text-blue-600 px-6 py-2 hover:bg-blue-50"
          >
            {t('common.login')}
          </button>
        </div>
      </div>
    )
  }

  const finalScore = (user.bestScore || 0) * (user.bestCompare || 0)

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-12">{t('profile.title')}</h1>

        {/* 사용자 정보 */}
        <div className="border-2 border-gray-300 p-8 mb-8">
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-1">{t('common.email')}</div>
            <div className="text-2xl font-bold">{user.email}</div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleLogout}
              className="border border-gray-300 px-6 py-2 hover:bg-gray-100"
            >
              {t('common.logout')}
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="border border-red-600 text-red-600 px-6 py-2 hover:bg-red-50 disabled:opacity-50"
            >
              {isDeleting ? t('common.loading') : t('profile.deleteAccount')}
            </button>
          </div>
        </div>

        {/* 회원탈퇴 확인 */}
        {showDeleteConfirm && (
          <div className="border-2 border-red-600 bg-red-50 p-8 mb-8">
            <p className="text-red-600 font-bold mb-4 whitespace-pre-line">{t('profile.deleteConfirm')}</p>
            <div className="flex gap-4">
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="border-2 border-red-600 bg-red-600 text-white px-6 py-2 hover:bg-red-700 disabled:opacity-50"
              >
                {t('common.confirm')}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="border-2 border-gray-300 px-6 py-2 hover:bg-gray-100"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        )}

        {/* 점수 통계 */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border border-gray-300 p-8">
            <div className="text-sm text-gray-600 mb-2">{t('profile.exactScore')}</div>
            <div className="text-4xl font-bold text-blue-600">{user.bestScore || 0}</div>
          </div>

          <div className="border border-gray-300 p-8">
            <div className="text-sm text-gray-600 mb-2">{t('profile.compareScore')}</div>
            <div className="text-4xl font-bold text-blue-600">{user.bestCompare || 0}</div>
          </div>

          <div className="border border-gray-300 p-8">
            <div className="text-sm text-gray-600 mb-2">{t('profile.totalPlays')}</div>
            <div className="text-4xl font-bold text-blue-600">{user.totalPlays || 0}</div>
          </div>

          <div className="border border-gray-300 p-8">
            <div className="text-sm text-gray-600 mb-2">{t('profile.finalScore')}</div>
            <div className="text-4xl font-bold text-blue-600">{finalScore.toLocaleString()}</div>
          </div>
        </div>

        {/* 랭킹 보기 버튼 */}
        <div className="border-2 border-gray-300 p-8 text-center">
          <button
            onClick={() => navigate('/ranking')}
            className="border-2 border-blue-600 text-blue-600 px-8 py-2 hover:bg-blue-50"
          >
            {t('home.viewRanking')}
          </button>
        </div>
      </main>
    </div>
  )
}
