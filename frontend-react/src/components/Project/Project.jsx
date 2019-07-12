import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import Loader from '../Loader'
import ProjectTable from './ProjectTable'
import AddProject from './AddProject'

const GET_PROJECTS = gql`
  query allProjects {
    allProjects {
      name
      id
      tasks {
        name
        id
        description
        color
      }
    }
  }
`

const Project = ({ currentUser: { admin } }) => {
  const projects = useQuery(GET_PROJECTS)

  if (projects.loading) return <Loader />

  return (
    <div className="sideBar-room">
      {admin && <AddProject projects={projects} />}
      {projects.data.allProjects.map(p => (
        <ProjectTable
          projects={projects}
          admin={admin}
          key={p.id}
          project={p}
        />
      ))}
    </div>
  )
}

export default Project
