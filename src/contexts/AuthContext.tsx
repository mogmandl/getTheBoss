import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getUsers, setUsers, getCurrentUser, setCurrentUser, StoredUser } from '../lib/storage'

type User = {
  id: string
  bestScore?: number
  bestCompare?: number
  totalPlays?: number
}

type AuthContextType = {
  user: User | null
  login: (id: string, password: string) => Promise<void>
  signup: (id: string, password: string) => Promise<void>
  logout: () => void
  recordResult: (score: number) => Promise<void>
  recordBestScore: (score: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = getCurrentUser()
      return raw ? raw : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    setCurrentUser(user)
  }, [user])

  const login = async (id: string, password: string) => {
    const users = getUsers()
    const entry = users[id]
    if (!entry) throw new Error('존재하지 않는 사용자입니다')
    if (entry.password !== password) throw new Error('비밀번호가 틀립니다')
    setUser({ id, bestScore: entry.bestScore ?? 0, bestCompare: entry.bestCompare ?? 0, totalPlays: entry.totalPlays ?? 0 })
  }

  const signup = async (id: string, password: string) => {
    const users = getUsers()
    if (users[id]) throw new Error('이미 존재하는 아이디입니다')
    users[id] = { password, bestScore: 0, bestCompare: 0, totalPlays: 0 }
    setUsers(users)
    setUser({ id, bestScore: 0, bestCompare: 0, totalPlays: 0 })
  }

  const logout = () => setUser(null)

  const recordResult = async (score: number) => {
    if (!user) return
    const users = getUsers()
    const entry = users[user.id] || ({ password: '', bestScore: 0, totalPlays: 0 } as StoredUser)
    // Treat bestScore as an accumulated total: add this round's score
    entry.totalPlays = (entry.totalPlays ?? 0) + 1
    entry.bestScore = (entry.bestScore ?? 0) + score
    users[user.id] = entry
    setUsers(users)
    setUser({ id: user.id, bestScore: entry.bestScore, totalPlays: entry.totalPlays })
  }

  const recordBestScore = async (score: number) => {
    if (!user) return
    const users = getUsers()
    const entry = users[user.id] || ({ password: '', bestScore: 0, bestCompare: 0, totalPlays: 0 } as StoredUser)
    // Keep the best (maximum) score for compare-mode
    entry.bestCompare = Math.max(entry.bestCompare ?? 0, score)
    users[user.id] = entry
    setUsers(users)
    setUser({ id: user.id, bestScore: entry.bestScore ?? 0, bestCompare: entry.bestCompare, totalPlays: entry.totalPlays ?? 0 })
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, recordResult, recordBestScore }}>
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
