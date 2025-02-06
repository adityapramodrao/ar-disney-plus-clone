import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Header from './component/Header'
import Signin from './component/Signin'
import Home from './Pages/Home'
import './App.css'

function App() {


  return (
    <div>
        <Router>
           <Header />
           <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="signin" element={<Signin />} />
              <Route path="home" element={<Home />} />
           </Routes>
        </Router>
    </div>
  )
}

export default App
