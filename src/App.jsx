import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Header from './component/Header'
import './App.css'

function App() {


  return (
    <div>
        <Router>
           <Header />
           <Routes>
              <Route path="/" element={<Login />} />
           </Routes>
        </Router>
    </div>
  )
}

export default App
