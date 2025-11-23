import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div>
      <main className="max-w-3xl mx-auto p-6">
        <section className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h1 className="text-2xl font-semibold">홈</h1>
            <p className="text-sm text-gray-600">간단하고 명료한 게임을 선택하세요.</p>

            <div className="mt-4 flex flex-col gap-3">
              <button className="btn btn-primary" onClick={() => navigate('/game/exact')}>회사 직원 수 맞추기</button>
              <button className="btn btn-secondary" onClick={() => navigate('/game/compare')}>두 회사 비교</button>
            </div>

            <div className="mt-6">
              {user ? (
                <button className="btn btn-outline" onClick={() => navigate('/ranking')}>랭킹 보기</button>
              ) : (
                <p className="text-sm text-gray-500">랭킹을 보시려면 <button onClick={() => navigate('/signin')} className="link">회원가입</button> 해주세요.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
