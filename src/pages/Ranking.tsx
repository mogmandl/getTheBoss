import { useEffect, useState } from 'react'
import LeaderboardRow from '../components/ui/LeaderboardRow.tsx'
import { getUsers } from '../lib/storage'

type Row = {
  id: string
  bestScore: number
  bestCompare: number
  finalScore: number
  rank: number
}


export default function Ranking() {
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    try {
      const users = getUsers()
      const entries = Object.keys(users).map((id) => {
        const entry = users[id] || {}
        const bestScore = Number(entry.bestScore ?? 0)
        const bestCompare = Number(entry.bestCompare ?? 0)
        const finalScore = bestScore * bestCompare
        return { id, bestScore, bestCompare, finalScore }
      })
      entries.sort((a, b) => b.finalScore - a.finalScore)
      // assign competition-style ranks (1,1,3 for ties)
      let prevFinal: number | null = null
      let prevRank = 0
      const withRank: Row[] = entries.map((e, idx) => {
        const rank = e.finalScore === prevFinal ? prevRank : idx + 1
        prevFinal = e.finalScore
        prevRank = rank
        return { id: e.id, bestScore: e.bestScore, bestCompare: e.bestCompare, finalScore: e.finalScore, rank }
      })
      setRows(withRank)
    } catch (err) {
      console.error('Failed to load ranking', err)
      setRows([])
    }
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>랭킹</h1>
      <p>최종 점수 = 정확히 맞추기 누적 점수 × 비교 게임 최고 점수</p>

      <div style={{ marginTop: 12 }}>
        {rows.length === 0 && <div>등록된 플레이어가 없습니다.</div>}
        {rows.length > 0 && (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: 8 }}>순위</th>
                <th style={{ textAlign: 'left', padding: 8 }}>아이디</th>
                <th style={{ textAlign: 'right', padding: 8 }}>정확히맞추기</th>
                <th style={{ textAlign: 'right', padding: 8 }}>비교최고</th>
                <th style={{ textAlign: 'right', padding: 8 }}>최종점수</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <LeaderboardRow key={r.id} id={r.id} rank={r.rank} bestScore={r.bestScore} bestCompare={r.bestCompare} finalScore={r.finalScore} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
