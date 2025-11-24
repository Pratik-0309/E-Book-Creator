import React from 'react'
import {Route, Routes} from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import EditorPage from './pages/EditorPage.jsx'
import ViewBookPage from './pages/ViewBookPage.jsx'
import ProfilPage from './pages/ProfilePage.jsx'

function App() {
  return (
    <>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage />}/>
        < Route path="/signup" element={<SignupPage />}/>

        {/* Protected Routes */}

        <Route path='/dashboard' 
        element={<ProtectedRoute> <DashboardPage/> </ProtectedRoute>}
        />
        
        <Route path='/editor/:bookId'
        element={<ProtectedRoute> <EditorPage/> </ProtectedRoute>}
        />
        <Route path='/view-book/:bookId'
        element={<ProtectedRoute> <ViewBookPage/> </ProtectedRoute>}
        />
        <Route path='/profile'
        element={<ProtectedRoute> <ProfilPage/> </ProtectedRoute>}
        />


      </Routes>
    </>
  )
}

export default App
