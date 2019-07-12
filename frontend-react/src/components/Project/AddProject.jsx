import React, { useState } from 'react'
import { Button, Segment } from 'semantic-ui-react'
import AddForm from './AddForm'

const AddProject = ({ projects }) => {
  const [open, setOpen] = useState(false)

  if (open) {
    return (
      <Segment style={{ marginBottom: '50px' }}>
        <AddForm projects={projects} open={open} setOpen={setOpen} />
      </Segment>
    )
  }

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        style={{ marginBottom: '50px' }}
        icon="add"
        content="Add New Project"
      />
    </div>
  )
}

export default AddProject
