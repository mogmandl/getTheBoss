import { useEffect, useState } from 'react'
import { useCompanies } from '../data/companies'
import { useAuth } from '../contexts/AuthContextFirebase'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function GameCompare() {
  const { companies } = useCompanies() // API에서 가져온 실시간 데이터 사용
  const [leftIndex, setLeftIndex] = useState<number | null>(null)
  const [rightIndex, setRightIndex] = useState<number | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [lastWasCorrect, setLastWasCorrect] = useState<boolean | null>(null)
  const { user, recordBestScore } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (companies.length > 0) {
      pickTwo()
    }
  }, [companies])

  function pickTwo() {
    let a = Math.floor(Math.random() * companies.length)
    let b = Math.floor(Math.random() * companies.length)
    while (b === a) b = Math.floor(Math.random() * companies.length)
    setLeftIndex(a)
    setRightIndex(b)
    setResult(null)
    setAnswered(false)
  }

  if (leftIndex === null || rightIndex === null || companies.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Centered Navigation */}
        <nav className="border-b border-gray-300">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-8">
              <button onClick={() => navigate('/')} className="hover:text-blue-600">{t('common.home')}</button>
              <button onClick={() => navigate('/game/exact')} className="hover:text-blue-600">{t('header.exactGame')}</button>
              <button className="font-bold text-blue-600">{t('header.compareGame')}</button>
              <button onClick={() => navigate('/ranking')} className="hover:text-blue-600">{t('common.ranking')}</button>
              <button onClick={() => navigate('/profile')} className="hover:text-blue-600">{t('common.profile')}</button>
              <LanguageSwitcher />
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-20">
          <div className="border-2 border-gray-300 p-12 text-center">
            <div className="text-xl">{t('gameCompare.loadingCompanies')}</div>
          </div>
        </main>
      </div>
    )
  }

  const left = companies[leftIndex]
  const right = companies[rightIndex]

  // New behavior: show left company's employee count, and on the right
  // the player chooses whether the right company's size is 더 많다 (more) or 더 적다 (less).
  function chooseMore() {
    if (left.employees === right.employees) setResult(t('gameCompare.tie'))
    else if (right.employees > left.employees) {
      const newScore = sessionScore + 1
      setSessionScore(newScore)
      setResult(`${t('gameCompare.correct')} ${t('gameCompare.left')} ${left.employees.toLocaleString()}${t('gameCompare.people')}, ${t('gameCompare.right')} ${right.employees.toLocaleString()}${t('gameCompare.people')} (${t('gameCompare.score')}: ${newScore})`)
      // persist best session score
      if (user) recordBestScore(newScore).catch(() => {})
      setLastWasCorrect(true)
    } else {
      setResult(`${t('gameCompare.incorrect')} ${t('gameCompare.left')} ${left.employees.toLocaleString()}${t('gameCompare.people')}, ${t('gameCompare.right')} ${right.employees.toLocaleString()}${t('gameCompare.people')}`)
      setLastWasCorrect(false)
    }
    setAnswered(true)
  }

  function chooseLess() {
    if (left.employees === right.employees) setResult(t('gameCompare.tie'))
    else if (right.employees < left.employees) {
      const newScore = sessionScore + 1
      setSessionScore(newScore)
      setResult(`${t('gameCompare.correct')} ${t('gameCompare.left')} ${left.employees.toLocaleString()}${t('gameCompare.people')}, ${t('gameCompare.right')} ${right.employees.toLocaleString()}${t('gameCompare.people')} (${t('gameCompare.score')}: ${newScore})`)
      if (user) recordBestScore(newScore).catch(() => {})
      setLastWasCorrect(true)
    } else {
      setResult(`${t('gameCompare.incorrect')} ${t('gameCompare.left')} ${left.employees.toLocaleString()}${t('gameCompare.people')}, ${t('gameCompare.right')} ${right.employees.toLocaleString()}${t('gameCompare.people')}`)
      setLastWasCorrect(false)
    }
    setAnswered(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Centered Navigation */}
      <nav className="border-b border-gray-300">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-8">
            <button onClick={() => navigate('/')} className="hover:text-blue-600">{t('common.home')}</button>
            <button onClick={() => navigate('/game/exact')} className="hover:text-blue-600">{t('header.exactGame')}</button>
            <button className="font-bold text-blue-600">{t('header.compareGame')}</button>
            <button onClick={() => navigate('/ranking')} className="hover:text-blue-600">{t('common.ranking')}</button>
            <button onClick={() => navigate('/profile')} className="hover:text-blue-600">{t('common.profile')}</button>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Score Display */}
        <div className="border-2 border-gray-300 p-6 mb-6 text-center">
          <div className="text-sm text-gray-600 mb-1">{t('gameCompare.currentScore')}</div>
          <div className="text-4xl font-bold text-blue-600">{sessionScore}</div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Left Company */}
          <div className="border-2 border-gray-300 p-8">
            <div className="text-sm text-gray-600 mb-2">{t('gameCompare.leftCompany')}</div>
            <h2 className="text-2xl font-bold mb-4">{left.name}</h2>
            <div className="border-t border-gray-300 pt-4">
              <div className="text-sm text-gray-600 mb-1">{t('gameCompare.employees')}</div>
              <div className="text-3xl font-bold text-blue-600">{left.employees.toLocaleString()}{t('gameCompare.people')}</div>
            </div>
          </div>

          {/* Right Company */}
          <div className="border-2 border-gray-300 p-8">
            <div className="text-sm text-gray-600 mb-2">{t('gameCompare.rightCompany')}</div>
            <h2 className="text-2xl font-bold mb-4">{right.name}</h2>
            <div className="border-t border-gray-300 pt-4">
              <div className="text-sm text-gray-600 mb-4">{t('gameCompare.compareQuestion')}</div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={chooseMore}
                  disabled={answered}
                  className="border-2 border-blue-600 text-blue-600 px-4 py-3 hover:bg-blue-50 disabled:opacity-50"
                >
                  {t('gameCompare.more')}
                </button>
                <button
                  onClick={chooseLess}
                  disabled={answered}
                  className="border-2 border-blue-600 text-blue-600 px-4 py-3 hover:bg-blue-50 disabled:opacity-50"
                >
                  {t('gameCompare.less')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Result Display */}
        {result && (
          <div className={`border-2 p-6 mb-6 text-center ${lastWasCorrect ? 'border-blue-600' : 'border-gray-300'}`}>
            <div className={`text-lg font-bold mb-2 ${lastWasCorrect ? 'text-blue-600' : 'text-gray-900'}`}>
              {lastWasCorrect ? t('gameCompare.correct') : t('gameCompare.incorrect')}
            </div>
            <div className="text-gray-600">{result}</div>
          </div>
        )}

        {/* Action Buttons */}
        {answered && lastWasCorrect === false && (
          <div className="border-2 border-gray-300 p-8 text-center">
            <p className="mb-6 text-gray-600">{t('gameCompare.gameEnded')}</p>
            <button
              onClick={() => {
                setSessionScore(0)
                setAnswered(false)
                setLastWasCorrect(null)
                pickTwo()
              }}
              className="border-2 border-blue-600 text-blue-600 px-8 py-2 hover:bg-blue-50"
            >
              {t('gameCompare.playAgain')}
            </button>
          </div>
        )}

        {answered && lastWasCorrect === true && (
          <button
            onClick={() => { setAnswered(false); setLastWasCorrect(null); pickTwo(); }}
            className="w-full border-2 border-blue-600 bg-blue-600 text-white px-6 py-3 hover:bg-blue-700"
          >
            {t('gameCompare.nextQuestion')}
          </button>
        )}

        {!answered && (
          <button
            onClick={pickTwo}
            className="w-full border border-gray-300 px-6 py-2 hover:bg-gray-100"
          >
            {t('gameCompare.skipQuestion')}
          </button>
        )}
      </main>
    </div>
  )
}
