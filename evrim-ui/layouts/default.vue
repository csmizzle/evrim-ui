<template>
 <div class="min-h-screen flex relative lg:static bg-surface-50 dark:bg-surface-950">
        <div id="app-sidebar-9" class="h-screen bg-surface-0 dark:bg-surface-950 hidden lg:block flex-shrink-0 absolute lg:static left-0 top-0 z-10 border-r border-surface w-72 lg:w-16 select-none">
            <div class="flex flex-col h-full">
                <div class="flex items-center justify-center flex-shrink-0 h-[60px]">
                    <img src="@/assets/images/logo.png" style="width: 36px; height: 36px; max-width: 36px; max-height: 36px; object-fit: contain;"/>
                </div>
                <div class="mt-4">
                    <ul class="list-none p-0 m-0">
                        <li>
                            <a
                                class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-primary-emphasis border-l-2 border-primary-emphasis hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                                style="color: white !important;"
                                href="/"
                            >
                                <i 
                                    class="pi pi-home mr-2 lg:mr-0 !text-white lg:!text-2xl leading-none"
                                    style="color: white !important;"
                                />
                                <span class="font-medium inline !text-white lg:text-xs lg:hidden">Home</span>
                            </a>
                        </li>
                        <li class="relative">
                            <a
                                v-styleclass="{
                                    selector: '@next',
                                    enterFromClass: 'hidden',
                                    leaveToClass: 'hidden',
                                    hideOnOutsideClick: true
                                }"
                                class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                                href="/reports"
                            >
                                <i class="pi pi-book !text-white lg:!text-2xl leading-none" style="color: white !important;"/>
                                <span class="font-medium inline !text-white lg:text-xs lg:hidden">Reports</span>
                            </a>
                        </li>
                        <li>
                            <a
                                class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                                href="/account"
                            >
                                <i class="pi pi-cog mr-2 lg:mr-0 !text-white lg:!text-2xl leading-none" style="color: white !important;"/>
                                <span class="font-medium inline !text-white lg:text-xs lg:hidden">Account</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="mt-auto">
                    <hr class="mx-4 border-t border-0 border-surface" />
                    <a
                        @click="logOut" class="my-4 flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center text-surface-600 dark:text-surface-200 border-l-2 border-transparent hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                    >
                        <i class="pi  pi-sign-out mr-2 lg:mr-0 !text-white lg:!text-2xl leading-none" style="color: white !important;"/>
                        <span class="font-medium inline lg:hidden" >Sign Out</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="min-h-screen flex flex-col relative flex-auto" v-if="subscribed() === true">
            <div class="h-[60px] flex justify-between items-center px-8 bg-surface-0 dark:bg-surface-950 relative lg:static border-b border-surface">
                <div class="flex">
                    <a
                        v-styleclass="{
                            selector: '#app-sidebar-9',
                            enterFromClass: 'hidden',
                            enterActiveClass: 'animate-fadeinleft',
                            leaveToClass: 'hidden',
                            leaveActiveClass: 'animate-fadeoutleft',
                            hideOnOutsideClick: true
                        }"
                        class="cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 mr-4 mt-1"
                    >
                        <i class="pi pi-bars text-4xl " />
                    </a>
                    <IconField icon-position="left">
                        <InputIcon class="pi pi-search text-surface-700 dark:text-surface-100" />
                        <InputText type="text" class="border-0 w-40 sm:w-80" placeholder="Search" />
                    </IconField>
                </div>
                <a
                    v-styleclass="{
                        selector: '#topbarmenu',
                        enterFromClass: 'hidden',
                        enterActiveClass: 'animate-fadein',
                        leaveToClass: 'hidden',
                        leaveActiveClass: 'animate-fadeout',
                        hideOnOutsideClick: true
                    }"
                    class="cursor-pointer block lg:hidden text-surface-700 dark:text-surface-100 ml-auto"
                >
                    <i class="pi pi-ellipsis-v text-2xl " />
                </a>
                <ul
                    id="topbarmenu"
                    class="list-none p-0 m-0 hidden lg:flex lg:items-center select-none lg:flex-row lg:ml-auto bg-surface-0 dark:bg-surface-950 border lg:border-0 border-surface right-0 top-full z-10 shadow lg:shadow-none absolute lg:static"
                >
                    <li>
                        <a
                            class="flex p-4 lg:px-4 lg:py-2 items-center text-surface-600 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 font-medium rounded-border cursor-pointer duration-150 transition-colors"
                            @click="showInbox = true"
                        >
                            <i class="pi pi-inbox !text-white lg:!text-2xl leading-none mr-2 lg:mr-0 " />
                            <span class="block lg:hidden font-medium">Inbox</span>
                            <Dialog v-model:visible="showInbox" maximizable modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                <p class="m-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Dialog>
                        </a>
                    </li>
                </ul>
            </div>
            <slot />
        </div>
        <div class="min-h-screen flex flex-col relative flex-auto" v-if="subscribed() === false">
            <div class="h-[60px] flex justify-between items-center px-8 bg-surface-0 dark:bg-surface-950 relative lg:static border-b border-surface">
                <div class="column">
                    <Button label="Subscribe" class="px-5 py-3" @click="goToSubscribe" />
                </div>
                <div class="column">
                    <p class="left-align">Subscribe to begin using Evrim</p>
                </div>
                <div class="column">
                    <p class="left-align"></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import EvrimClient from '~/utils/api';

definePageMeta({
    title: 'Home',
    description: 'Home page of Evrim ',
    requiresAuth: true
})

onMounted(() => {
    const userStore = useUserStore();
    const client = new EvrimClient();
    // check if user is subscribed
    client.isSubscribed(userStore.accessToken).then((res: { status: number; data: any}) => {
        if (res.status === 200) {
            userStore.isSubscribed = true;
        }
    }).catch((err: any) => {
        console.log(err);
        userStore.isSubscribed = false;
    });
});
</script>
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            client: new EvrimClient(),
            showInbox: false,

        }
    },
    methods: {
        logOut() {
            const userStore = useUserStore();
            this.client.logout().then(() => {
                userStore.logout();
                this.$router.push('/login');
            });
        },  
        subscribed() {
            const userStore = useUserStore();
            console.log(`subscribed: ${userStore.isSubscribed}`);
            return userStore.isSubscribed;
        },
        goToSubscribe() {
            this.$router.push('/subscribe');
        }
    }
})
</script>