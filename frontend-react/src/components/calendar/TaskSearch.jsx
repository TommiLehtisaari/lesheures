import React, { useState } from 'react'
import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'
import { Search, Grid, Label } from 'semantic-ui-react'

const TaskSearch = ({ tasks, setTaskId, setDescription }) => {
  const [loading, setLoading] = useState(false)
  const [value] = useState()
  const [results, setResults] = useState([])

  const resultRenderer = ({ name }) => <div>{name}</div>
  const categoryRenderer = ({ name }) => {
    return <Label content={name} />
  }

  const handleResultSelect = (e, { result }) => {
    setTaskId(result.id)
    setDescription(result.description)
  }

  const handleSearchChange = (_, { value }) => {
    setLoading(true)
    setTimeout(() => {
      const searcher = new FuzzySearch(
        tasks.data.allTasks,
        ['name', 'project.name'],
        {
          sort: true
        }
      )
      const result = searcher.search(value)

      const groupBy = result.reduce((accum, task) => {
        const { name } = task.project
        if (!(name in accum)) {
          accum[name] = { name, results: [] }
        }
        accum[name].results = accum[name].results.concat({
          ...task,
          title: task.name
        })
        return accum
      }, {})

      setResults(groupBy)
      setLoading(false)
    }, 500)
  }

  return (
    <Grid>
      <Grid.Column width={8}>
        <Search
          category
          size="large"
          fluid={true}
          loading={loading}
          onResultSelect={handleResultSelect}
          onSearchChange={_.debounce(handleSearchChange, 500, {
            leading: true
          })}
          resultRenderer={resultRenderer}
          categoryRenderer={categoryRenderer}
          results={results}
          value={value}
        />
      </Grid.Column>
    </Grid>
  )
}

export default TaskSearch
