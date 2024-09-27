import { useUserStore } from "~/stores/users";
import { navigateTo } from "#app";


export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();

    // Redirect to login page if user is not authenticated
    if (to.meta.requiresAuth && !userStore.isAuthenticated) {
        return navigateTo('/login');
      }
})