import React from 'react'
import { Form } from 'semantic-ui-react'

const EditProject = ({ project }) => {
  return (
    <Form>
      <Form.Field>
        <input value={project.name} />
      </Form.Field>
    </Form>
  )
}

export default EditProject
