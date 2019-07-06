import React from 'react'
import Column from './Column'

const Row = ({ groupedHourlogs }) => {
  return (
    <div className="flex-container space-evenly">
      {Object.keys(groupedHourlogs).map(key => {
        return <Column key={key} hourlogs={groupedHourlogs[key]} header={key} />
      })}
    </div>
  )
}

export default Row
