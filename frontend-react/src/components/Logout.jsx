import { useEffect } from 'react'
import { useApolloClient } from 'react-apollo-hooks'

const Logout = ({ setCurrentUser }) => {
  const client = useApolloClient()

  useEffect(() => {
    localStorage.removeItem('token')
    client.resetStore()
    setCurrentUser(undefined)
  })
  return null
}

export default Logout
