import React, { useCallback } from 'react'

import './ToDoList.css'
import { ToDoStore } from './ToDoStore'
import { ToDo } from './types'

export const ToDoList = () => {
  const onDelete = useCallback((id: string) => {
    ToDoStore.deleteToDo(id)
  }, [ToDoStore])

  const onEdit = useCallback((todo: ToDo) => {
    const editedContent = prompt('Please enter your name', todo.content)
    ToDoStore.editToDo({ ...todo, content: editedContent ?? '' })
  }, [ToDoStore])

  const onCheck = useCallback((todo: ToDo) => {
    ToDoStore.checkToDo({ ...todo, finished: !todo.finished } as ToDo)
  }, [ToDoStore])

  return (
    <div>
       {ToDoStore.toDoList.map((item: ToDo) => (
        <div key={item.id} className="to-do-item" style={{ backgroundColor: item.finished ? '#00BA88' : '#fff', padding: 10, marginBottom: 10, borderRadius: 6 }}>
          <div className="item-left" style={{ wordBreak: 'break-word' }}>
            <input type="checkbox" className="check-box" onChange={() => { onCheck(item) }}/>
            <p style={{ color: item.finished ? '#fff' : '#000' }}>{item.content}</p>
          </div>
          <div className="toggle-to-do">
            <button onClick={() => onEdit(item)} className="toggle-btn edit-btn">
              <p>Edit</p>
            </button>
            <button onClick={() => onDelete(item.id)} className="toggle-btn">
              <p>Delete</p>
            </button>
          </div>
        </div>
       ))}
    </div>
  )
}
