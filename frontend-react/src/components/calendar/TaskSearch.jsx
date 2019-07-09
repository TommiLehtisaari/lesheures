import React, { useState, useEffect } from 'react'
import FuzzySearch from 'fuzzy-search'
import _ from 'lodash'
import { Search, Label } from 'semantic-ui-react'

const TaskSearch = ({ tasks, setTaskId, setDescription }) => {
  const [loading, setLoading] = useState(false)
  const [value] = useState()
  const [results, setResults] = useState([])

  useEffect(() => {
    setResults(cathegorise(tasks.data.allTasks))
  }, [tasks.data.allTasks])

  const resultRenderer = ({ name }) => <p>{name}</p>

  const categoryRenderer = ({ name }) => {
    return <Label content={name} />
  }

  const handleResultSelect = (e, { result }) => {
    setTaskId(result.id)
    setDescription(result.description)
  }

  const cathegorise = tasks => {
    return tasks.reduce((accum, task) => {
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

      const groupBy = cathegorise(result)
      setResults(groupBy)
      setLoading(false)
    }, 500)
  }

  return (
    <Search
      fluid
      input={{ fluid: true }}
      minCharacters={0}
      category
      size="small"
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
  )
}

export default TaskSearch
