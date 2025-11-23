import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ScoreCard from '../components/ui/ScoreCard.tsx'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [rank, setRank] = useState<number | null>(null)
  const [totalPlayers, setTotalPlayers] = useState(0)

  const onLogout = () => {
    logout()
    navigate('/')
  }

  if (!user) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl mb-4">내 정보</h1>
        <div className="p-4 border rounded">
          <p className="mb-4">프로필은 회원 전용 기능입니다. 프로필을 보시려면 로그인을 해주세요.</p>
          <div>
            <button onClick={() => navigate('/signin')} className="px-3 py-1 bg-blue-500 text-white rounded">로그인 / 회원가입</button>
            <button onClick={() => navigate('/')} className="ml-2 px-3 py-1 border rounded">홈으로</button>
          </div>
        </div>
      </div>
    )
  }

  useEffect(() => {
    // compute user's rank based on finalScore = bestScore * bestCompare
    if (!user) return
    try {
      const raw = localStorage.getItem('app_users')
      const users = raw ? JSON.parse(raw) : {}
      const list = Object.keys(users).map((id) => {
        const e = users[id] || {}
        const bs = Number(e.bestScore ?? 0)
        const bc = Number(e.bestCompare ?? 0)
        return { id, final: bs * bc }
      })
      list.sort((a, b) => b.final - a.final)
      const idx = list.findIndex(r => r.id === user.id)
      setTotalPlayers(list.length)
      setRank(idx >= 0 ? idx + 1 : null)
    } catch (err) {
      setRank(null)
      setTotalPlayers(0)
    }
  }, [user])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">내 정보</h1>

      <div className="mb-6">
        <div className="text-lg">아이디: <strong>{user?.id ?? '게스트'}</strong></div>
        <button onClick={onLogout} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">로그아웃</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <ScoreCard title="정확히 맞추기 누적 점수" value={user?.bestScore ?? 0} />
        <ScoreCard title="비교 게임 최고 점수" value={user?.bestCompare ?? 0} />
        <ScoreCard title="등수" value={rank ? `${rank} / ${totalPlayers}` : '—'} />
        <ScoreCard title="총 판수" value={user?.totalPlays ?? 0} />
      </div>

      {/* 랭킹 박스는 프로필에서 제거됨 (요청에 따라) */}
    </div>
  )
}
