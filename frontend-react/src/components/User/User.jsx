import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Table, Button, Icon, Confirm } from 'semantic-ui-react'
import Loader from '../Loader'
import Pay from './Pay'

const ALL_USERS = gql`
  query {
    allUsers {
      id
      username
      name
      admin
      payByHour
    }
  }
`

const GRANT_ADMIN = gql`
  mutation updateUserById($id: String!, $admin: Boolean) {
    updateUserById(id: $id, admin: $admin) {
      username
      name
      id
      admin
    }
  }
`

const User = () => {
  const [user, setUser] = useState({ name: null })
  const [open, setOpen] = useState(false)

  const users = useQuery(ALL_USERS)
  const grantAdmin = useMutation(GRANT_ADMIN)

  const handleAdminGrant = user => {
    setUser(user)
    setOpen(true)
  }

  const handleCancel = () => {
    setUser({ name: null })
    setOpen(false)
  }

  const handleConfirm = async () => {
    console.log(user)
    await grantAdmin({ variables: { id: user.id, admin: true } })
    await users.refetch()
    setOpen(false)
  }

  if (users.loading) return <Loader />

  return (
    <div className="sideBar-room">
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Admin</Table.HeaderCell>
            <Table.HeaderCell>Pay by Hour</Table.HeaderCell>
            <Table.HeaderCell>Hourlogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.data.allUsers.map(user => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell textAlign="center">
                  {user.admin && <Icon size="large" name="check" color="green" />}
                  {!user.admin && (
                    <Button onClick={() => handleAdminGrant(user)} icon="unlock" size="large" />
                  )}
                </Table.Cell>
                <Pay user={user} users={users} />
                <Table.Cell textAlign="center">
                  <Button icon="clock" content="Hourlogs" />
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      <Confirm
        size="tiny"
        content={`Are you sure you want to make ${user.name} admin?`}
        open={open}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  )
}

export default User
