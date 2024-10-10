<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-8 -mt-2">
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Profile</div>
        <p class="m-0 mb-4 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4">
            Modify your personal information and settings.
        </p>
        <Divider />
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
            <div class="grid grid-cols-12 gap-4">
                <div class="mb-4 col-span-12">
                    <label for="username2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Username</label>
                    <InputText id="username2" type="text" class="w-full" v-model="username" />
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="firstName2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">First Name</label>
                    <InputText id="firstName2" type="text" class="w-full" v-model="firstName" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="lastName2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Last Name</label>
                    <InputText id="lastName2" type="text" class="w-full" v-model="lastName" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="emailAddress2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Email Address</label>
                    <InputText id="emailAddress2" type="text" class="w-full" v-model="emailAddress" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="subscribed2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Subscribed</label>
                    <InputText id="subscribed2" type="text" class="w-full" :value="subscribed ? 'Yes' : 'No'" readonly="true"/>
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="col-span-12">
                    <Toast />
                        <ConfirmDialog></ConfirmDialog>
                        <div class="card flex flex-wrap gap-2 justify-left">
                            <Button @click="confirmUpdate(username, emailAddress, firstName, lastName)" label="Save" outlined></Button>
                            <Button @click="goToStripe" label="Manage Subscription" outlined></Button>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import EvrimClient from '~/utils/api';


definePageMeta({
    title: 'Account',
    description: 'Account page of Evrim ',
    requiresAuth: true
})
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";



export default defineComponent({
    data() {
        const userStore = useUserStore();
        return {
            username: userStore.username,
            emailAddress: userStore.emailAddress,
            firstName: userStore.firstName,
            lastName: userStore.lastName,
            subscribed: userStore.isSubscribed,
            client: new EvrimClient(),
            confirm: useConfirm(),
            toast: useToast()
        }
    },
    methods: {
        confirmUpdate(
            username: string| null,
            emailAddress: string | null,
            firstName: string | null,
            lastName: string | null,
        ) {
        this.confirm.require({
            message: 'Are you sure you want to update user information?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Save'
            },
            accept: () => {
                this.client.updatePartialUserInfo(
                    username,
                    emailAddress,
                    firstName,
                    lastName
                ).then((res: { status: number; data: any}) => {
                    if (res.status === 201) {
                        // update user store
                        const userStore = useUserStore();
                        if (username) {
                            userStore.username = username;
                        }
                        if (emailAddress) {
                            userStore.emailAddress = emailAddress;
                        }
                        if (firstName) {
                            userStore.firstName = firstName;
                        }
                        if (lastName) {
                            userStore.lastName = lastName;
                        }
                        // post toast
                        this.toast.add({ severity: 'success', summary: 'Success', detail: 'User information updated.', life: 3000 });
                    }
                }).catch(() => {
                    this.toast.add({ severity: 'error', summary: 'Error', detail: 'Error updating user information.', life: 3000 });
                });
            },
            reject: () => {
                
                this.toast.add({ severity: 'info', summary: 'Canceled', detail: 'User information not updated.', life: 3000 });
            }
        });
    },
    goToStripe() {
        const runtimeConfig = useRuntimeConfig();
        window.open(runtimeConfig.public.STRIPE_MANAGEMENT_URL, '_blank');
    }
    }
})
</script>