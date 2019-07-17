import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Table, Button, Form, ButtonGroup } from 'semantic-ui-react'
import { Message, Icon } from 'semantic-ui-react'
import TaskColor from './TaskColor'

const CREATE_TASK = gql`
  mutation createTask(
    $name: String!
    $projectId: String!
    $description: String
    $color: Int
  ) {
    createTask(
      name: $name
      description: $description
      color: $color
      projectId: $projectId
    ) {
      id
      name
    }
  }
`

const ProjectFooter = ({ editMode, projects, project }) => {
  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [name, setName] = useState()
  const [color, setColor] = useState(Math.floor(Math.random() * 15))
  const [description, setDescription] = useState()

  const createTask = useMutation(CREATE_TASK)

  const handelSubmit = async () => {
    try {
      await createTask({
        variables: { name, description, color, projectId: project.id }
      })
      setSuccess(true)
      setTimeout(async () => {
        await projects.refetch()
        setSuccess(false)
        setOpen(false)
      }, 4000)
    } catch (error) {
      setError(true)
      setTimeout(async () => {
        setError(false)
        setOpen(false)
      }, 4000)
    }
  }

  if (!editMode) return null

  if (success || error) {
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="4" color="teal">
            {success && (
              <Message icon color="green">
                <Icon name="check" color="green" />
                <Message.Content>
                  <Message.Header>New task added</Message.Header>
                  We are fetching that content for you.
                </Message.Content>
              </Message>
            )}
            {error && (
              <Message icon color="red">
                <Icon name="cancel" color="red" />
                <Message.Content>
                  <Message.Header>Task creation failed.</Message.Header>
                </Message.Content>
              </Message>
            )}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }

  if (open) {
    return (
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell colSpan="4" color="teal">
            <Form>
              <Form.Field>
                <label>Task name</label>
                <input
                  onChange={({ target }) => setName(target.value)}
                  placeholder="Task name"
                />
              </Form.Field>
              <Form.Field>
                <label>Task description</label>
                <input
                  onChange={({ target }) => setDescription(target.value)}
                  placeholder="Task description"
                />
              </Form.Field>
              <Form.Field>
                <label>Choose color for Task</label>
                <TaskColor color={color} setColor={setColor} />
              </Form.Field>
              <ButtonGroup fluid>
                <Button
                  onClick={() => setOpen(false)}
                  content="Close without saving"
                  icon="close"
                />
                <Button
                  onClick={() => handelSubmit()}
                  content="Save"
                  color="green"
                  icon="save"
                />
              </ButtonGroup>
            </Form>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    )
  }

  return (
    <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan="4" color="teal">
          <Button
            fluid
            content="Add new Task to this Project"
            onClick={() => setOpen(true)}
            icon="add"
            labelPosition="left"
          />
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  )
}

export default ProjectFooter
