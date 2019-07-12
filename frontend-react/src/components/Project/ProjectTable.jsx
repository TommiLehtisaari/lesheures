import React, { useState } from 'react'
import { Table } from 'semantic-ui-react'
import ProjectHeader from './ProjectHeader'
import ProjectFooter from './ProjectFooter'
import TaskCell from './TaskCell'

const ProjectTable = ({ projects, project, admin }) => {
  const [editMode, setEditMode] = useState(false)
  return (
    <Table color="green" celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="4">
            <ProjectHeader
              projects={projects}
              project={project}
              admin={admin}
              editMode={editMode}
              setEditMode={setEditMode}
            />
          </Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          {admin && editMode && <Table.HeaderCell>Edit</Table.HeaderCell>}
          <Table.HeaderCell width="5">Tasks of The Project</Table.HeaderCell>
          <Table.HeaderCell>Task Description</Table.HeaderCell>
          <Table.HeaderCell>Color</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {project.tasks.map(task => {
          return (
            <TaskCell
              projects={projects}
              key={task.id}
              task={task}
              editMode={editMode}
            />
          )
        })}
      </Table.Body>
      <ProjectFooter
        projects={projects}
        editMode={editMode}
        project={project}
      />
    </Table>
  )
}

export default ProjectTable
