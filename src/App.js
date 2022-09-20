import React, { useState } from 'react'
import { nanoid } from 'nanoid'
import Todo from './components/Todo'
import Form from './components/Form'
import FilterButton from './components/FilterButton'

export default function App(props) {
  const [ tasks, setTasks ] = useState(props.tasks)

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
    const remainingTasks = tasks.filter(task => id !== task.id)
    setTasks(remainingTasks)
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
    const editedTaskList = tasks.map((task) => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(editedTaskList);
  }
  

  const taskList = tasks.map((task) => (
    <Todo 
      name={task.name} 
      completed={task.completed} 
      id={task.id} 
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))

  const headingText = `${taskList.length} 
  ${taskList.length !== 1 ? 'tasks' : 'task'} remaining`

  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  )
}