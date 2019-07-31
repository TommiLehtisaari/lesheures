import React from 'react'
import { Grid, Segment, Container } from 'semantic-ui-react'
import { Pie, Bar } from 'react-chartjs-2'
import { getRandomColor } from '../../utils/labelsFormatter'

const ReportChart = ({ projects }) => {
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
    console.log(e[0]._index)
    console.log(allProjects[e[0]._index])
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

  return (
    <Container>
      <Grid>
        <Grid.Column width="8">
          <Segment>
            <Pie
              data={hourData}
              onElementsClick={e => handlePieClick(e)}
              options={{
                legend: { display: false },
                title: { display: true, text: 'Hours used by Project' }
              }}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column width="8">
          <Segment>
            <Pie
              data={costData}
              onElementsClick={e => handlePieClick(e)}
              options={{
                legend: { display: false },
                title: { display: true, text: 'Costs by Project' }
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          <Segment>
            <Bar
              data={hourData}
              onElementsClick={e => handlePieClick(e)}
              options={{
                legend: { display: false },
                title: { display: true, text: 'Hours used by Project' }
              }}
            />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default ReportChart
