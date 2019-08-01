import React from 'react'
import { Segment, Container, Grid, List } from 'semantic-ui-react'
import { Pie } from 'react-chartjs-2'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { getColorById } from '../../utils/labelsFormatter'
import TimelineBar from './TimelineBar'

const PROJECT_BY_ID = gql`
  query projectById($id: String!, $dateFrom: String, $dateTo: String) {
    projectById(id: $id) {
      name
      cost(dateFrom: $dateFrom, dateTo: $dateTo)
      hours(dateFrom: $dateFrom, dateTo: $dateTo)
      tasks {
        color
        name
        cost(dateFrom: $dateFrom, dateTo: $dateTo)
        hours(dateFrom: $dateFrom, dateTo: $dateTo)
      }
    }
  }
`

const ProjectDashboard = ({ id, dateFrom, dateTo }) => {
  const project = useQuery(PROJECT_BY_ID, { variables: { id, dateFrom, dateTo } })

  const projectById = project.data.projectById || {
    name: 'Placeholder',
    cost: 100,
    hours: 100,
    tasks: [
      { name: 'placeholder0', hours: 300, cost: 10, color: 1 },
      { name: 'placeholder1', hours: 50, cost: 300, color: 2 },
      { name: 'placeholder2', hours: 100, cost: 70, color: 3 }
    ]
  }

  const labels = projectById.tasks.map(t => t.name)
  const hours = projectById.tasks.map(t => t.hours)
  const backgroundColor = projectById.tasks.map(t => {
    return getColorById(t.color)
  })

  const hourData = {
    labels,
    datasets: [
      {
        data: hours,
        backgroundColor
      }
    ]
  }

  return (
    <Container>
      <Grid>
        <Grid.Column width="6">
          <Segment>
            <h4>{projectById.name}</h4>
            <List>
              {projectById.tasks.map(t => {
                return (
                  <List.Item key={t.name}>
                    <List.Icon name="clock outline" verticalAlign="middle" size="large" />
                    <List.Content>
                      <List.Header>{t.name}</List.Header>
                      <List.Description>{t.hours} h</List.Description>
                    </List.Content>
                  </List.Item>
                )
              })}
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column width="10">
          <Segment>
            <Pie
              data={hourData}
              options={{
                legend: { display: true, position: 'left' },
                title: { display: true, text: 'Project Hours by Tasks' }
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          <Segment>
            <TimelineBar id={id} dateFrom={dateFrom} dateTo={dateTo} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ProjectDashboard
