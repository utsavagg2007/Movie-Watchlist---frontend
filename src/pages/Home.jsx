import { useEffect, useState } from 'react'
import MovieCard from '../components/MovieCard'

function Home() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setMovies(data.results.slice(0, 15))) // Get only top 15
  }, [])

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto text-gray-100">
      <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-purple-300 via-indigo-300 to-white text-transparent bg-clip-text drop-shadow-lg">Popular Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}

export default Home