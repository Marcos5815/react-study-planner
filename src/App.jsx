import { TaskProvider } from './contexts/TaskContext'
import { ThemeProvider } from './contexts/ThemeContext'
import StudyPlannerPage from './pages/StudyPlannerPage'

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <StudyPlannerPage />
      </TaskProvider>
    </ThemeProvider>
  )
}

export default App