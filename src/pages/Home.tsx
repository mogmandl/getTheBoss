import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 20 }}>
      <h1>홈 페이지</h1>
      <p>게임 모드를 선택하세요.</p>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate('/game/exact')}>회사 직원 수 맞추기</button>
      </div>

      <div style={{ marginTop: 8 }}>
        <button onClick={() => navigate('/game/compare')}>두 회사 비교</button>
      </div>
    </div>
  )
}
