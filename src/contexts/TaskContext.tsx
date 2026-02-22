import { createContext, useContext, useState } from 'react'

export interface Task {
  id: number,
  title: string,
  completed: boolean
  description: string;
  date: string;
}

interface UpdateTaskType {
  title: string;
  description: string;
  date: string;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTaskComplete: (taskId: number) => void;
  editTask: (taskId: number, updatedTask: UpdateTaskType) => void;
  deleteTask: (taskId: number) => void;
  getPendingTasks: () => Task[];    // Added return types here too
  getCompletedTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | null>(null)

export function TaskProvider({ children }: {children: React.ReactNode}) {
  const [tasks, setTasks] = useState<Task[]>([])

  const addTask = (title: string) => {
    const taskWithId: Task = {
      title,
      id: Date.now(),
      completed: false,
      description: '',
      date: Date.now().toLocaleString('pt-BR')
    }
    setTasks(prevTasks => [...prevTasks, taskWithId])
  }

  const toggleTaskComplete = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  const editTask = (taskId: number, updatedTask: UpdateTaskType) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? { ...task, ...updatedTask }
          : task
      )
    )
  }

  const deleteTask = (taskId: number) => {
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
  if (context === undefined || !context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}