import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          return res.json()
        })
        .then(data => {
          if (data.username) {
            setUser({ username: data.username, watchlist: data.watchlist })
          }
        })
        .catch(err => {
          console.error('Auth error:', err.message)
          setToken(null)
          setUser(null)
          localStorage.removeItem('token')
        })
    }
  }, [token])

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}