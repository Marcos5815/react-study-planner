import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface UpdateTaskType {
    title: string;
    description: string;
    date: string;
}

export interface Task extends UpdateTaskType {
    id: number;
    completed: boolean;
}

interface EditTaskPayload {
    taskId: number;
    updatedTask: UpdateTaskType
}

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<UpdateTaskType>) => {
            const taskWithId: Task = {
                ...action.payload,
                id: Date.now(),
                completed: false,
            };
            state.tasks.push(taskWithId)
        },
        toggleTaskComplete: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id === action.payload)
            if (task) task.completed = !task.completed;
        },
        editTask: (state, action: PayloadAction<EditTaskPayload>) => {
            const {taskId, updatedTask} = action.payload;
            const taskIndex = state.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = {...state.tasks[taskIndex], ...updatedTask}
            }

        },
        deleteTask (state, action: PayloadAction<number>) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        }
    },
});

export const {
    addTask,
    toggleTaskComplete,
    editTask,
    deleteTask
} = taskSlice.actions;

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectPendingTasks = (state: RootState) => state.tasks.tasks.filter((task: Task) => !task.completed);
export const selectCompletedTasks = (state: RootState) => state.tasks.tasks.filter((task: Task)=> task.completed);

export default taskSlice.reducer;