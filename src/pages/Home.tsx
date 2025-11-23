import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContextFirebase'
import { useTranslation } from 'react-i18next'
import Logo from '../components/Logo'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* 타이틀 */}
        <div className="text-center mb-20">
          <Logo size="lg" />
          <h1 className="text-4xl font-bold mt-6 mb-3">{t('home.title')}</h1>
          <p className="text-gray-600">{t('home.subtitle')}</p>
        </div>

        {/* 게임 선택 */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* 정확히 맞추기 */}
          <div
            className="border-2 border-gray-300 p-8 cursor-pointer hover:border-blue-600 transition"
            onClick={() => navigate('/game/exact')}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{t('home.exactGameTitle')}</h2>
              <span className="text-sm border border-gray-300 px-3 py-1">{t('home.exactGameRounds')}</span>
            </div>
            <p className="text-gray-600 mb-6 whitespace-pre-line">
              {t('home.exactGameDesc')}
            </p>
            <div className="text-blue-600 font-medium">{t('home.startGame')} →</div>
          </div>

          {/* 비교하기 */}
          <div
            className="border-2 border-gray-300 p-8 cursor-pointer hover:border-blue-600 transition"
            onClick={() => navigate('/game/compare')}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{t('home.compareGameTitle')}</h2>
              <span className="text-sm border border-gray-300 px-3 py-1">{t('home.compareGameRounds')}</span>
            </div>
            <p className="text-gray-600 mb-6 whitespace-pre-line">
              {t('home.compareGameDesc')}
            </p>
            <div className="text-blue-600 font-medium">{t('home.startGame')} →</div>
          </div>
        </div>

        {/* 랭킹 섹션 */}
        <div className="border-2 border-gray-300 p-12 text-center">
          <h3 className="text-2xl font-bold mb-3">{t('home.rankingTitle')}</h3>
          {user ? (
            <>
              <p className="text-gray-600 mb-6">{t('home.rankingDesc')}</p>
              <button
                onClick={() => navigate('/ranking')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-2 hover:bg-blue-50"
              >
                {t('home.viewRanking')}
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">{t('home.loginRequired')}</p>
              <button
                onClick={() => navigate('/signin')}
                className="border-2 border-blue-600 text-blue-600 px-8 py-2 hover:bg-blue-50"
              >
                {t('home.loginSignup')}
              </button>
            </>
          )}
        </div>

        {/* 통계 */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          <div className="border border-gray-300 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">70+</div>
            <div className="text-sm text-gray-600">{t('home.stats.companies')}</div>
          </div>
          <div className="border border-gray-300 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{t('home.stats.realtime')}</div>
            <div className="text-sm text-gray-600">{t('home.stats.api')}</div>
          </div>
          <div className="border border-gray-300 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">{t('home.stats.firebase')}</div>
            <div className="text-sm text-gray-600">{t('home.stats.cloudStorage')}</div>
          </div>
        </div>
      </main>
    </div>
  )
}
