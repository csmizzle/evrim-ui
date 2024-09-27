import { defineStore } from 'pinia';


interface UserState {
    userId: number | null;
    isAuthenticated: boolean;
    username: string | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userId: null,
        isAuthenticated: false,
        username: null
    }),
    getters: {
        getUserId: (state) => state.userId,
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUsername: (state) => state.username
    },
    actions: {
        logout() {
            this.userId = null;
            this.isAuthenticated = false;
            this.username = null;
        }
    }
})