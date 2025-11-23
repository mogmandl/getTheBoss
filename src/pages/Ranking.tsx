import { useEffect, useState } from 'react'
import { getAllUsersRanking, type RankingUser } from '../lib/firebaseRanking'
import { useTranslation } from 'react-i18next'

export default function Ranking() {
  const [rows, setRows] = useState<RankingUser[]>([])
  const [loading, setLoading] = useState(true)
  const { t } = useTranslation()

  useEffect(() => {
    const loadRanking = async () => {
      try {
        setLoading(true)
        const ranking = await getAllUsersRanking()
        setRows(ranking)
      } catch (err) {
        console.error('Failed to load ranking', err)
        setRows([])
      } finally {
        setLoading(false)
      }
    }

    loadRanking()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold mb-3">{t('ranking.title')}</h1>
        <p className="text-gray-600 mb-12">
          {t('ranking.formula')}
        </p>

        {loading && (
          <div className="border-2 border-gray-300 p-12 text-center text-gray-600">
            {t('common.loading')}
          </div>
        )}

        {!loading && rows.length === 0 && (
          <div className="border-2 border-gray-300 p-12 text-center text-gray-600">
            {t('ranking.noPlayers')}
          </div>
        )}

        {!loading && rows.length > 0 && (
          <div className="border-2 border-gray-300">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-4 font-bold">{t('ranking.rank')}</th>
                  <th className="text-left p-4 font-bold">{t('common.email')}</th>
                  <th className="text-right p-4 font-bold">{t('ranking.exactScoreColumn')}</th>
                  <th className="text-right p-4 font-bold">{t('ranking.compareScoreColumn')}</th>
                  <th className="text-right p-4 font-bold">{t('ranking.finalScoreColumn')}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id} className={index < rows.length - 1 ? 'border-b border-gray-300' : ''}>
                    <td className="p-4 font-bold text-blue-600">{row.rank}</td>
                    <td className="p-4">{row.email}</td>
                    <td className="p-4 text-right">{row.bestScore.toLocaleString()}</td>
                    <td className="p-4 text-right">{row.bestCompare.toLocaleString()}</td>
                    <td className="p-4 text-right font-bold">{row.finalScore.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
