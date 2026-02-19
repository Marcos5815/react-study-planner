import { createContext, useContext, useState } from 'react'

const TaskContext = createContext()

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])

  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      completed: false
    }
    setTasks(prevTasks => [...prevTasks, taskWithId])
  }

  const toggleTaskComplete = (taskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const editTask = (taskId, updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updatedTask }
          : task
      )
    )
  }

  const deleteTask = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId))
  }

  const getPendingTasks = () => tasks.filter(task => !task.completed)
  const getCompletedTasks = () => tasks.filter(task => task.completed)

  const value = {
    tasks,
    addTask,
    toggleTaskComplete,
    editTask,
    deleteTask,
    getPendingTasks,
    getCompletedTasks
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}