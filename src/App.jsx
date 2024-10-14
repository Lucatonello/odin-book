import { Route, Routes } from 'react-router-dom'
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default App
