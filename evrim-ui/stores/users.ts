import { defineStore } from 'pinia';


interface UserState {
    userId: number | null;
    isAuthenticated: boolean;
    username: string | null;
    firstName: string;
    lastName: string;
    emailAddress: string;
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
        emailAddress: '',
        firstName: '',
        lastName: '',
        accessToken: '',
        refreshToken: '',
    }),
    getters: {
        getUserId: (state) => state.userId,
        getIsAuthenticated: (state) => state.isAuthenticated,
        getUsername: (state) => state.username,
        getIsSubscribed: (state) => state.isSubscribed,
        getFirstName: (state) => state.firstName,
        getLastName: (state) => state.lastName,
        getAccessToken: (state) => state.accessToken,
        getRefreshToken: (state) => state.refreshToken,
        getEmailAddress: (state) => state.emailAddress,
    },
    actions: {
        logout() {
            this.$reset();
        }
    },
    persist: true
})