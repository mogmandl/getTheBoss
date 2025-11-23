import { useEffect, useState, useRef } from 'react'
import { useCompanies } from '../data/companies'
import { useAuth } from '../contexts/AuthContextFirebase'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import QuestionPanel from '../components/gameExact/QuestionPanel.tsx'
import GuessForm from '../components/gameExact/GuessForm.tsx'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function GameExact() {
  const { companies, isLoading } = useCompanies() // API에서 가져온 실시간 데이터 사용
  const [companyIndex, setCompanyIndex] = useState<number | null>(null)
  const [guess, setGuess] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [gainedScore, setGainedScore] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { user, recordResult } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const MAX_ROUNDS = 10
  const [currentRound, setCurrentRound] = useState(0)
  const [cumulativeScore, setCumulativeScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (companies.length > 0) {
      pickRandom()
    }
  }, [companies])

  function pickRandom() {
    const idx = Math.floor(Math.random() * companies.length)
    setCompanyIndex(idx)
    setGuess('')
    setResult(null)
    setGainedScore(null)
    // focus the input after state updates so user can type immediately
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  // spacebar should go to next question only after answering
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault()
        // Only allow spacebar to advance if user has answered (result is shown) and game is not finished
        if (!finished && result !== null) {
          pickRandom()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [finished, result])

  if (isLoading || companies.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Centered Navigation */}
        <nav className="border-b border-gray-300">
          <div className="max-w-4xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-8">
              <button onClick={() => navigate('/')} className="hover:text-blue-600">{t('common.home')}</button>
              <button className="font-bold text-blue-600">{t('header.exactGame')}</button>
              <button onClick={() => navigate('/game/compare')} className="hover:text-blue-600">{t('header.compareGame')}</button>
              <button onClick={() => navigate('/ranking')} className="hover:text-blue-600">{t('common.ranking')}</button>
              <button onClick={() => navigate('/profile')} className="hover:text-blue-600">{t('common.profile')}</button>
              <LanguageSwitcher />
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-6 py-20">
          <div className="border-2 border-gray-300 p-12 text-center">
            <div className="text-xl mb-2">{t('gameExact.loadingCompanies')}</div>
            {isLoading && <div className="text-gray-600">{t('common.pleaseWait')}</div>}
          </div>
        </main>
      </div>
    )
  }

  if (companyIndex === null) {
    return null
  }
  const company = companies[companyIndex]

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = Number(guess)
    if (Number.isNaN(num)) {
      setResult(t('gameExact.enterNumber'))
      return
    }
    if (finished) return
    const score = computeScore(company.employees, num)
    setGainedScore(score)
    if (score === 50000) setResult(`${t('gameExact.correct')} ${t('gameExact.gainedScore')}: ${score}`)
    else setResult(`${t('gameExact.answer')} ${company.employees.toLocaleString()} ${t('gameCompare.people')}`)
    // add to cumulative and persist to profile
    setCumulativeScore(prev => prev + score)
    if (user) {
      recordResult(score).catch(() => {})
    }
    // increment round and check finish
    const nextRound = currentRound + 1
    setCurrentRound(nextRound)
    if (nextRound >= MAX_ROUNDS) {
      setFinished(true)
      // final focus/cleanup
      inputRef.current?.blur()
      return
    }
    // blur input so Enter (제출) removes focus
    inputRef.current?.blur()
  }

  function computeScore(actual: number, guessNum: number) {
    const MAX = 50000
    const BASE = 10
    const diff = Math.abs(actual - guessNum)
    // handle actual === 0
    if (actual === 0) {
      return diff === 0 ? MAX : BASE
    }
    const rel = diff / actual // relative error
    // use sqrt-based decay: raw = max(0, 1 - sqrt(rel))
    const raw = Math.max(0, 1 - Math.sqrt(rel))
    const score = BASE + Math.round((MAX - BASE) * raw)
    return score
  }



  return (
    <div className="min-h-screen bg-white">
      {/* Centered Navigation */}
      <nav className="border-b border-gray-300">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center gap-8">
            <button onClick={() => navigate('/')} className="hover:text-blue-600">{t('common.home')}</button>
            <button className="font-bold text-blue-600">{t('header.exactGame')}</button>
            <button onClick={() => navigate('/game/compare')} className="hover:text-blue-600">{t('header.compareGame')}</button>
            <button onClick={() => navigate('/ranking')} className="hover:text-blue-600">{t('common.ranking')}</button>
            <button onClick={() => navigate('/profile')} className="hover:text-blue-600">{t('common.profile')}</button>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <QuestionPanel companyName={company.name} currentRound={currentRound} maxRounds={MAX_ROUNDS} cumulativeScore={cumulativeScore} />

        <GuessForm guess={guess} setGuess={setGuess} onSubmit={onSubmit} inputRef={inputRef} disabled={finished} />

        {result && (
          <div className="border border-gray-300 p-4 mt-6 text-center">
            <div className="text-lg">{result}</div>
            {gainedScore !== null && (
              <div className="text-blue-600 font-bold mt-2">{t('gameExact.gainedScore')}: {gainedScore.toLocaleString()}</div>
            )}
          </div>
        )}

        {finished && (
          <div className="border-2 border-gray-300 p-8 mt-6">
            <h2 className="text-2xl font-bold mb-4">{t('gameExact.gameOver')}</h2>
            <p className="text-lg mb-6">
              {t('gameExact.totalScore')}: <span className="text-blue-600 font-bold">{cumulativeScore.toLocaleString()}</span>
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/profile')}
                className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-2 hover:bg-blue-50"
              >
                {t('gameExact.viewProfile')}
              </button>
              <button
                onClick={() => {
                  setCurrentRound(0)
                  setCumulativeScore(0)
                  setFinished(false)
                  pickRandom()
                }}
                className="flex-1 border-2 border-gray-300 px-6 py-2 hover:bg-gray-100"
              >
                {t('gameExact.playAgain')}
              </button>
            </div>
          </div>
        )}

        {!finished && result !== null && (
          <div className="mt-6">
            <button
              onClick={() => pickRandom()}
              className="w-full border border-gray-300 px-6 py-2 hover:bg-gray-100"
            >
              {t('gameExact.nextButtonWithKey')}
            </button>
          </div>
        )}
      </main>
    </div>
  )
}
