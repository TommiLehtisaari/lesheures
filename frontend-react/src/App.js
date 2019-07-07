import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import Calendar from './components/Calendar'

import './App.css'

const GET_PROJECTS = gql`
  query allProjects {
    allProjects {
      name
      id
      tasks {
        name
        id
        description
      }
    }
  }
`

function App() {
  const projects = useQuery(GET_PROJECTS)
  return (
    <div className="App">
      {/* <img src={logo} className="App-logo" alt="logo" /> */}
      <Calendar projects={projects} />
    </div>
  )
}

export default App
