import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Header from './component/Header'
import './App.css'

function App() {


  return (
    <div>
        <Router>
           <Header />
           <Routes>
              <Route path="/" element={<LandingPage />} />
           </Routes>
        </Router>
    </div>
  )
}

export default App
