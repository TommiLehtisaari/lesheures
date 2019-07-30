import React, { useState } from 'react'
import { Segment, Button, Label, Menu } from 'semantic-ui-react'
import { Icon } from 'semantic-ui-react'
import moment from 'moment'
import ReportTable from './ReportTable'

const Report = () => {
  const [dateFrom, setDateFrom] = useState(
    moment()
      .startOf('year')
      .format('YYYY-MM-DD')
  )
  const [dateTo, setDateTo] = useState(
    moment()
      .endOf('year')
      .format('YYYY-MM-DD')
  )

  const handleYearDecrement = () => {
    setDateFrom(
      moment(dateFrom)
        .subtract(1, 'year')
        .format('YYYY-MM-DD')
    )
    setDateTo(
      moment(dateTo)
        .subtract(1, 'year')
        .format('YYYY-MM-DD')
    )
  }

  const handleYearIncrement = () => {
    setDateFrom(
      moment(dateFrom)
        .add(1, 'year')
        .format('YYYY-MM-DD')
    )
    setDateTo(
      moment(dateTo)
        .add(1, 'year')
        .format('YYYY-MM-DD')
    )
  }

  return (
    <div>
      <Segment>
        <Menu icon="labeled">
          <Menu.Item>
            <Icon name="table" /> Table
          </Menu.Item>
          <Menu.Item>
            <Icon name="pie chart" />
            Charts
          </Menu.Item>
        </Menu>
        <Button.Group size="mini">
          <Button content="1 - 3 m" />
          <Button content="4 - 6 m" />
          <Button content="7 - 9 m" />
          <Button content="10 - 12 m" />
          <Button content="1 - 6 m" />
          <Button content="6 - 12 m" />
          <Button content="1 - 12 m" />
        </Button.Group>
        <Button.Group floated="right" size="mini">
          <Button icon="minus" onClick={handleYearDecrement} />
          <Label>{moment(dateFrom).year()}</Label>
          <Button icon="plus" onClick={handleYearIncrement} />
        </Button.Group>
      </Segment>
      <ReportTable dateFrom={dateFrom} dateTo={dateTo} />
    </div>
  )
}

export default Report
