import React from 'react'
import { Icon } from 'semantic-ui-react'
import { colorLabels } from '../../utils/labelsFormatter'

const TaskColor = ({ color, setColor }) => {
  return (
    <div>
      {colorLabels.map(c => {
        return (
          <Icon
            key={c.id}
            size={c.id === color ? 'huge' : 'big'}
            name="square full"
            onClick={() => setColor(c.id)}
            style={{ color: c.color }}
          />
        )
      })}
    </div>
  )
}

export default TaskColor
