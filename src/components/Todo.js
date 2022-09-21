import React, { useState, useRef, useEffect } from 'react'
import UsePrevious from './UsePrevious'

export default function Todo(props) {
  const { name, completed, id, toggleTaskCompleted, deleteTask, editTask, setImportant, isImportant } = props
  const [ isEditing, setEditing ] = useState(false)
  const [ newName, setNewName ] = useState('')
  const editFieldRef = useRef(null)
  const editButtonRef = useRef(null)
  const wasEditing = UsePrevious(isEditing)

  const importantStyles = {fontSize: 2 + 'rem', textDecoration: 'underline', color: 'red'}

  const handleChange = e => setNewName(e.target.value)

  const handleSubmit = e => {
    e.preventDefault()
    editTask(id, newName)
    setNewName('')
    setEditing(false)
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="todo-label" htmlFor={id}>
          New name for {name}
        </label>
        <input 
          id={id} 
          className="todo-text" 
          type="text" 
          value={newName}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button
          type="button"
          className="btn todo-cancel"
          onClick={() => setEditing(false)}
        >
          Cancel
          <span className="visually-hidden">renaming {name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          Save
          <span className="visually-hidden">new name for {name}</span>
        </button>
      </div>
    </form>
  )

  const viewTemplate = (
    <div className="stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(id)}
        />
        <label className="todo-label" htmlFor={id} style={isImportant ? importantStyles : null}>
          {props.name}
        </label>
      </div>
        <div className="btn-group">
          <button 
            type="button" 
            className="btn" 
            onClick={() => setEditing(true)}
            ref={editButtonRef}
          >
            Edit <span className="visually-hidden">{name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.deleteTask(id)}
          >
            Delete <span className="visually-hidden">{name}</span>
          </button>
          <button 
            type="button" 
            className="btn" 
            onClick={e => setImportant(id)}
          >
            Important <span className="visually-hidden">{name}</span>
          </button>
        </div>
    </div>
  )

  useEffect(() => {
    if (isEditing && !wasEditing) {
      editFieldRef.current.focus()
    }
    if (!isEditing && wasEditing) {
      editButtonRef.current.focus()
    }
  }, [isEditing, wasEditing])

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
}
