import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function protectedRoute({children}) {
  
  const {isauthenticated, loading} = useAuth();
  if(loading){
    return <div>Loading...</div>
  }

  if(!isauthenticated){ 
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children;

}

export default protectedRoute