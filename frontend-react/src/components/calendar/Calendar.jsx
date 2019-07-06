import React from 'react'
import _ from 'lodash'
import Row from './Row'

const Calendar = ({ hourlogs }) => {
  //const [selectedModay, setSelectedMonday] = useState(moment('2019-07-08'))

  const groupedHourlogs = _.groupBy(hourlogs, function(log) {
    return log.date
  })

  return (
    <React.Fragment>
      <Row groupedHourlogs={groupedHourlogs} />
    </React.Fragment>
  )
}

export default Calendar
