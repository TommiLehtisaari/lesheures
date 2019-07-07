import React, { useState } from 'react'
import Edit from './Edit'
import { timeLabel } from '../../utils/labelsFormatter'

const Cell = ({ hourlog, refetch }) => {
  const [edit, setEdit] = useState(false)
  const { task, hours } = hourlog
  const color = task.color
  const classes = `ts-cell color-${color}`
  return (
    <div className={classes}>
      <div className="ts-cell-title">
        {task.project.name}
        <i onClick={() => setEdit(!edit)} className="fa fa-cog" />
      </div>
      {edit && <Edit hourlog={hourlog} setEdit={setEdit} refetch={refetch} />}
      <div className="ts-cell-content">{task.name}</div>
      <div className="ts-cell-time">
        <i className="fa fa-clock-o" />
        {' ' + timeLabel(hours)}
      </div>
    </div>
  )
}

export default Cell
