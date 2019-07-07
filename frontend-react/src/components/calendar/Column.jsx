import React from 'react'
import moment from 'moment'
import Cell from './Cell'
import { timeLabel } from '../../utils/labelsFormatter'

const Column = ({ hourlogs, header, setOpen }) => {
  let classes = 'ts-col'
  const total_hours = timeLabel(
    hourlogs.reduce((accum, log) => (accum += log.hours), 0)
  )
  return (
    <React.Fragment>
      <div className="ts-col-container">
        <div className={classes}>
          <div className="ts-col ts-col-head">
            <h4>{moment(header).format('dddd')}</h4>
            {total_hours}
          </div>
          {hourlogs.map((log, key) => {
            return <Cell key={key} hourlog={log} />
          })}
          <div className="ts-col-addbtn">
            <p>
              <i
                className="fa fa-plus-square fa-lg"
                onClick={() => setOpen(true)}
              />
            </p>
          </div>
        </div>
        <div className="ts-col-date">{moment(header).format('ddd D.M.')}</div>
      </div>
    </React.Fragment>
  )
}

export default Column
