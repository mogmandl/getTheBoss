import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      if (isSignup) {
        await signup(id, password)
      } else {
        await login(id, password)
      }
      // 성공하면 홈으로 이동
      navigate('/')
    } catch (err: any) {
      setError(err?.message || '오류가 발생했습니다')
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{isSignup ? '회원가입' : '로그인'}</h2>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 320 }}>
        <label>
          아이디
          <input value={id} onChange={e => setId(e.target.value)} />
        </label>
        <label>
          비밀번호
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">{isSignup ? '회원가입' : '로그인'}</button>
      </form>
      <hr style={{ marginTop: 12 }} />
      <button onClick={() => setIsSignup(prev => !prev)} style={{ marginTop: 8 }}>
        {isSignup ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 회원가입'}
      </button>
    </div>
  )
}