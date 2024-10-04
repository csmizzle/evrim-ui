import { defineStore } from "pinia";


interface TaskState {
    task_id: string;
    event: any;
    created_at: string;
    status: string;
    created_by: number;
}


export const useTaskStore = defineStore('tasks', {
    state: () => ({
        tasks: [] as TaskState[],
    }),
    getters: {
        getTasks: (state) => state.tasks,
    },
    actions: {
        logout() {
            this.$reset();
        }
    },
    persist: true
})