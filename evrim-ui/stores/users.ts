import { defineStore } from 'pinia';


interface UserState {
    userId: number | null;
    isAuthenticated: boolean;
    username: string | null;
    isSubscribed: boolean;
    accessToken: string;
    refreshToken: string;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userId: null,
        isAuthenticated: false,
        username: null,
        isSubscribed: false,
        accessToken: '',
        refreshToken: '',
    }),
    getters: {
        getUserId: (state) => state.userId,
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUsername: (state) => state.username,
        getIsSubscribed: (state) => state.isSubscribed,
        getAccessToken: (state) => state.accessToken,
        getRefreshToken: (state) => state.refreshToken,
    },
    actions: {
        logout() {
            this.userId = null;
            this.isAuthenticated = false;
            this.username = null;
            this.isSubscribed = false;
            this.accessToken = '';
            this.refreshToken = '';
        }
    },
    persist: true
})