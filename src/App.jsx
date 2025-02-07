import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Header from './component/Header'
import Signin from './component/Signin'
import Home from './Pages/Home'
import './App.css'
import MovieDetails from './Pages/MovieDetails'

function App() {


  return (
    <div>
        <Router>
           <Header />
           <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="signin" element={<Signin />} />
              <Route path="home" element={<Home />} />
              <Route path="/detail/:id" element={<MovieDetails />} />

           </Routes>
        </Router>
    </div>
  )
}

export default App
