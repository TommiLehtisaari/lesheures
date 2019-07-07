import React from 'react'
import Column from './Column'

const Row = ({ groupedHourlogs, setOpen }) => {
  return (
    <div className="flex-container space-evenly">
      {Object.keys(groupedHourlogs).map(key => {
        return (
          <Column
            key={key}
            hourlogs={groupedHourlogs[key]}
            header={key}
            setOpen={setOpen}
          />
        )
      })}
    </div>
  )
}

export default Row
