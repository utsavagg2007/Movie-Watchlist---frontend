import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const { user, setUser, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="mt-24 px-8 max-w-5xl mx-auto text-gray-100 font-sans">
      <h1 className="text-5xl font-extrabold mb-14 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-indigo-400 to-purple-400 drop-shadow-md">
        Welcome {user?.username}
      </h1>
      <h2 className="text-3xl font-bold text-indigo-200 mt-6 mb-6 tracking-wide">
        Your Watchlist
      </h2>
      <ul className="space-y-4">
        {user?.watchlist.map(title => (
          <li
            key={title}
            className="flex justify-between items-center bg-gradient-to-r from-purple-800/60 to-indigo-800/60 backdrop-blur-lg px-6 py-4 rounded-xl border border-white/20 shadow-lg hover:scale-[1.02] transition-transform duration-200"
          >
            <span className="text-xl font-semibold text-white tracking-wide">{title}</span>
            <button
              onClick={() => handleRemove(title)}
              className="text-red-300 hover:text-red-200 transition text-lg p-2 rounded-full hover:bg-white/10 cursor-pointer"
              title="Remove from Watchlist"
            >
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

  function handleRemove(title) {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/watchlist`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title })
    }).then(() => {
      const updated = user.watchlist.filter(t => t !== title)
      setUser({ ...user, watchlist: updated })
      toast.success('Movie removed from watchlist')
    })
  }
}

export default Profile