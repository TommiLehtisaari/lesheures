import React, { useState } from 'react'
import { Table, Label, Input } from 'semantic-ui-react'
import { useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'

const UPDATE_PAY = gql`
  mutation updateUserById($id: String!, $payByHour: Float!) {
    updateUserById(id: $id, payByHour: $payByHour) {
      id
      name
      payByHour
    }
  }
`

const Pay = ({ user, users }) => {
  const [open, setOpen] = useState(false)
  const [pay, setPay] = useState()

  const updatePay = useMutation(UPDATE_PAY)

  const handleSubmit = async () => {
    if (pay) {
      await updatePay({ variables: { id: user.id, payByHour: parseFloat(pay) } })
      await users.refetch()
    }
    setPay(undefined)
    setOpen(false)
  }

  if (open) {
    return (
      <Table.Cell textAlign="center">
        <Input
          action={{
            color: 'teal',
            labelPosition: 'left',
            icon: 'euro',
            content: 'Set pay',
            onClick: () => {
              handleSubmit()
            }
          }}
          onChange={({ target }) => setPay(target.value)}
          actionPosition="left"
          defaultValue={user.payByHour || 0.0}
        />
      </Table.Cell>
    )
  }
  return (
    <Table.Cell textAlign="center">
      <Label onClick={() => setOpen(true)} icon="euro" content={user.payByHour || 0.0} />
    </Table.Cell>
  )
}

export default Pay
