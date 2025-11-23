// React import unnecessary with new JSX transform

type Props = {
  id: string
  rank: number
  bestScore: number
  bestCompare: number
  finalScore: number
}

export default function LeaderboardRow({ id, rank, bestScore, bestCompare, finalScore }: Props) {
  return (
    <tr style={{ borderTop: '1px solid #eee' }}>
      <td style={{ padding: 8 }}>{rank}</td>
      <td style={{ padding: 8 }}>{id}</td>
      <td style={{ padding: 8, textAlign: 'right' }}>{bestScore}</td>
      <td style={{ padding: 8, textAlign: 'right' }}>{bestCompare}</td>
      <td style={{ padding: 8, textAlign: 'right', fontWeight: 'bold' }}>{finalScore}</td>
    </tr>
  )
}
