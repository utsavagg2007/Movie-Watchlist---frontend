import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

function WatchlistButton({ title }) {
  const { user, token, setUser } = useAuth()

  const handleClick = () => {
    if (!token) {
      toast.error('Please log in to add to watchlist')
      return
    }

    if (!title) {
      toast.error('Invalid movie title')
      return
    }

    if (user?.watchlist?.includes(title)) {
      toast.info('Movie is already in your watchlist')
      return
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/user/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title })
    }).then(() => {
      setUser({ ...user, watchlist: [...(user.watchlist || []), title] })
      toast.success('Movie successfully added to watchlist')
    })
  }

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 rounded bg-green-600 cursor-pointer"
    >
      Add to Watchlist
    </button>
  )
}

export default WatchlistButton