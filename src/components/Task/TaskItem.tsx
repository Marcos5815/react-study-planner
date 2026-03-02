import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/themeSlice';
export interface Task {
  id: number;
  title: string;
  completed: boolean;
  description: string;
  date: string;
}


interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: number) => void;
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
}

function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const theme = useSelector(selectTheme)
  const handleToggle = () => {
    onToggleComplete(task.id)
  }

  return (
    <div className="flex items-center gap-3 py-2">
      <button
        onClick={handleToggle}
        className="flex-shrink-0 w-5 h-5 rounded border-2 border-gray-400 flex items-center justify-center hover:border-green-check transition-colors"
        style={{
          backgroundColor: task.completed ? '#CAFF59' : 'transparent',
          borderColor: task.completed ? '#CAFF59' : '#9CA3AF'
        }}
      >
        {task.completed && (
          <span className="material-icons text-black text-sm">check</span>
        )}
      </button>
      
      <div className="flex-grow">
        <div className={`${theme.textSecondary} text-xs mb-1`}>{task.date}</div>
        <div 
          className={`${theme.textPrimary} ${task.completed ? 'line-through opacity-60' : ''}`}
        >
          {task.title}
        </div>
        {task.description && (
          <div 
            className={`${theme.textMuted} text-sm mt-1 ${task.completed ? 'line-through opacity-60' : ''}`}
          >
            {task.description}
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(task.id)}
          className={`material-icons ${theme.textMuted} hover:${theme.textPrimary.replace('text-', 'text-')} transition-colors text-sm`}
        >
          edit
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className={`material-icons ${theme.textMuted} hover:text-red-400 transition-colors text-sm`}
        >
          delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem