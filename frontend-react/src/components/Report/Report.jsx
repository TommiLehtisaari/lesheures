import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Switch, Route } from 'react-router-dom'
import moment from 'moment'
import ReportMenu from './ReportMenu'
import ReportTable from './ReportTable'
import ProjectChart from './ProjectChart'

const ALL_PROJECTS = gql`
  query allProjects($dateFrom: String!, $dateTo: String!) {
    allProjects {
      name
      hours(dateFrom: $dateFrom, dateTo: $dateTo)
      cost(dateFrom: $dateFrom, dateTo: $dateTo)
    }
  }
`

const Report = ({ match }) => {
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

  const projects = useQuery(ALL_PROJECTS, {
    variables: { dateFrom, dateTo }
  })

  return (
    <div>
      <ReportMenu
        dateFrom={dateFrom}
        dateTo={dateTo}
        setDateFrom={setDateFrom}
        setDateTo={setDateTo}
        match={match}
      />
      <Switch>
        <Route path="/report/table" render={() => <ReportTable projects={projects} />} />
        <Route path="/report/chart" render={() => <ProjectChart projects={projects} />} />
      </Switch>
    </div>
  )
}

export default Report
