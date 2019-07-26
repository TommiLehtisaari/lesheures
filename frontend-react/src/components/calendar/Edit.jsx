import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'
import moment from 'moment'
import TimePicker from 'rc-time-picker'
import { useMutation } from 'react-apollo-hooks'
import { DELETE_HOURLOG, UPDATE_HOURLOG } from './GraphQL'

const Edit = ({ hourlog, setEdit, refetch }) => {
  const [hours, setHours] = useState(hourlog.hours)

  const deleteHourlog = useMutation(DELETE_HOURLOG)
  const updateHourlog = useMutation(UPDATE_HOURLOG)

  const handleTime = value => {
    if (!value) return setHours(null)
    setHours(value.hours() + value.minutes() / 60)
  }

  const handleDelete = async () => {
    await deleteHourlog({ variables: { id: hourlog.id } })
    refetch.refetch()
    setEdit(false)
  }

  const handleEdit = async () => {
    await updateHourlog({ variables: { id: hourlog.id, hours } })
    setEdit(false)
  }

  return (
    <div>
      <Button as="div" className="center" fluid>
        <TimePicker
          allowEmpty={false}
          onChange={handleTime}
          defaultValue={moment()
            .hours(Math.floor(hours))
            .minutes((hours % 1) * 60)}
          defaultOpenValue={moment()
            .hour(0)
            .minute(0)}
          showSecond={false}
          minuteStep={15}
        />
      </Button>
      <Button.Group size="tiny" fluid>
        <Button
          onClick={() => handleDelete()}
          icon="trash alternate"
          content="Delete"
          color="red"
        />
        <Button onClick={() => handleEdit()} icon="save" content="Save" color="blue" />
      </Button.Group>
    </div>
  )
}

export default Edit
