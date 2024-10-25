<template>
    <div class="min-h-screen flex relative lg:static bg-surface-50 dark:bg-surface-950">
        <div 
        id="app-sidebar-9" 
        class="sticky fixed h-screen bg-surface-0 dark:bg-surface-950 lg:block flex-shrink-0 absolute left-0 top-0 z-10 border-r border-surface w-50 lg:w-16 select-none"
        >
            <div class="flex flex-col h-full">
                <div class="flex items-center justify-center flex-shrink-0 h-[60px]">
                    <img src="@/assets/images/logo.png" style="width: 36px; height: 36px; max-width: 36px; max-height: 36px; object-fit: contain;"/>
                </div>
                <div class="mt-4">
                    <ul class="list-none p-0 m-0">
                        <li>
                            <nuxt-link
                                class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                                :class="{ 
                                    'text-primary-emphasis': activeTab === 0,
                                    'border-l-2': activeTab === 0,
                                    'border-primary-emphasis': activeTab === 0,
                                }"
                                @click="setActiveTab(0)"
                                style="color: white !important;"
                                to="/"
                            >
                                <i 
                                    class="pi pi-home mr-2 lg:mr-0 !text-white lg:!text-2xl leading-none"
                                    style="color: white !important;"
                                />
                                <span class="font-medium inline !text-white lg:text-xs lg:hidden">Home</span>
                            </nuxt-link>
                        </li>
                        <li class="relative">
                            <nuxt-link
                                v-styleclass="{
                                    selector: '@next',
                                    enterFromClass: 'hidden',
                                    leaveToClass: 'hidden',
                                    hideOnOutsideClick: true
                                }"
                                class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                                :class="{ 
                                    'text-primary-emphasis': activeTab === 1,
                                    'border-l-2': activeTab === 1,
                                    'border-primary-emphasis': activeTab === 1,
                                }"
                                @click="setActiveTab(1)"
                                to="/reports"
                            >
                                <i class="pi pi-book mr-2 lg:mr-0 !text-white lg:!text-2xl leading-none" style="color: white !important;"/>
                                <span class="font-medium inline !text-white lg:text-xs lg:hidden">Reports</span>
                            </nuxt-link>
                        </li>
                        <li class="relative">
                            <nuxt-link
                                v-styleclass="{
                                    selector: '@next',
                                    enterFromClass: 'hidden',
                                    leaveToClass: 'hidden',
                                    hideOnOutsideClick: true
                                }"
                                class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                                :class="{ 
                                    'text-primary-emphasis': activeTab === 3,
                                    'border-l-2': activeTab === 3,
                                    'border-primary-emphasis': activeTab === 3,
                                }"
                                @click="setActiveTab(3)"
                                to="/builder"
                            >
                                <i class="pi pi-hammer mr-2 lg:mr-0 !text-white lg:!text-2xl leading-none" style="color: white !important;"/>
                                <span class="font-medium inline !text-white lg:text-xs lg:hidden">Builder</span>
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link
                                class="flex flex-row lg:flex-col items-center cursor-pointer p-4 lg:justify-center hover:border-surface-300 dark:hover:border-surface-500 duration-150 transition-colors"
                                :class="{ 
                                    'text-primary-emphasis': activeTab === 2,
                                    'border-l-2': activeTab === 2,
                                    'border-primary-emphasis': activeTab === 2,
                                }"
                                @click="setActiveTab(2)"
                                to="/account"
                            >
                                <i class="pi pi-cog mr-2 lg:mr-0 !text-white lg:!text-2xl leading-none" style="color: white !important;"/>
                                <span class="font-medium inline !text-white lg:text-xs lg:hidden">Account</span>
                            </nuxt-link>
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
        <div class="stick top-0 fixed min-h-screen flex flex-col relative flex-auto z-50" v-if="subscribed() === true">
            <div class="sticky top-0 fixed h-[60px] flex justify-between items-center px-8 bg-surface-0 dark:bg-surface-950 border-b border-surface z-50">
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
                    <!-- <IconField icon-position="left">
                        <InputIcon class="pi pi-search text-surface-700 dark:text-surface-100" />
                        <InputText type="text" class="border-0 w-40 sm:w-80" placeholder="Search" />
                    </IconField> -->
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
                    class="list-none p-0 m-0 hidden lg:flex lg:items-center select-none lg:flex-row lg:ml-auto bg-surface-0 dark:bg-surface-950 border lg:border-0 border-surface right-0 top-full z-5 shadow lg:shadow-none absolute lg:static"
                >
                    <li>
                        <a
                            class="flex p-4 lg:px-4 lg:py-2 items-center text-surface-600 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 font-medium rounded-border cursor-pointer duration-150 transition-colors"
                            @click="showOrderReport = true"
                        >
                            <i class="pi pi-plus !text-white lg:!text-2xl leading-none mr-2 lg:mr-0 " />
                            <span class="block lg:hidden font-medium">Research</span>
                            <Dialog v-model:visible="showOrderReport" maximizable modal header="Research" :style="{ width: '30rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                                <div class="justify-center flex flex-col gap-2 mb-4 fill">
                                    <div class="flex items-center gap-4">
                                        <div class="w-full md:w-100">
                                            <InputText v-model="title" optionLabel="url" placeholder="Report Title" class="w-full" />
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 mb-4">
                                    <div class="flex items-center gap-4">
                                        <div class="w-full md:w-100">
                                            <InputGroup>
                                                <InputGroupAddon>https://</InputGroupAddon>
                                                <InputText v-model="url" optionLabel="url" placeholder="URL" class="w-full" />
                                            </InputGroup>
                                            <small id="title-help" class="block mt-2">Company url to start research process on</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 mb-4">
                                    <div class="flex items-center gap-4">
                                        <div class="w-full md:w-100">
                                            <Select v-model="selectedTone" :options="tones" optionLabel="name" placeholder="Report Tone" class="w-full" />
                                            <small id="title-help" class="block mt-2">Report tones control how a report sounds and reads</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 mb-4">
                                    <div class="flex items-center gap-4">
                                        <div class="w-full md:w-100">
                                            <Select v-model="selectedTeam" :options="teams" optionLabel="name" placeholder="Research Team" class="w-full" />
                                            <small id="title-help" class="block mt-2">Research teams drive data collection and data retrieval</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-col gap-2 mb-4">
                                    <div class="flex items-center gap-4">
                                        <Checkbox v-model="briefing" inputId="briefing1" name="briefing" value="Briefing" />
                                        <label for="briefing1" class="ml-2"> Voice Briefing </label><br>
                                    </div>
                                </div>
                                <div class="flex justify-end gap-2">
                                    <Button type="button" label="Cancel" severity="secondary" @click="showOrderReport = false" outlined></Button>
                                    <Button type="button" label="Submit" @click="submitReport" outlined></Button>
                                </div>
                            </Dialog>
                        </a>
                    </li>
                    <li>
                        <a
                            class="flex p-4 lg:px-4 lg:py-2 items-center text-surface-600 dark:text-surface-200 hover:text-surface-900 dark:hover:text-surface-0 hover:bg-surface-100 dark:hover:bg-surface-700 font-medium rounded-border cursor-pointer duration-150 transition-colors"
                            @click="showInbox = true"
                        >
                            <i class="pi pi-inbox !text-white lg:!text-2xl leading-none mr-2 lg:mr-0 " />
                            <span class="block lg:hidden font-medium">Inbox</span>
                            <Dialog v-model:visible="showInbox" maximizable modal header="Inbox" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
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
import { useToast } from 'primevue/usetoast';

