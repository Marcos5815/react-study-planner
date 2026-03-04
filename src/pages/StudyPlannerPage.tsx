import { useEffect, useState } from 'react'
import { selectTheme } from '../store/slices/themeSlice';
import { EmptyState, ThemeToggle } from '../components/UI'
import { AddTaskModal, EditTaskModal } from '../components/Modal'
import { TaskSection } from '../components/Task'
import { useDispatch, useSelector } from 'react-redux'
import { 
  selectCompletedTasks, 
  selectPendingTasks, 
  selectTasks, 
  addTask, 
  toggleTaskComplete, 
  editTask, 
  deleteTask,
  type Task
} from '../store/slices/taskSlice'
import { selectAnalytics, updateAnalytics } from '../store/slices/analyticSlice';

interface newTaskType {
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

interface UpdateTaskType {
  title: string;
  description: string;
  date: string;
}

function StudyPlannerPage() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null)
  const tasks = useSelector(selectTasks);
  const pendingTasks = useSelector(selectPendingTasks)
  const completedTasks = useSelector(selectCompletedTasks)
  const theme = useSelector(selectTheme)
  const analytics = useSelector(selectAnalytics);

  useEffect(() => {
    dispatch(updateAnalytics(tasks))
  }, [tasks, dispatch])

  const handleAddTask = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleAddNewTask = (newTask: newTaskType) => {
    dispatch(addTask(newTask))
  }

  const handleToggleComplete = (taskId: number) => {
    dispatch(toggleTaskComplete(taskId))
  }

  const handleEditTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId)
    setTaskToEdit(task!)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setTaskToEdit(null)
  }

  const handleSaveEditTask = (taskId: number, updatedTask: UpdateTaskType) => {
    dispatch(editTask({ taskId, updatedTask }))
  }

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId))
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: theme.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: theme.backgroundColor
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-purple-header rounded-t-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-icons text-white text-lg">school</span>
              <h1 className="text-white font-medium text-lg">Plano de Estudos</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
        
        <div className={`${theme.cardBg} rounded-b-2xl p-6`}>
          {tasks.length === 0 ? (
            <EmptyState onAddTask={handleAddTask} />
          ) : (
            <div>
              <TaskSection
                title={`Para estudar (${analytics.pendingTasks})`}
                tasks={pendingTasks}
                borderColor="gray-600"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <TaskSection
                title={`Concluído (${analytics.completedTasks})` }
                tasks={completedTasks}
                borderColor="purple-header"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <div className='mt-8'>
                <div className='flex justify-between items-center mb-4'>
                  <div className={`text-sm ${theme.textSecondary}`}>
                    <span>
                        Total de tarefas: {analytics.totalTasks}
                    </span>
                    <span className='ml-3'>
                        Concluído: {analytics.completionPercentage}%
                    </span>
                  </div>
                  {analytics.overdueTasks > 0 && (
                    <div className='text-sm text-red-500 font-semibold'>
                       Atrasadas: {analytics.overdueTasks}
                    </div>
                  )}
                </div>
                  <div className="flex justify-center">
                      <button
                          onClick={handleAddTask}
                          className="w-12 h-12 bg-purple-header hover:bg-purple-dark transition-colors rounded-full flex justify-center items-center"
                          aria-label="Adicionar tarefa"
                      >
                          <span className="material-icons text-white text-xl">add</span>
                      </button>
                  </div>

              </div>
            </div>
          )}
        </div>
        
      </div>
      
      <AddTaskModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTask={handleAddNewTask}
      />
      
      {taskToEdit &&
        <EditTaskModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditTask={handleSaveEditTask}
        task={taskToEdit}
      />}
    </div>
  )
}

export default StudyPlannerPage