import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const navigate = useNavigate()
  localStorage.removeItem('id')
  localStorage.removeItem('role')
  localStorage.removeItem('username')

  useEffect(() => {
    navigate('/login')
  } , [navigate])
}

export default Logout