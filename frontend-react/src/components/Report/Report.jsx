import React, { useState } from 'react'
import { Segment, Button, Label, Menu, Icon, Grid } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
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

  const handleMonthSlider = value => {
    setDateFrom(moment(dateFrom).month(value[0]))
    setDateTo(moment(dateTo).month(value[1]))
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
        <Grid>
          <Grid.Column width="13" textAlign="center">
            <Segment>
              <Label attached="top">
                {moment(dateFrom).format('MMMM YYYY')} - {moment(dateTo).format('MMMM YYYY')}
              </Label>
              <Slider
                multiple
                color="green"
                settings={{
                  start: [0, 11],
                  min: 0,
                  max: 11,
                  step: 1,
                  onChange: value => handleMonthSlider(value)
                }}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column width="3" textAlign="center">
            <Segment>
              <Label attached="top">Select Year</Label>
              <Button.Group size="mini">
                <Button icon="minus" onClick={handleYearDecrement} />
                <Label>{moment(dateFrom).year()}</Label>
                <Button icon="plus" onClick={handleYearIncrement} />
              </Button.Group>
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
      <ReportTable dateFrom={dateFrom} dateTo={dateTo} />
    </div>
  )
}

export default Report
