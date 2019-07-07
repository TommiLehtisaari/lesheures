import React from 'react'
import { timeLabel } from '../../utils/labelsFormatter'

const Cell = ({ hourlog }) => {
  const { task, hours } = hourlog
  const color = task.color
  const classes = `ts-cell color-${color}`
  return (
    <div className={classes}>
      <div className="ts-cell-title">
        {task.project.name}
        <i className="fa fa-cog" />
      </div>
      <div className="ts-cell-content">{task.name}</div>
      <div className="ts-cell-time">
        <i className="fa fa-clock-o" />
        {' ' + timeLabel(hours)}
      </div>
    </div>
  )
}

export default Cell
