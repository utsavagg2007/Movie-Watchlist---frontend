import { Link } from 'react-router-dom'

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="hover:scale-105 transition-transform duration-300 ease-in-out shadow-md rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="rounded-xl object-cover w-full h-full" />
    </Link>
  )
}

export default MovieCard