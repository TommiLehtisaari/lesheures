import React, { useState } from 'react'
import { useQuery } from 'react-apollo-hooks'
import moment from 'moment'
import { MY_HOURLOGS } from './GraphQL'
import Row from './Row'
import Controls from './Controls'
import AddHourlogModal from './AddHourlogModal'

const Calendar = () => {
  const [selectedModay, setSelectedMonday] = useState(moment('2019-07-08'))
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
      <Controls
        selectedModay={selectedModay}
        setSelectedMonday={setSelectedMonday}
      />
      <Row
        groupedHourlogs={groupedHourlogs}
        setOpen={setOpen}
        setDate={setDate}
      />
      <AddHourlogModal
        open={open}
        setOpen={setOpen}
        date={date}
        hourlogs={hourlogs}
      />
    </React.Fragment>
  )
}

export default Calendar
