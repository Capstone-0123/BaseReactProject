import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Home from './pages/Home'
import Login from './pages/Login'
import Browse from './pages/Browse'
import MovieDetail from './pages/MovieDetail'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardProfile from './pages/dashboard/DashboardProfile'
import DashboardPosts from './pages/dashboard/DashboardPosts'
import './App.css'

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="profile" element={<DashboardProfile />} />
            <Route path="posts" element={<DashboardPosts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App
