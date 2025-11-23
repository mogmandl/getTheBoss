// Firebase를 사용하는 새로운 AuthContext
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'
import {
  signUpWithEmail,
  signInWithEmail,
  logOut,
  recordGameResult,
  recordBestCompareScore,
  getCurrentUserData,
  deleteAccount
} from '../lib/firebaseAuth'

type User = {
  id: string
  email?: string
  bestScore?: number
  bestCompare?: number
  totalPlays?: number
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  recordResult: (score: number) => Promise<void>
  recordBestScore: (score: number) => Promise<void>
  deleteUserAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Firebase Auth 상태 변경 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // 로그인된 경우 Firestore에서 사용자 데이터 가져오기
        const userData = await getCurrentUserData()
        if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            bestScore: userData.bestScore || 0,
            bestCompare: userData.bestCompare || 0,
            totalPlays: userData.totalPlays || 0,
          })
        }
      } else {
        // 로그아웃된 경우
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const userData = await signInWithEmail(email, password)
      setUser({
        id: userData.id,
        email: userData.email,
        bestScore: userData.bestScore || 0,
        bestCompare: userData.bestCompare || 0,
        totalPlays: userData.totalPlays || 0,
      })
    } catch (error: any) {
      throw error
    }
  }

  const signup = async (email: string, password: string) => {
    try {
      const userData = await signUpWithEmail(email, password)
      setUser({
        id: userData.id,
        email: userData.email,
        bestScore: 0,
        bestCompare: 0,
        totalPlays: 0,
      })
    } catch (error: any) {
      throw error
    }
  }

  const logout = async () => {
    try {
      await logOut()
      setUser(null)
    } catch (error: any) {
      throw error
    }
  }

  const recordResult = async (score: number) => {
    if (!user) return
    try {
      await recordGameResult(user.id, score)
      // 로컬 상태 업데이트
      setUser(prev => prev ? {
        ...prev,
        totalPlays: (prev.totalPlays || 0) + 1,
        bestScore: (prev.bestScore || 0) + score,
      } : null)
    } catch (error: any) {
      console.error('게임 결과 기록 실패:', error)
    }
  }

  const recordBestScore = async (score: number) => {
    if (!user) return
    try {
      await recordBestCompareScore(user.id, score)
      // 로컬 상태 업데이트
      setUser(prev => prev ? {
        ...prev,
        bestCompare: Math.max(prev.bestCompare || 0, score),
      } : null)
    } catch (error: any) {
      console.error('최고 점수 기록 실패:', error)
    }
  }

  const deleteUserAccount = async () => {
    try {
      await deleteAccount()
      setUser(null)
    } catch (error: any) {
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, recordResult, recordBestScore, deleteUserAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
