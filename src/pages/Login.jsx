import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) throw new Error('Invalid credentials')
        return res.json()
      })
      .then(data => {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        toast.success('Login successful!')
        navigate('/profile')
      })
      .catch(err => {
        toast.error('Invalid email or password')
      })
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-20">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-24 p-10 space-y-6 bg-gradient-to-br from-indigo-900/60 via-purple-800/60 to-black/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 text-gray-100"
      >
        <Link
          to="/"
          className="text-indigo-300 hover:text-indigo-200 text-sm underline transition inline-block"
        >
          &larr; Go to Home
        </Link>
        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-purple-300 via-indigo-300 to-white text-transparent bg-clip-text">
          Login
        </h2>
        <input
          className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-md bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className="text-sm text-center text-gray-300">
          Create an Account?{' '}
          <a href="/signup" className="text-indigo-400 hover:text-indigo-300 underline">
            Sign Up
          </a>
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition duration-300">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login