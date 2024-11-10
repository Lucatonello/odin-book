import { Route, Routes } from 'react-router-dom'
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Jobs from './components/Jobs';
import ViewJob from './components/ViewJob';
import Network from './components/Network';
import GrowNetwork from './components/GrowNetwork';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/:type/:id" element={<Profile />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<ViewJob />} />
      <Route path="/network" element={<Network />} />
      <Route path="/network/grow" element={<GrowNetwork />} />
    </Routes>
  )
}

export default App
