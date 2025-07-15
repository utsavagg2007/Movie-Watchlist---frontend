import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    if (!username || !email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data && data._id) {
          toast.success('Signup successful!')
          navigate('/login')
        } else {
          toast.error(data.error || 'Signup failed')
        }
      })
      .catch(() => toast.error('Server error. Please try again later.'))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-10 space-y-6 bg-gradient-to-br from-indigo-900/60 via-purple-800/60 to-black/60 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/10 text-gray-100"
      >
        <Link
          to="/"
          className="text-indigo-300 hover:text-indigo-200 text-sm underline transition inline-block"
        >
          &larr; Go to Home
        </Link>
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-white drop-shadow-md">
          Sign Up
        </h2>
        <input
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-white/10"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-white/10"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 border border-white/10"
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className="text-sm text-center text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-indigo-400 hover:text-indigo-300 underline">
            Login
          </a>
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default Signup