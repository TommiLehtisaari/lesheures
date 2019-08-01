import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { Switch, Route } from 'react-router-dom'
import moment from 'moment'
import ReportMenu from './ReportMenu'
import ReportTable from './ReportTable'
import ReportChart from './ReportChart'
import ProjectDashboard from './ProjectDashboard'

const ALL_PROJECTS = gql`
  query allProjects($dateFrom: String!, $dateTo: String!) {
    allProjects {
      name
      id
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
        <Route
          path="/report/chart"
          render={() => <ReportChart dateFrom={dateFrom} dateTo={dateTo} projects={projects} />}
        />
        <Route
          path="/report/project/:id"
          render={({ match }) => (
            <ProjectDashboard id={match.params.id} dateFrom={dateFrom} dateTo={dateTo} />
          )}
        />
      </Switch>
    </div>
  )
}

export default Report
