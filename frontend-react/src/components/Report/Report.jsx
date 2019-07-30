import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Table } from 'semantic-ui-react'

const ALL_HOURLOGS = gql`
  query {
    allHourlogs {
      user {
        payByHour
      }
      task {
        id
        name
        project {
          id
          name
        }
      }
      hours
      date
    }
  }
`

const Report = () => {
  const hourlogs = useQuery(ALL_HOURLOGS)

  if (!hourlogs.data.allHourlogs) return <p>loading . . . .</p>

  const { allHourlogs } = hourlogs.data

  const projects = allHourlogs.reduce((accum, current) => {
    const { name } = current.task.project
    let project = accum.find(a => a.name === name)

    if (project) {
      project.hourlogs = project.hourlogs.concat(current)
      project.totalHours = project.totalHours += current.hours
      project.totalCost = project.totalCost += current.hours * current.user.payByHour

      return accum.map(a => (a.name !== name ? a : project))
    } else {
      return [
        ...accum,
        {
          name,
          totalCost: current.hours * current.user.payByHour,
          totalHours: current.hours,
          hourlogs: [current]
        }
      ]
    }
  }, [])
  console.log(projects)

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
        {projects.map(p => {
          return (
            <Table.Row key={p.name}>
              <Table.Cell>{p.name}</Table.Cell>
              <Table.Cell>{p.totalHours} h</Table.Cell>
              <Table.Cell>{Math.floor(p.totalCost * 100) / 100} €</Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row style={{ fontWeight: 'Bold' }}>
          <Table.Cell>Total</Table.Cell>
          <Table.Cell>{projects.reduce((a, c) => (a += c.totalHours), 0)} h</Table.Cell>
          <Table.Cell>
            {Math.floor(projects.reduce((a, c) => (a += c.totalCost), 0) * 100) / 100} €
          </Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default Report
