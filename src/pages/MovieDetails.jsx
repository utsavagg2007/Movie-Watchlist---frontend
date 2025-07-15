import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import WatchlistButton from '../components/WatchlistButton'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=credits`)
      .then(res => res.json())
      .then(data => setMovie(data))
  }, [id])

  if (!movie) return <div className="p-4">Loading...</div>

  return (
    <div className="mt-16 px-8 py-12 max-w-5xl mx-auto bg-white/5 backdrop-blur-md rounded-xl shadow-lg border border-white/10 text-gray-100 font-sans text-base sm:text-lg">
      <h1 className="text-5xl font-extrabold tracking-wide antialiased mb-8 bg-gradient-to-r from-purple-300 via-indigo-300 to-white text-transparent bg-clip-text drop-shadow-md">{movie.title}</h1>
      <p className="mb-6 leading-relaxed text-lg text-gray-300 antialiased">{movie.overview}</p>
      <h2 className="text-3xl font-semibold text-indigo-300 mb-4">Cast:</h2>
      <ul className="list-disc ml-5 mb-4">
        {movie.credits?.cast?.slice(0, 5).map(actor => (
          <li
            key={actor.id}
            className="text-base sm:text-lg tracking-normal leading-relaxed text-gray-200"
          >
            <span className="font-medium text-white">{actor.name}</span> as <span className="font-bold text-indigo-300">{actor.character}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-10">
        <WatchlistButton title={movie.title} />
      </div>
    </div>
  )
}

export default MovieDetails