import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id: string
  bestScore?: number
  totalPlays?: number
}

type AuthContextType = {
  user: User | null
  login: (id: string, password: string) => Promise<void>
  signup: (id: string, password: string) => Promise<void>
  logout: () => void
  recordResult: (score: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_KEY = 'app_users'
const CURR_KEY = 'app_current_user'

function readUsers(): Record<string, { password: string; bestScore?: number; totalPlays?: number }> {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function writeUsers(users: Record<string, any>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(CURR_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(CURR_KEY, JSON.stringify(user))
    else localStorage.removeItem(CURR_KEY)
  }, [user])

  const login = async (id: string, password: string) => {
    const users = readUsers()
    const entry = users[id]
    if (!entry) throw new Error('존재하지 않는 사용자입니다')
    if (entry.password !== password) throw new Error('비밀번호가 틀립니다')
    setUser({ id, bestScore: entry.bestScore ?? 0, totalPlays: entry.totalPlays ?? 0 })
  }

  const signup = async (id: string, password: string) => {
    const users = readUsers()
    if (users[id]) throw new Error('이미 존재하는 아이디입니다')
    users[id] = { password, bestScore: 0, totalPlays: 0 }
    writeUsers(users)
    setUser({ id, bestScore: 0, totalPlays: 0 })
  }

  const logout = () => setUser(null)

  const recordResult = async (score: number) => {
    if (!user) return
    const users = readUsers()
    const entry = users[user.id] || { password: '', bestScore: 0, totalPlays: 0 }
    // Treat bestScore as an accumulated total: add this round's score
    entry.totalPlays = (entry.totalPlays ?? 0) + 1
    entry.bestScore = (entry.bestScore ?? 0) + score
    users[user.id] = entry
    writeUsers(users)
    setUser({ id: user.id, bestScore: entry.bestScore, totalPlays: entry.totalPlays })
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, recordResult }}>
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
