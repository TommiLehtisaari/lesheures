import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import jwtDecode from 'jwt-decode'
import { Button, Form, Grid, Header, Loader } from 'semantic-ui-react'
import { Segment, Dimmer } from 'semantic-ui-react'

const CREATE_USER = gql`
  mutation createUser($username: String!, $name: String!, $password: String!) {
    createUser(username: $username, name: $name, password: $password) {
      value
    }
  }
`

const Register = ({ setCurrentUser }) => {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [fieldError, setFieldError] = useState(false)

  const register = useMutation(CREATE_USER)

  const handleSUbmit = async () => {
    setLoading(true)
    try {
      const { data } = await register({
        variables: { username, name, password }
      })
      setTimeout(() => {
        const token = data.createUser.value
        localStorage.setItem('token', token)
        const user = jwtDecode(token)
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
            Register now
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
                onChange={({ target }) => setName(target.value)}
                icon="pencil alternate"
                iconPosition="left"
                placeholder="Name"
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
                disabled={!password || !username || !name}
              >
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default Register
