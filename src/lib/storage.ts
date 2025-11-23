export type StoredUser = {
  password?: string
  bestScore?: number
  bestCompare?: number
  totalPlays?: number
}

// Provide a runtime export for systems that accidentally import the type as a value.
// This is a harmless sentinel; prefer `import type { StoredUser }` in callers.
export const StoredUser = null

const USERS_KEY = 'app_users'
const CURR_KEY = 'app_current_user'

export function getUsers(): Record<string, StoredUser> {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (e) {
    return {}
  }
}

export function setUsers(users: Record<string, StoredUser>) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {}
}

export function getCurrentUser(): {
  id: string
  bestScore?: number
  bestCompare?: number
  totalPlays?: number
} | null {
  try {
    const raw = localStorage.getItem(CURR_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function setCurrentUser(
  user: {id: string; bestScore?: number; bestCompare?: number; totalPlays?: number} | null
) {
  try {
    if (user) localStorage.setItem(CURR_KEY, JSON.stringify(user))
    else localStorage.removeItem(CURR_KEY)
  } catch {}
}
