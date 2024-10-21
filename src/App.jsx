import { Route, Routes } from 'react-router-dom'
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/:type/:id" element={<Profile />} />
    </Routes>
  )
}

export default App
