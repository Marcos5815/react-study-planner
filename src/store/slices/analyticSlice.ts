import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { Task } from "./taskSlice";

interface initialStateTypes {
    totalTasks: number,
    completedTasks: number,
    pendingTasks: number,
    overdueTasks: number,
    completionPercentage: number,

}

const initialState: initialStateTypes = {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    completionPercentage: 0,
}

const analyticSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        updateAnalytics: (state, action: PayloadAction<Task[]>) => {
            const tasks = action.payload;
            const currentDate = new Date();
            currentDate.setHours(23,59,59,999);

            state.totalTasks = tasks.length;
            state.completedTasks = tasks.filter(task=> task.completed).length;
            state.pendingTasks = tasks.filter(task=> !task.completed).length;
            state.overdueTasks = tasks.filter(task => {
                if(task.completed || !task.date) return false;
                const taskDate = new Date(task.date);
                return taskDate < currentDate;
            }).length

            state.completionPercentage = state.totalTasks > 0 ? Math.round((state.completedTasks / state.totalTasks) * 100) : 0; 

        }
    }
});

export const { updateAnalytics} = analyticSlice.actions;
export const selectAnalytics = (state: RootState) => state.analytics;

export default analyticSlice.reducer;