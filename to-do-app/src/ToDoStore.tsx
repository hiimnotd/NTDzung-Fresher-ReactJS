import { action, observable, makeObservable } from 'mobx'

import { ToDo } from './types'

export class ToDoStoreImpl {
  toDoList: ToDo[] = []

  constructor () {
    makeObservable(this, {
      toDoList: observable,
      addToDo: action
    })
  }

  addToDo (payload: ToDo) {
    this.toDoList.push(payload)
  }

  deleteToDo (payload: string) {
    this.toDoList = this.toDoList.filter(item => item.id !== payload)
  }

  editToDo = (payload: ToDo) => {
    this.toDoList = this.toDoList.map(item => {
      if (item.id === payload.id) {
        return { ...item, content: payload.content }
      }
      return item
    })
  }

  checkToDo = (payload: ToDo) => {
    this.toDoList = this.toDoList.map(item => {
      if (item.id === payload.id) {
        return { ...item, finished: payload.finished }
      }
      return item
    })
  }
}

export const ToDoStore = new ToDoStoreImpl()
