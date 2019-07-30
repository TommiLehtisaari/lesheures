import React from 'react'
import { Pie } from 'react-chartjs-2'
import { getRandomColor } from '../../utils/labelsFormatter'

const ProjectChart = ({ projects }) => {
  if (!projects.data.allProjects) return <p>loading . . . .</p>

  const { allProjects } = projects.data

  const labels = allProjects.map(p => p.name)
  const dataset = allProjects.map(p => p.hours)
  const backgroundColor = allProjects.map(() => {
    return getRandomColor()
  })

  const data = {
    labels,
    datasets: [
      {
        data: dataset,
        backgroundColor
      }
    ]
  }

  return <Pie data={data} />
}

export default ProjectChart
