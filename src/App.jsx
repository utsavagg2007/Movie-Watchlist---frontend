import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="bg-gradient-to-b from-indigo-900 via-purple-900 to-black min-h-screen text-gray-100 font-sans"> 
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={ <ProtectedRoute> <Profile /> </ProtectedRoute>} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default App