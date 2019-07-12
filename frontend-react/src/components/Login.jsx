import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import jwtDecode from 'jwt-decode'
import { Button, Form, Grid, Header, Loader } from 'semantic-ui-react'
import { Message, Segment, Dimmer } from 'semantic-ui-react'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const Login = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [fieldError, setFieldError] = useState(false)

  const login = useMutation(LOGIN)

  const token = localStorage.getItem('token')
  if (token) {
    const user = jwtDecode(token)
    setCurrentUser(user)
  }

  const handleSUbmit = async () => {
    setLoading(true)
    try {
      const { data } = await login({ variables: { username, password } })
      setTimeout(() => {
        localStorage.setItem('token', data.login.value)
        const user = jwtDecode(data.login.value)
        setLoading(false)
        setCurrentUser(user)
      }, 1000)
    } catch (exeption) {
      setLoading(false)
      setFieldError(true)
      setTimeout(() => setFieldError(false), 5000)
      return
    }
  }
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment>
              <Dimmer active={loading} inverted>
                <Loader />
              </Dimmer>

              <Form.Input
                fluid
                onChange={({ target }) => setUsername(target.value)}
                icon="male"
                iconPosition="left"
                placeholder="Username"
                error={fieldError}
              />
              <Form.Input
                fluid
                onChange={({ target }) => setPassword(target.value)}
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                error={fieldError}
              />

              <Button
                onClick={handleSUbmit}
                color="teal"
                fluid
                size="large"
                disabled={!password || !username}
              >
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            New user? <NavLink to="/register">Sign Up</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Login
