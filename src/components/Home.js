import React, { useState, useRef, useEffect } from 'react'
import { nanoid } from 'nanoid'
import axios from 'axios'
import Todo from './Todo'
import Form from './Form'
import FilterButton from './FilterButton'
import UsePrevious from './UsePrevious'
import ClearButton from './ClearButton'
import ThemeToggler from './ThemeToggler'

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}
const FILTER_NAMES = Object.keys(FILTER_MAP)

export default function App() {
  const [ tasks, setTasks ] = useState([])
  const [ filter, setFilter ] = useState('All')
  const [ theme, setTheme ] = useState('light')

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const toggleTaskCompleted = id => {
    const updatedTasks = tasks.map( task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task
    })
    setTasks(updatedTasks)
  }

  const deleteTask =  id => {
    // using a for loop in place of filter to delete state and storage simultaneously
    //const remainingTasks = tasks.filter(task => id !== task.id)
    const remainingTasks = []
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        window.localStorage.removeItem(JSON.stringify(id))
      } else {
        remainingTasks.push(tasks[i])
      }
    }
    setTasks(remainingTasks)
  }

  const deleteAllTasks = () => {
    setTasks([])
    window.localStorage.clear()
  }

  const addTask = name => {
    if (name.length > 0) {
      setTasks([
        ...tasks,
        {
          id: `todo-${nanoid()}`,
          name,
          completed: false
        }
      ])
    }
  }

  const editTask = (id, newName) => {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }
      return task
    })
    setTasks(editedTaskList);
  }

  const setImportant = id => {
    const editedTaskList = tasks.map(task => {
      if (task.id === id) {
        task.isImportant = !task.isImportant
      }
      return task
    })
    setTasks(editedTaskList)
  }
  
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
        setImportant={setImportant}
        isImportant={task.isImportant}
      />
  ))

  const filterList = FILTER_NAMES.map(name => 
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter}
      setFilter={setFilter}
    />
  )

  const headingText = `${taskList.length} 
  ${taskList.length !== 1 ? 'tasks' : 'task'} remaining`

  const listHeadingRef = useRef(null)
  const prevTaskLength = UsePrevious(tasks.length)

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength])

  // get the tasks
  useEffect(() => {
    // get items and add them to tasks
    if (window.localStorage.length > 0) {
      const storedTasks = []
      for (let i = 0; i < window.localStorage.length; i++) {
        storedTasks.push(
          JSON.parse(window.localStorage.getItem(
            window.localStorage.key(i)
          ))
        )
      }
      // set the tasks
      setTasks(storedTasks)
    } else {
      // if there are no tasks, import sample tasks
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then(objs => {
          const sampleStrings = []
          for (let i = 0; i < 5; i++) {
            sampleStrings.push(objs.data[i].title)
          }
          const sampleTasks = sampleStrings.map(string => {
            return {
              id: `todo-${nanoid()}`,
              name: string,
              completed: false
            }
          })
          setTasks(sampleTasks)
        })
    }
  }, [])

  // set the tasks
  useEffect(() => {
    taskList.forEach(task => {
      window.localStorage.setItem(
        JSON.stringify(task.props.id),
        JSON.stringify(task.props)
      )
    })
  }, [taskList])
  
  return (
    <div className="todoapp stack-large" id={theme}>
      <ThemeToggler toggler={toggleTheme} />      
      <Form addTask={addTask} />
      <ClearButton delete={deleteAllTasks}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}