<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
const checked1 = ref(true);

definePageMeta({
    title: 'Login',
    description: 'Login page of Evrim',
    requiresAuth: false,
    layout: false
})

</script>

<template>
    <div class="bg-auto dark:bg-auto px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-auto dark:bg-surface-900 p-6 shadow-xl rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-8">
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Evrim</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Don't have an account?</span>
                <nuxt-link class="font-medium no-underline ml-2 text-primary cursor-pointer" href="/sign-up">Sign up</nuxt-link>
            </div>

            <div>
                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Username</label>
                <InputText id="username1" type="text" v-model="username" placeholder="Username" class="w-full mb-4" />

                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <InputText id="password1" v-model="password" type="password" placehoder="Password" @keyup.enter="loginUser" class="w-full mb-4" />

                <Button :label="loading ? '      ' : 'Sign In'" @click="loginUser" icon="pi pi-user" class="w-full flex-shrink-0" :disabled="loading" style="min-width: 100px;" outlined>
                    <template #icon>
                        <ProgressSpinner v-if="loading" style="width: 20px; height: 20px;" strokeWidth="4"/>
                    </template>
                </Button>
                <div v-if="loginError" class="text-red-500 text-center mt-4">Invalid username or password</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import EvrimClient from '~/utils/api';
import { defineComponent } from 'vue';
import { useNuxtApp } from '#app'

// get the pinia object for the user store
export default defineComponent({
    data() {
        return {
            username: '',
            password: '',
            loginError: false,
            loading: false,
            client: new EvrimClient()
        }
    },
    methods: {
        loginUser() {
            this.loading = true;
            const nuxtApp = useNuxtApp()
            const userStore = useUserStore(nuxtApp.$pinia);
            this.client.login(this.username, this.password).then((res: { status: number; data: any}) => {
                if (res.status === 200) {
                    this.client.getTokens(
                        this.username,
                        this.password
                    ).then((res: { status: number; data: any}) => {
                        if (res.status === 200) {
                            this.client.getUserInfo().then((userResponse: { status: number; data: any}) => {
                                if (userResponse.status === 200) {
                                    userStore.emailAddress = userResponse.data.email;
                                    userStore.firstName = userResponse.data.first_name;
                                    userStore.lastName = userResponse.data.last_name;
                                    userStore.accessToken = res.data.access;
                                    userStore.refreshToken = res.data.refresh;
                                    userStore.userId = res.data.id;
                                    userStore.username = this.username;
                                    userStore.isAuthenticated = true;
                                    userStore.isSubscribed = res.data.subscribed;
                                    this.loginError = false;
                                    this.$router.push('/');
                                    this.loading = false;
                                }
                            }).catch(() => {
                                this.loginError = true;
                                this.loading = false;
                            });
                        }
                    }).catch(() => {
                        this.loginError = true;
                        this.loading = false;
                    });
                }
            }).catch(() => {
                this.loginError = true;
                this.loading = false;
            });
        }
    }
})

</script>