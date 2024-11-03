import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const loggedUser=sessionStorage.getItem("user")

  return (
    <div>
        {loggedUser?children:<Navigate to="/login"/>}
    </div>
  )
}

export default PrivateRoute