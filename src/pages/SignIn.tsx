import { useState } from 'react'
import { useAuth } from '../contexts/AuthContextFirebase'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [error, setError] = useState('')
  const { login, signup, loading } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.includes('@')) {
      setError(t('signin.errors.invalidEmail'))
      return
    }

    if (password.length < 6) {
      setError(t('signin.errors.passwordTooShort'))
      return
    }

    try {
      if (isSignup) {
        await signup(email, password)
      } else {
        await login(email, password)
      }
      navigate('/')
    } catch (err: any) {
      setError(err?.message || '오류가 발생했습니다')
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center">
          {isSignup ? t('signin.signupTitle') : t('signin.title')}
        </h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">{t('signin.emailLabel')}</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={t('signin.emailPlaceholder')}
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">{t('signin.passwordLabel')}</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={t('signin.passwordPlaceholder')}
              className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-600"
              minLength={6}
              required
            />
          </div>

          {error && (
            <div className="border border-red-600 text-red-600 px-4 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-blue-600 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? t('signin.processing') : (isSignup ? t('signin.signupButton') : t('signin.loginButton'))}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsSignup(prev => !prev)}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? t('signin.switchToLogin') : t('signin.switchToSignup')}
          </button>
        </div>
      </div>
    </div>
  )
}
