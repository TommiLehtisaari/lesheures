import React from 'react'
import { NavLink } from 'react-router-dom'
import { Segment, Button, Label, Menu, Icon, Grid } from 'semantic-ui-react'
import { Slider } from 'react-semantic-ui-range'
import moment from 'moment'

const ReportMenu = props => {
  const { dateFrom, dateTo, setDateFrom, setDateTo, match } = props
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
    <Segment>
      <Menu icon="labeled">
        <Menu.Item as={NavLink} to="/report/table" active={match.url === '/report/table'}>
          <Icon name="table" /> Table
        </Menu.Item>
        <Menu.Item as={NavLink} to="/report/chart" active={match.url === '/report/chart'}>
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
  )
}

export default ReportMenu
