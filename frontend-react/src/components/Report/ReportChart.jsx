import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Grid, Segment, Container } from 'semantic-ui-react'
import { Pie } from 'react-chartjs-2'
import { getRandomColor } from '../../utils/labelsFormatter'
import TimelineBar from './TimelineBar'

const ReportChart = props => {
  const { projects, dateFrom, dateTo } = props
  const [redirect, setRedirect] = useState(undefined)
  // Placeholders are important for stable rendering
  const allProjects = projects.data.allProjects || [
    { name: 'placeholder', hours: 300 },
    { name: 'placeholder', hours: 50 },
    { name: 'placeholder', hours: 100 }
  ]

  const labels = allProjects.map(p => p.name)
  const hours = allProjects.map(p => p.hours)
  const cost = allProjects.map(p => p.cost)
  const backgroundColor = allProjects.map(() => {
    return getRandomColor()
  })

  const handlePieClick = e => {
    if (e[0]) setRedirect(allProjects[e[0]._index].id)
  }

  const hourData = {
    labels,
    datasets: [
      {
        data: hours,
        backgroundColor
      }
    ]
  }

  const costData = {
    labels,
    datasets: [
      {
        data: cost,
        backgroundColor
      }
    ]
  }

  if (redirect) {
    return <Redirect to={`/report/project/${redirect}`} />
  }

  return (
    <Container>
      <Grid>
        <Grid.Column width="9">
          <Segment>
            <Pie
              data={hourData}
              onElementsClick={e => handlePieClick(e)}
              options={{
                legend: { position: 'left' },
                title: { display: true, text: 'Hours used by Project' }
              }}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width="7">
          <Segment>
            <Pie
              data={costData}
              onElementsClick={e => handlePieClick(e)}
              options={{
                legend: { display: false },
                title: { display: true, text: 'Costs in euros by Project' }
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          <Segment>
            <TimelineBar dateFrom={dateFrom} dateTo={dateTo} />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ReportChart
