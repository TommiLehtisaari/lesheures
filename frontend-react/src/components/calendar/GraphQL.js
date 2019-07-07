import { gql } from 'apollo-boost'

export const GET_TASKS = gql`
  {
    allTasks {
      id
      name
      description
      project {
        name
      }
    }
  }
`

export const MY_HOURLOGS = gql`
  query myHourlogs($dateFrom: String!, $dateTo: String!) {
    myHourlogs(dateFrom: $dateFrom, dateTo: $dateTo) {
      id
      hours
      date
      task {
        id
        name
        color
        project {
          id
          name
        }
      }
    }
  }
`

export const CREATE_HOURLOG = gql`
  mutation createHourlog($taskId: String!, $hours: Float!, $date: String!) {
    createHourlog(taskId: $taskId, hours: $hours, date: $date) {
      id
      hours
      date
      task {
        name
        id
        project {
          id
          name
        }
      }
    }
  }
`

export const UPDATE_HOURLOG = gql`
  mutation updateHourlog($id: String!, $hours: Float, $date: String) {
    updateHourlog(id: $id, hours: $hours, date: $date) {
      id
      hours
      date
      task {
        name
        id
        project {
          id
          name
        }
      }
    }
  }
`

export const DELETE_HOURLOG = gql`
  mutation deleteHourlog($id: String!) {
    deleteHourlog(id: $id)
  }
`
