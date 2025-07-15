import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  if (location.pathname === '/login' || location.pathname === '/signup') return null

  return (
    <nav className="bg-white/10 backdrop-blur-md px-8 py-4 flex justify-between items-center shadow-lg rounded-b-md border-b border-white/20">
      <Link to="/" className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-300 to-white drop-shadow-md hover:scale-105 transition-transform duration-300">MovieWatchlist</Link>
      <div className="hidden md:flex space-x-4">
        {user ? (
          <>
            {location.pathname !== '/profile' && (
              <Link
                to="/profile"
                className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow-md transition duration-300"
              >
                Profile
              </Link>
            )}
            {location.pathname === '/profile' && (
              <Link to="/" className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md transition duration-300">
                Go to Homepage
              </Link>
            )}
            <button
              onClick={() => {
                localStorage.removeItem('token')
                window.location.href = '/'
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md transition duration-300">
              Login
            </Link>
            <Link to="/signup" className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-white hover:bg-gray-100 rounded-md shadow-md transition duration-300">
              Sign Up
            </Link>
          </>
        )}
      </div>
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          &#9776;
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-md border border-white/20 flex flex-col space-y-2 md:hidden z-50">
          {user ? (
            <>
              {location.pathname !== '/profile' && (
                <Link to="/profile" className="text-white" onClick={() => setMenuOpen(false)}>Profile</Link>
              )}
              {location.pathname === '/profile' && (
                <Link to="/" className="text-white" onClick={() => setMenuOpen(false)}>Go to Homepage</Link>
              )}
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  window.location.href = '/'
                }}
                className="text-white text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow-md transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-white hover:bg-gray-100 rounded-md shadow-md transition duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar