import React from 'react'
import { timeLabel } from '../../utils/labelsFormatter'

const Header = ({ currentUser, hourlogs }) => {
  const weekly_hours = hourlogs.loading
    ? 'loading...'
    : hourlogs.data.myHourlogs.reduce((accum, log) => {
        return (accum += log.hours)
      }, 0)

  return (
    <div className="ts-info-container">
      <div className="ts-info-box">{currentUser.name}</div>
      <div className="ts-info-box ts-float-right">
        <p>{timeLabel(weekly_hours)}</p>
        <span>Hours this week</span>
      </div>
    </div>
  )
}

export default Header
