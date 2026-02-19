function AddTaskButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 bg-purple-light hover:bg-purple-dark transition-colors rounded-full flex items-center justify-center group"
      aria-label="Adicionar tarefa"
    >
      <span className="material-icons text-white text-xl">add</span>
    </button>
  )
}

export default AddTaskButton