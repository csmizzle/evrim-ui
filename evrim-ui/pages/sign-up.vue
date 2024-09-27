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
            </div>

            <div>
                <label for ="username1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Username</label>
                <InputText id="username1" type="text" v-model="username" placeholder="Username" class="w-full mb-4" />

                <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Email Address</label>
                <InputText id="email" type="text" v-model="email" placeholder="Email Address" class="w-full mb-4" />

                <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Password</label>
                <InputText id="password" v-model="password" type="password" placehoder="Password" class="w-full mb-4" />

                <label for="firstname1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">First Name</label>
                <InputText id="firstname" type="text" v-model="firstName" placeholder="First Name" class="w-full mb-4" />

                <label for="lastname1" class="text-surface-900 dark:text-surface-0 font-medium mb-2 block">Last Name</label>
                <InputText id="lastname" type="text" v-model="lastName" placeholder="Last Name" class="w-full mb-4" />

                <Button label="Sign In" @click="registerUser" icon="pi pi-user" class="w-full" />
                <div>
                    <Message v-if="registerError" severity="error" text="Error creating user" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import EvrimClient from '~/utils/api';
import { defineComponent } from 'vue';

const userStore = useUserStore();

export default defineComponent({
    data() {
        return {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
            registerError: false,
            client: new EvrimClient()
        }
    },
    methods: {
        registerUser() {
            this.client.register(
                this.username,
                this.password,
                this.email,
                this.firstName,
                this.lastName
            ).then((res: { status: number; data: any; }) => {
                if (res.status === 201) {
                    userStore.userId = res.data.id;
                    userStore.username = this.username;
                    userStore.isAuthenticated = true;
                    this.$router.push('/');
                }
                else {
                    console.log('Login failed');
                    this.registerError = true;
                }
            });
        }
    }
})

</script>