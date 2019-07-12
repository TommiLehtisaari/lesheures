import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { ButtonGroup, Button, Form, Message } from 'semantic-ui-react'

const CREATE_PROJECT = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
      name
    }
  }
`

const AddForm = ({ setOpen, projects }) => {
  const [name, setName] = useState()
  const [message, setMessage] = useState()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const createProject = useMutation(CREATE_PROJECT)

  const handleSubmit = async () => {
    try {
      await createProject({ variables: { name } })
      setSuccess(true)
      await projects.refetch()
    } catch (error) {
      setMessage('Invalid Project name. Unique name is required.')
      setError(true)
    }
  }

  const handleDismiss = () => {
    setName(undefined)
    setMessage(false)
    setError(false)
    setSuccess(false)
  }

  if (success) {
    return (
      <Message color="green" onDismiss={() => handleDismiss()}>
        <Message.Header>Your project creation was successful</Message.Header>
        <p>
          Project by name <b>{name}</b> was created. Project can now be found
          below.
        </p>
      </Message>
    )
  }

  if (error) {
    return (
      <Message color="red" onDismiss={() => handleDismiss()}>
        <Message.Header>Error</Message.Header>
        <p>{message}</p>
      </Message>
    )
  }

  return (
    <Form>
      <Form.Field>
        <label>Project name</label>
        <input
          onChange={({ target }) => setName(target.value)}
          name="project_name"
          placeholder="Project Name"
        />
      </Form.Field>
      <Form.Field>
        <ButtonGroup>
          <Button
            type="button"
            icon="close"
            content={'close'}
            onClick={() => setOpen(false)}
          />
          <Button
            type="button"
            color="teal"
            content={'submit'}
            onClick={() => handleSubmit()}
          />
        </ButtonGroup>
      </Form.Field>
    </Form>
  )
}

export default AddForm
