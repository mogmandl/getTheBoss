import { useEffect, useState } from 'react'
import companies from '../data/companies'
import { useAuth } from '../contexts/AuthContext'

export default function GameCompare() {
  const [leftIndex, setLeftIndex] = useState<number | null>(null)
  const [rightIndex, setRightIndex] = useState<number | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [answered, setAnswered] = useState(false)
  const [sessionScore, setSessionScore] = useState(0)
  const [lastWasCorrect, setLastWasCorrect] = useState<boolean | null>(null)
  const { user, recordBestScore } = useAuth()

  useEffect(() => {
    pickTwo()
  }, [])

  function pickTwo() {
    let a = Math.floor(Math.random() * companies.length)
    let b = Math.floor(Math.random() * companies.length)
    while (b === a) b = Math.floor(Math.random() * companies.length)
    setLeftIndex(a)
    setRightIndex(b)
    setResult(null)
    setAnswered(false)
  }

  if (leftIndex === null || rightIndex === null) return null

  const left = companies[leftIndex]
  const right = companies[rightIndex]

  // New behavior: show left company's employee count, and on the right
  // the player chooses whether the right company's size is 더 많다 (more) or 더 적다 (less).
  function chooseMore() {
    if (left.employees === right.employees) setResult('동점입니다.')
    else if (right.employees > left.employees) {
      const newScore = sessionScore + 1
      setSessionScore(newScore)
      setResult(`정답! 왼쪽 ${left.employees}명, 오른쪽 ${right.employees}명 (점수: ${newScore})`)
      // persist best session score
      if (user) recordBestScore(newScore).catch(() => {})
      setLastWasCorrect(true)
    } else {
      setResult(`오답. 왼쪽 ${left.employees}명, 오른쪽 ${right.employees}명`)
      setLastWasCorrect(false)
    }
    setAnswered(true)
  }

  function chooseLess() {
    if (left.employees === right.employees) setResult('동점입니다.')
    else if (right.employees < left.employees) {
      const newScore = sessionScore + 1
      setSessionScore(newScore)
      setResult(`정답! 왼쪽 ${left.employees}명, 오른쪽 ${right.employees}명 (점수: ${newScore})`)
      if (user) recordBestScore(newScore).catch(() => {})
      setLastWasCorrect(true)
    } else {
      setResult(`오답. 왼쪽 ${left.employees}명, 오른쪽 ${right.employees}명`)
      setLastWasCorrect(false)
    }
    setAnswered(true)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>두 회사 비교</h1>
      <div>
        <div style={{ marginBottom: 6 }}>
          <div>왼쪽: {left.name}</div>
          <div>직원 수: <strong>{left.employees}</strong></div>
        </div>

        <div>
          <div>오른쪽: {right.name}</div>
          <div style={{ marginTop: 8 }}>
            <button onClick={chooseMore} disabled={answered}>더 많다</button>
            <button onClick={chooseLess} disabled={answered} style={{ marginLeft: 8 }}>더 적다</button>
          </div>
        </div>
      </div>

      {result && <div style={{ marginTop: 12 }}>{result}</div>}

      <div style={{ marginTop: 12 }}>
        {!answered && <div>현재 점수: <strong>{sessionScore}</strong></div>}
        {answered && lastWasCorrect === false && (
          <div style={{ marginTop: 8 }}>
            <button onClick={() => {
              // restart session
              setSessionScore(0)
              setAnswered(false)
              setLastWasCorrect(null)
              pickTwo()
            }}>다시하기</button>
          </div>
        )}
        {answered && lastWasCorrect === true && (
          // brief delay then next question
          <div style={{ marginTop: 8 }}>
            <button onClick={() => { setAnswered(false); setLastWasCorrect(null); pickTwo(); }}>다음 문제</button>
          </div>
        )}
        {!answered && (
          <div style={{ marginTop: 8 }}>
            <button onClick={pickTwo}>다음 문제</button>
          </div>
        )}
      </div>
    </div>
  )
}
