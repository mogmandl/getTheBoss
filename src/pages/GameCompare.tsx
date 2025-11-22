import { useEffect, useState } from 'react'
import companies from '../data/companies'

export default function GameCompare() {
  const [leftIndex, setLeftIndex] = useState<number | null>(null)
  const [rightIndex, setRightIndex] = useState<number | null>(null)
  const [result, setResult] = useState<string | null>(null)

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
  }

  if (leftIndex === null || rightIndex === null) return null

  const left = companies[leftIndex]
  const right = companies[rightIndex]

  function chooseLeft() {
    if (left.employees === right.employees) setResult('동점입니다.')
    else if (left.employees > right.employees) setResult('정답: 왼쪽이 더 많습니다')
    else setResult('오답: 오른쪽이 더 많습니다')
  }

  function chooseRight() {
    if (left.employees === right.employees) setResult('동점입니다.')
    else if (right.employees > left.employees) setResult('정답: 오른쪽이 더 많습니다')
    else setResult('오답: 왼쪽이 더 많습니다')
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>두 회사 비교</h1>
      <div>
        <div>왼쪽: {left.name}</div>
        <div>오른쪽: {right.name}</div>
      </div>

      <div style={{ marginTop: 12 }}>
        <button onClick={chooseLeft}>왼쪽이 더 많다</button>
        <button onClick={chooseRight} style={{ marginLeft: 8 }}>오른쪽이 더 많다</button>
      </div>

      {result && <div style={{ marginTop: 12 }}>{result}</div>}

      <div style={{ marginTop: 12 }}>
        <button onClick={pickTwo}>다음 문제</button>
      </div>
    </div>
  )
}
