import React, { useState } from 'react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Table, Icon, Button, ButtonGroup } from 'semantic-ui-react'
import { Input, Dropdown } from 'semantic-ui-react'
import { getColorById, colorLabels } from '../../utils/labelsFormatter'

const UPDATE_TASK = gql`
  mutation updateTask(
    $name: String
    $id: String!
    $color: Int
    $description: String
  ) {
    updateTask(id: $id, name: $name, color: $color, description: $description) {
      id
    }
  }
`

const TaskCell = ({ editMode, task, projects }) => {
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState(task.color)
  const [name, setName] = useState(task.name)
  const [description, setDescription] = useState(task.description)

  const updateTask = useMutation(UPDATE_TASK)

  const handeleSubmit = async () => {
    await updateTask({ variables: { id: task.id, color, name, description } })
    await projects.refetch()
    setOpen(false)
  }

  const dropdownOptions = colorLabels.map(c => {
    return {
      key: c.id,
      value: c.id,
      icon: 'square full',
      text: `color-${c.id}`,
      style: { color: c.color }
    }
  })
  if (open && editMode) {
    return (
      <Table.Row>
        <Table.Cell>
          <ButtonGroup>
            <Button onClick={() => setOpen(false)} icon="close" />
            <Button
              onClick={() => handeleSubmit()}
              content="Save"
              color="green"
            />
          </ButtonGroup>
        </Table.Cell>
        <Table.Cell>
          <Input
            defaultValue={task.name}
            onChange={(_, data) => setName(data.value)}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            defaultValue={task.description}
            onChange={(_, data) => setDescription(data.value)}
          />
        </Table.Cell>
        <Table.Cell>
          <Dropdown
            onChange={(_, data) => setColor(data.value)}
            icon="square full"
            style={{ color: getColorById(color) }}
            options={dropdownOptions}
            selection
            pointing="bottom right"
            defaultValue={task.color}
          />
        </Table.Cell>
      </Table.Row>
    )
  }

  return (
    <Table.Row>
      {editMode && (
        <Table.Cell>
          <Button
            onClick={() => setOpen(true)}
            size="tiny"
            icon="edit"
            color="teal"
            content="Edit"
            labelPosition="left"
          />
        </Table.Cell>
      )}
      <Table.Cell>{task.name}</Table.Cell>
      <Table.Cell>{task.description}</Table.Cell>
      <Table.Cell textAlign="center">
        <Icon
          name="square full"
          size="large"
          style={{ color: getColorById(task.color) }}
        />
      </Table.Cell>
    </Table.Row>
  )
}

export default TaskCell
