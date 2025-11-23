import React from 'react'

type Props = {
  companyName: string
  currentRound: number
  maxRounds: number
  cumulativeScore: number
}

export default function QuestionPanel({ companyName, currentRound, maxRounds, cumulativeScore }: Props) {
  return (
    <div>
      <h1>회사 직원 수 맞추기</h1>
      <p>회사 이름: {companyName}</p>

      <div style={{ marginTop: 8 }}>
        <strong>현재 라운드:</strong> {currentRound} / {maxRounds}
        <span style={{ marginLeft: 12 }}>
          <strong>누적 점수:</strong> {cumulativeScore}
        </span>
      </div>
    </div>
  )
}
