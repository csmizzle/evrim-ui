<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import { ref } from 'vue';

const checked1 = ref(true);

definePageMeta({
    title: 'Sign Up',
    description: 'Sign up page of Evrim',
    requiresAuth: false,
    layout: false
})
</script>

<template>
    <div class="bg-auto dark:bg-auto px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-auto dark:bg-surface-900 p-6 shadow-xl rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-8">
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Evrim</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Already have an account?</span>
                <nuxt-link class="font-medium no-underline ml-2 text-primary cursor-pointer" href="/login">Login</nuxt-link>
            </div>

            <div>
                <label for="firstname1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">First Name</label>
                <InputText id="firstname" type="text" v-model="firstName" placeholder="First Name" class="w-full mb-4" />

                <label for="lastname1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Last Name</label>
                <InputText id="lastname" type="text" v-model="lastName" placeholder="Last Name" class="w-full mb-4" />

                <label for ="username1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Username</label>
                <InputText id="username1" type="text" v-model="username" placeholder="Username" class="w-full mb-4" />

                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Email Address</label>
                <InputText id="email" type="text" v-model="email" placeholder="Email Address" class="w-full mb-4" />

                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <InputText id="password" v-model="password" type="password" placehoder="Password" @keyup.enter="registerUser" class="w-full mb-4" />

                <Button :label="loading ? '      ' : 'Sign Up'" @click="registerUser" icon="pi pi-user" class="w-full flex-shrink-0" :disabled="loading" style="min-width: 100px;" outlined>
                    <template #icon>
                        <ProgressSpinner v-if="loading" style="width: 20px; height: 20px;" strokeWidth="4"/>
                    </template>
                </Button>
                <div v-if="registerError" class="text-red-500 text-center mt-4">Please review registration form</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import EvrimClient from '~/utils/api';
import { defineComponent } from 'vue';
import { useNuxtApp } from '#app'

export default defineComponent({
    data() {
        return {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            registerError: false,
            loading: false,
            client: new EvrimClient()
        }
    },
    methods: {
        registerUser() {
            this.loading = true;
            const nuxtApp = useNuxtApp()
            const userStore = useUserStore(nuxtApp.$pinia);
            this.client.register(
                this.username,
                this.password,
                this.email,
                this.firstName,
                this.lastName
            ).then((res: { status: number; data: any; }) => {
                if (res.status === 201) {
                    userStore.userId = res.data.id;
                    // login user
                    this.client.login(
                        this.username,
                        this.password
                    ).then((res: { data: any; }) => {
                        // set tokens
                        userStore.accessToken = res.data.access;
                        userStore.refreshToken = res.data.refresh;
                        // set user details
                        userStore.username = this.username;
                        userStore.isAuthenticated = true;
                        // redirect to home
                        this.$router.push('/');
                        this.loading = false;
                    })
                }
            }).catch(() => {
                this.registerError = true;
                this.loading = false;
            })
        }
    }
})

</script>