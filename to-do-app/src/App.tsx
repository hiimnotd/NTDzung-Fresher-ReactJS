import { observer } from 'mobx-react'
import React, { useCallback, useState } from 'react'
import nextId from 'react-id-generator'

import './App.css'
import { ToDoList } from './ToDoList'
import { ToDoStore } from './ToDoStore'
import { ToDo } from './types'

const ToDoListObserver = observer(ToDoList)

function App () {
  const [toDo, setToDo] = useState<string>('')

  const onChangeText = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setToDo(event.currentTarget.value)
  }, [])

  console.log('🚀 ~ file: ToDoList.tsx ~ line 15 ~ onEdit ~ ToDoStore', ToDoStore.toDoList[0])

  const onAddToDo = useCallback(() => {
    if (toDo.length > 0) {
      // setToDoList(list => list.concat({
      //   id: nextId(),
      //   content: toDo,
      // } as ToDo))
      ToDoStore.addToDo({
        id: nextId(),
        content: toDo,
        finished: false,
      } as ToDo)
      setToDo('')
    }
  }, [toDo])

  return (
    <div className="wrapper">
      <p className="title">To Do App</p>
        <div className="add-field">
          <input className="input-text" value={toDo} placeholder="Add To do" type="text" name="email" onChange={onChangeText}/>
          <button className="add-button" onClick={onAddToDo}>
            <p>Add</p>
          </button>
        </div>
        <ToDoListObserver/>
      </div>
  )
}

export default App
