import { useEffect } from 'react'

const Logout = ({ setCurrentUser }) => {
  useEffect(() => {
    localStorage.removeItem('token')
    setCurrentUser(undefined)
  })
  return null
}

export default Logout
