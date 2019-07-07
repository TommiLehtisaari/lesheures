import React from 'react'
import Column from './Column'

const Row = ({ groupedHourlogs, setOpen, setDate }) => {
  return (
    <div className="flex-container space-evenly">
      {Object.keys(groupedHourlogs).map(key => {
        return (
          <Column
            key={key}
            hourlogs={groupedHourlogs[key]}
            header={key}
            setOpen={setOpen}
            setDate={setDate}
          />
        )
      })}
    </div>
  )
}

export default Row
