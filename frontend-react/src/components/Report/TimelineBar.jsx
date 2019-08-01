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

const TimelineBar = ({ dateTo, dateFrom }) => {
  const query = useQuery(GET_HOURLOGS, { variables: { dateFrom, dateTo } })
  const hourlogs = query.data.allHourlogs

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
