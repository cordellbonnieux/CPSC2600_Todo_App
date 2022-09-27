import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

/*
const DATA = [
  { id: "todo-0", name: "Eat", completed: true, isImportant: false },
  { id: "todo-1", name: "Sleep", completed: false, isImportant: false },
  { id: "todo-2", name: "Repeat", completed: false, isImportant: false }
]
*/

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  //<React.StrictMode>
    <App /*tasks={DATA}*/ />
  //</React.StrictMode>
)