import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import moment from 'moment'

const GET_HOURLOGS = gql`
  query allHourlogs($dateFrom: String, $dateTo: String) {
    allHourlogs(dateFrom: $dateFrom, dateTo: $dateTo) {
      hours
      date
    }
  }
`

const PROJECT_HOURLOGS = gql`
  query projectById($id: String!, $dateFrom: String, $dateTo: String) {
    projectById(id: $id) {
      hourlogs(dateFrom: $dateFrom, dateTo: $dateTo) {
        date
        hours
      }
    }
  }
`

const TimelineBar = ({ dateTo, dateFrom, id }) => {
  const query_string = id ? PROJECT_HOURLOGS : GET_HOURLOGS
  const query = useQuery(query_string, { variables: { id, dateFrom, dateTo } })
  const dataString = id ? 'projectById' : 'allHourlogs'

  const data = query.data[dataString] ? query.data[dataString] : [{ date: dateFrom, hours: 0 }]

  const hourlogs = id ? data.hourlogs : data

  let firstMonth = moment(dateFrom).month()
  let lastMonth = moment(dateTo).month()
  const months = {}
  while (firstMonth <= lastMonth) {
    months[firstMonth] = {
      name: moment()
        .month(firstMonth)
        .format('MMMM'),
      hours: 0
    }
    firstMonth++
  }

  if (hourlogs) {
    hourlogs.forEach(log => {
      const date = moment(log.date).month()
      months[date].hours = months[date].hours + log.hours
    })
  }

  const groupByMonth = Object.values(months)

  const labels = groupByMonth.map(p => p.name)
  const hours = groupByMonth.map(p => p.hours)

  const timelineData = {
    labels,
    datasets: [
      {
        data: hours,
        backgroundColor: '#4287f555'
      }
    ]
  }

  return (
    <Bar
      data={timelineData}
      options={{
        legend: { display: false },
        title: {
          display: true,
          text: `Hours logged during ${moment(dateFrom).format('MMMM YYYY')} - ${moment(
            dateTo
          ).format('MMMM YYYY')}`
        }
      }}
    />
  )
}

export default TimelineBar
