<script setup lang="ts">
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';
const checked1 = ref(true);

</script>

<template>
    <div class="bg-auto dark:bg-auto px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-auto dark:bg-surface-900 p-6 shadow-xl rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-8">
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Evrim</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Don't have an account?</span>
                <a class="font-medium no-underline ml-2 text-primary cursor-pointer" href="/sign-up">Sign up</a>
            </div>

            <div>
                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Username</label>
                <InputText id="username1" type="text" v-model="username" placeholder="Username" class="w-full mb-4" />

                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <InputText id="password1" v-model="password" type="password" placehoder="Password" @keyup.enter="loginUser" class="w-full mb-4" />

                <div class="flex items-center justify-between mb-12">
                    <div class="flex items-center">
                        <Checkbox id="rememberme1" v-model="checked1" :binary="true" class="mr-2" />
                        <label for="rememberme1">Remember me</label>
                    </div>
                    <a class="font-medium no-underline ml-2 text-primary text-right cursor-pointer">Forgot password?</a>
                </div>
                <Button label="Sign In" @click="loginUser" icon="pi pi-user" class="w-full" />
                <div>
                    <Message v-if="loginError" severity="error" text="Invalid username or password" />
                </div>
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
            client: new EvrimClient()
        }
    },
    methods: {
        loginUser() {
            const nuxtApp = useNuxtApp()
            const userStore = useUserStore(nuxtApp.$pinia);
            this.client.login(this.username, this.password).then((res: { status: number; data: any}) => {
                if (res.status === 200) {
                    userStore.userId = res.data.id;
                    userStore.username = this.username;
                    userStore.isAuthenticated = true;
                    this.loginError = false;
                    this.$router.push('/');
                }
                if (res.status === 401) {
                    console.log('Login failed');
                    this.loginError = true;
                }
            });
        }
    }
})

</script>