import { Route, Routes, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Index from './components/Index';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CompanyProfile from './components/CompanyProfile';
import Jobs from './components/Jobs';
import ViewJob from './components/ViewJob';
import Network from './components/Network';
import GrowNetwork from './components/GrowNetwork';
import Notifications from './components/Notifications';
import ViewPost from './components/ViewPost';
import Messaging from './components/Messaging';
import NotFound from './components/404';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
      if (!token && location.pathname !== '/login' && location.pathname !== '/signup') {
        navigate('/login');
      }
  }, [navigate, token, location.pathname])


  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile/user/:id" element={<Profile />} />
      <Route path="/profile/company/:id" element={<CompanyProfile />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<ViewJob />} />
      <Route path="/network" element={<Network />} />
      <Route path="/network/grow" element={<GrowNetwork />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/post/:id" element={<ViewPost />} />
      <Route path="/messaging" element={<Messaging />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