const toast = useToast();

onMounted(() => {
    const userStore = useUserStore();
    const client = new EvrimClient();
    // check if user is subscribed
    client.isSubscribed().then((res: { status: number; data: any}) => {
        if (res.status === 200) {
            userStore.isSubscribed = true;
        }
    }).catch((err: any) => {
        userStore.isSubscribed = false;
    });
});
</script>
<script lang="ts">
import { defineComponent } from 'vue';

interface Tone {
    name: string;
    code: string;
}


export default defineComponent({
    mounted() {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab !== null) {
            this.activeTab = parseInt(savedTab);
        }
        this.loadTasks();
        this.loadTeams();
    },
    data() {
        return {
            client: new EvrimClient(),
            showInbox: false,
            showOrderReport: false,
            tones: [
                { name: 'Critical', code: 'CRITICAL' },
                { name: 'Analytical', code: 'ANALYTICAL' },
                { name: 'Informal', code: 'INFORMAL' },
                { name: 'Informational', code: 'INFORMATIONAL' },
                { name: 'Persuasive', code: 'PERSUASIVE' },
                { name: 'Professional', code: 'PROFESSIONAL' }
            ],
            title: '',
            url: '',
            selectedTone: {} as Tone,
            selectedTeam: {},
            activeTab: 0,
            briefing: false,
            teams: [],
        }
    },
    methods: {
        logOut() {
            const userStore = useUserStore();
            const taskStore = useTaskStore();
            const teamStore = useTeamStore();
            this.client.logout().then(() => {
                userStore.logout();
                taskStore.logout();
                teamStore.logout();
                this.$router.push('/login');
            });
        },  
        subscribed() {
            const userStore = useUserStore();
            return userStore.isSubscribed;
        },
        goToSubscribe() {
            this.$router.push('/subscribe');
        },
        submitReport() {
            // hey value from the selected tone value
            this.client.submitReport(
                "https://"+this.url,
                this.title,
                "Evrim UI Report",
                "NARRATIVE",
                this.selectedTone.code,
                "THIRD_PERSON",
            ).then((res: { status: number; data: any }) => {
                if (res.status === 201) {
                    this.showOrderReport = false
                    this.$toast.add({ severity: 'success', summary: 'Success', detail: 'Research has begun!' });
                    // reset input parameters
                    this.url = '';
                    this.title = '';
                    this.selectedTone = {} as Tone;
                }
            }).catch((err: any) => {
                console.log(err);
                this.showOrderReport = false
                this.$toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to start research.' });
                // reset input parameters
                this.url = '';
                this.title = '';
                this.selectedTone = {} as Tone;;
            });
        },
        setActiveTab(index: number) {
            this.activeTab = index;
            localStorage.setItem('activeTab', index.toString()); // Save to localStorage
        },
        loadTasks() {
            const taskStore = useTaskStore();
            this.client.getTasks().then((res: { status: number; data: any }) => {
                if (res.status === 200) {
                    taskStore.tasks = res.data;
                }
            }).catch((err: any) => {
                console.log(err);
            });
        },
        loadTeams() {
            const teamStore = useTeamStore();
            this.client.getResearchTeams().then((res: { status: number; data: any }) => {
                if (res.status === 200) {
                    console.log("Loaded teams");
                    teamStore.teams = res.data;
                    // load team titles into select options array
                    this.teams = res.data.map((team: { title: string; }) => {
                        return { name: team.title, code: team.title };
                    });
                }
            }).catch((err: any) => {
                console.log(err);
            });
        }
    },
})
</script>