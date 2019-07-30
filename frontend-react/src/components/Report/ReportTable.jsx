import React from 'react'
import gql from 'graphql-tag'
import { Table } from 'semantic-ui-react'
import { useQuery } from 'react-apollo-hooks'

const ALL_HOURLOGS = gql`
  query allProjects($dateFrom: String!, $dateTo: String!) {
    allProjects {
      name
      hours(dateFrom: $dateFrom, dateTo: $dateTo)
      cost(dateFrom: $dateFrom, dateTo: $dateTo)
    }
  }
`

const ReportTable = ({ dateFrom, dateTo }) => {
  const projects = useQuery(ALL_HOURLOGS, {
    variables: { dateFrom, dateTo }
  })

  if (!projects.data.allProjects) return <p>loading . . . .</p>

  const { allProjects } = projects.data

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Total Hours</Table.HeaderCell>
          <Table.HeaderCell>Total Costs</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {allProjects.map(p => {
          return (
            <Table.Row key={p.name}>
              <Table.Cell>{p.name}</Table.Cell>
              <Table.Cell>{p.hours} h</Table.Cell>
              <Table.Cell>{p.cost} €</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row style={{ fontWeight: 'Bold' }}>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>{allProjects.reduce((a, c) => (a += c.hours), 0)} h</Table.Cell>
          <Table.Cell>{allProjects.reduce((a, c) => (a += c.cost), 0)} €</Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default ReportTable
