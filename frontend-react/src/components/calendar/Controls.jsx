import React from 'react'
import moment from 'moment'

const Controls = ({ selectedModay, setSelectedMonday }) => {
  const label = moment(selectedModay).format('WW - YYYY')
  return (
    <div className="calendar-control">
      <i
        className="fa fa-arrow-left arrow"
        onClick={() => setSelectedMonday(moment(selectedModay).subtract(7, 'days'))}
      />
      <div className="viikko">{`Week ${label}`}</div>
      <i
        className="fa fa-arrow-right arrow"
        onClick={() => setSelectedMonday(moment(selectedModay).add(7, 'days'))}
      />
    </div>
  )
}

export default Controls
