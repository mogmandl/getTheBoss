import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4">내 정보</h1>

      <div className="mb-6">
        <div className="text-lg">아이디: <strong>{user?.id ?? '게스트'}</strong></div>
        <button onClick={onLogout} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">로그아웃</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">최고 점수</div>
          <div className="text-xl font-bold">{user?.bestScore ?? 0}</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">등수</div>
          <div className="text-xl font-bold">—</div>
        </div>
        <div className="p-4 border rounded">
          <div className="text-sm text-gray-500">총 판수</div>
          <div className="text-xl font-bold">{user?.totalPlays ?? 0}</div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg mb-2">랭킹</h2>
        <div className="p-4 border rounded text-gray-500">랭킹 목록은 추후에 표시됩니다.</div>
      </section>
    </div>
  )
}
