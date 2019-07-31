import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import moment from 'moment'
import { MY_HOURLOGS } from './GraphQL'
import Row from './Row'
import Controls from './Controls'
import Header from './Header'
import AddHourlogModal from './AddHourlogModal'

const Calendar = ({ currentUser }) => {
  const [selectedModay, setSelectedMonday] = useState(
    moment()
      .startOf('week')
      .add(1, 'day')
  )
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState(null)

  const hourlogs = useQuery(MY_HOURLOGS, {
    variables: {
      dateFrom: selectedModay,
      dateTo: moment(selectedModay).add(5, 'days')
    }
  })

  const getDayFormat = day => {
    return moment(selectedModay)
      .add(day, 'days')
      .format('YYYY-MM-DD')
  }

  const groupedHourlogs = {
    [getDayFormat(0)]: [],
    [getDayFormat(1)]: [],
    [getDayFormat(2)]: [],
    [getDayFormat(3)]: [],
    [getDayFormat(4)]: []
  }

  if (!hourlogs.loading) {
    hourlogs.data.myHourlogs.forEach(hourlog => {
      groupedHourlogs[moment(hourlog.date).format('YYYY-MM-DD')].push(hourlog)
    })
  }

  return (
    <React.Fragment>
      <Header currentUser={currentUser} hourlogs={hourlogs} />
      <Controls selectedModay={selectedModay} setSelectedMonday={setSelectedMonday} />
      <Row
        groupedHourlogs={groupedHourlogs}
        setOpen={setOpen}
        setDate={setDate}
        refetch={hourlogs}
      />
      <AddHourlogModal open={open} setOpen={setOpen} date={date} hourlogs={hourlogs} />
    </React.Fragment>
  )
}

export default Calendar
