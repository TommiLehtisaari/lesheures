import React, { useState, useEffect } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Button, Input, ButtonGroup, Icon, Label } from 'semantic-ui-react'

const UPDATE_PROJECT = gql`
  mutation updateProject($id: String!, $name: String!) {
    updateProject(id: $id, name: $name) {
      name
    }
  }
`

const ProjectHeader = ({ admin, editMode, setEditMode, project, projects }) => {
  const [name, setName] = useState()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const updateProject = useMutation(UPDATE_PROJECT)

  useEffect(() => {
    setName(project.name)
  }, [project.name])

  const handleSubmit = async () => {
    try {
      await updateProject({ variables: { name, id: project.id } })
      await projects.refetch()
      setSuccess(true)
    } catch (error) {
      setError(true)
    }
    setTimeout(() => {
      setError(false)
      setSuccess(false)
    }, 3000)
  }

  if (success) {
    return (
      <div>
        <Icon color="green" name="check" />
        <Label color="green" content="Project Saved" />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Icon color="red" name="close" />
        <Label
          color="red"
          content="Project not saved. Project name must be unique."
        />
      </div>
    )
  }

  if (!admin) return project.name

  if (!editMode) {
    return (
      <React.Fragment>
        {project.name}
        <Button
          onClick={() => setEditMode(!editMode)}
          style={{ float: 'right' }}
          content="Edit Project"
          icon="edit"
        />
      </React.Fragment>
    )
  }

  return (
    <div>
      <Input fluid defaultValue={project.name}>
        <input onChange={({ target }) => setName(target.value)} />
        <ButtonGroup style={{ float: 'right' }}>
          <Button
            onClick={() => setEditMode(!editMode)}
            icon="close"
            content="Cancel"
          />
          <Button
            onClick={() => handleSubmit()}
            icon="save"
            color="green"
            content="Save"
          />
        </ButtonGroup>
      </Input>
    </div>
  )
}

export default ProjectHeader
