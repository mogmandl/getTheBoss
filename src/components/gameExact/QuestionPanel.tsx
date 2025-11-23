import { useTranslation } from 'react-i18next'

type Props = {
  companyName: string
  currentRound: number
  maxRounds: number
  cumulativeScore: number
}

export default function QuestionPanel({ companyName, currentRound, maxRounds, cumulativeScore }: Props) {
  const { t } = useTranslation()

  return (
    <div className="border-2 border-gray-300 p-8 mb-6">
      <h1 className="text-3xl font-bold mb-4">{companyName}</h1>
      <p className="text-gray-600 mb-4">{t('gameExact.question')}</p>

      <div className="flex justify-between items-center border-t border-gray-300 pt-4">
        <div>
          <span className="text-gray-600">{t('gameExact.round')}:</span>
          <span className="font-bold ml-2">{currentRound} / {maxRounds}</span>
        </div>
        <div>
          <span className="text-gray-600">{t('gameExact.cumulativeScore')}:</span>
          <span className="font-bold text-blue-600 ml-2">{cumulativeScore.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
