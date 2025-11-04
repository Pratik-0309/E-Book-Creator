import React, { use } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

function protectedRoute({children}) {
  const isauthenticated = true;
  const loading = false;
  const location = useLocation();

  if(loading){
    return <div>Loading...</div>
  }

  if(!isauthenticated){ 
    return <Navigate to="/login" state={{from: location}} replace />
  }

  return children;

}

export default protectedRoute