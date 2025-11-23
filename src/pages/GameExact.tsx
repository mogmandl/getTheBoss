import { useEffect, useState, useRef } from 'react'
import companies from '../data/companies'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import QuestionPanel from '../components/gameExact/QuestionPanel.tsx'
import GuessForm from '../components/gameExact/GuessForm.tsx'

export default function GameExact() {
  const [companyIndex, setCompanyIndex] = useState<number | null>(null)
  const [guess, setGuess] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [gainedScore, setGainedScore] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { user, recordResult } = useAuth()
  const navigate = useNavigate()

  const MAX_ROUNDS = 10
  const [currentRound, setCurrentRound] = useState(0)
  const [cumulativeScore, setCumulativeScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    pickRandom()
  }, [])

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

  // spacebar should go to next question and not insert spaces
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.code === 'Space') {
        e.preventDefault()
        if (!finished) pickRandom()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [finished])

  if (companyIndex === null) return null
  const company = companies[companyIndex]

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const num = Number(guess)
    if (Number.isNaN(num)) {
      setResult('숫자를 입력해주세요')
      return
    }
    if (finished) return
    const score = computeScore(company.employees, num)
    setGainedScore(score)
    if (score === 50000) setResult(`정답입니다! 획득 점수: ${score}`)
    else setResult(`정답은 ${company.employees} 입니다.`)
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
    <div style={{ padding: 20 }}>
      <QuestionPanel companyName={company.name} currentRound={currentRound} maxRounds={MAX_ROUNDS} cumulativeScore={cumulativeScore} />

      <div style={{ marginTop: 12 }}>
        <GuessForm guess={guess} setGuess={setGuess} onSubmit={onSubmit} inputRef={inputRef} disabled={finished} />
      </div>

      {result && <div>{result}</div>}
      {gainedScore !== null && (
        <div style={{ marginTop: 8 }}>획득 점수: {gainedScore}</div>
      )}

      {finished && (
        <div style={{ marginTop: 16, padding: 12, border: '1px solid #ccc' }}>
          <h2>게임 종료</h2>
          <p>총 누적 점수: {cumulativeScore}</p>
          <div style={{ marginTop: 8 }}>
            <button onClick={() => navigate('/profile')}>프로필 보기</button>
            <button style={{ marginLeft: 8 }} onClick={() => {
              // restart
              setCurrentRound(0)
              setCumulativeScore(0)
              setFinished(false)
              pickRandom()
            }}>다시하기</button>
          </div>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={() => { if (!finished) pickRandom() }} disabled={finished}>다음 문제</button>
      </div>
    </div>
  )
}
