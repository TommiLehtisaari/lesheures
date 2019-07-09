import React, { useState } from 'react'
import { Modal, Button, Form } from 'semantic-ui-react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { GET_TASKS, CREATE_HOURLOG } from './GraphQL'
import TaskSearch from './TaskSearch'

import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import moment from 'moment'

const AddHourlogModal = ({ open, setOpen, date, hourlogs }) => {
  const [hours, setHours] = useState(0)
  const [taskId, setTaskId] = useState(null)
  const [description, setDescription] = useState(null)
  const tasks = useQuery(GET_TASKS)
  const createHourlog = useMutation(CREATE_HOURLOG)

  const handleTime = value => {
    if (!value) return setHours(null)
    setHours(value.hours() + value.minutes() / 60)
  }

  const handleSubmit = async () => {
    await createHourlog({
      variables: { hours, taskId, date }
    })
    hourlogs.refetch()
    setTaskId(null)
    setHours(0)
    setDescription(null)
    setOpen(false)
  }

  if (!tasks.data) {
    return null
  }

  return (
    <div>
      <Modal size={'tiny'} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Delete Your Account</Modal.Header>

        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Search for tasks by name</label>
              <TaskSearch
                tasks={tasks}
                setTaskId={setTaskId}
                setDescription={setDescription}
              />
            </Form.Field>
            <Form.Field>
              <label>Hours</label>
              <TimePicker
                onChange={handleTime}
                defaultValue={moment()
                  .hour(0)
                  .minute(0)}
                defaultOpenValue={moment()
                  .hour(0)
                  .minute(0)}
                showSecond={false}
                minuteStep={15}
              />
            </Form.Field>
            {description && (
              <Form.Field>
                <label>Task description</label>
                <div>{description}</div>
              </Form.Field>
            )}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => handleSubmit()}
              icon="save"
              content="Save"
              color="blue"
              disabled={!taskId}
            />
          </Button.Group>
        </Modal.Actions>
      </Modal>
    </div>
  )
}

export default AddHourlogModal
