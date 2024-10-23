<template>
<div class="bg-surface-50 dark:bg-surface-950 p-6">
    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4 pl-2">Reports</div>
        <p class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4 pl-2">
            Order, view, and dive into your reports.
        </p>
        <AutoComplete :suggestions="titles" v-model="reportFilter" placeholder="Search" class="w-full mb-4" @keydown.enter="filterReports" @complete="search"/>
        <Divider />
        <div class="grid grid-cols-12 gap-4">
            <div v-for="task in useTaskStore().tasks" :key="task.task_id" class="col-span-12 md:col-span-6 xl:col-span-4 p-2 pl-2">
                <div class="bg-surface-0 dark:bg-surface-900 shadow rounded-border p-4 border border-surface hover:border-surface-300 dark:hover:border-surface-500">
                    <nuxt-link class="mx-auto" :to="`/report/${task.task_id}`">
                    <div class="flex border-b border-surface pb-4" >
                        <div class="flex flex-col items-start">
                            <span class="text-xl text-surface-900 dark:text-surface-0 font-medium mb-1">{{ JSON.parse(task.event.input).title }}</span>
                            <span class="text-surface-600 dark:text-surface-200 font-medium mb-2">{{ JSON.parse(task.event.input).description  }}</span>
                            <span v-if="task.status === 'P'" class="bg-blue-50 text-blue-400 dark:bg-blue-500/30 dark:text-blue-200 rounded-border inline-flex py-1 px-2 text-sm">
                            Pending
                            </span>
                            <span v-if="task.status === 'R'" class="bg-purple-50 text-purple-400 dark:bg-purple-500/30 dark:text-purple-200 rounded-border inline-flex py-1 px-2 text-sm">
                            Running
                            </span>
                            <span v-if="task.status === 'C'" class="bg-green-50 text-green-400 dark:bg-green-500/30 dark:text-green-200 rounded-border inline-flex py-1 px-2 text-sm">
                            Complete
                            </span>
                            <span v-if="task.status === 'F'" class="bg-red-50 text-red-400 dark:bg-red-500/30 dark:text-red-200 rounded-border inline-flex py-1 px-2 text-sm">
                            Failed
                            </span>
                        </div>
                    </div>
                    </nuxt-link>
                    <div class="flex justify-between pt-4">
                        <nuxt-link class="w-6/12 inline-block" :to="`/report/${task.task_id}`">
                            <Button label="View" icon="pi pi-search" class="w-full" outlined />
                        </nuxt-link>
                        <ConfirmPopup></ConfirmPopup>
                        <Button severity="danger" @click="confirmDelete($event, task.task_id)" label="Delete" icon="pi pi-trash" class="bg-red-50 text-red-400 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 w-6/12 ml-2" outlined />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import AutoComplete from 'primevue/autocomplete';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import EvrimClient from '~/utils/api';

definePageMeta({
    title: 'Reports',
    description: 'Reports page of Evrim ',
    requiresAuth: true
})
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import { Input } from 'postcss';

export default defineComponent({
    data() {
        return {
            client: new EvrimClient(),
            confirm: useConfirm(),
            toast: useToast(),
            reportFilter: '',
            titles: [] as string[]
        }
    },
    methods: {
        getTasks() {
            const taskStore = useTaskStore();
            this.client.getTasks().then((response) => {
            console.log(response.data);
                taskStore.tasks = response.data;
                // populate the titles array
                for (const task of taskStore.tasks) {
                    this.titles.push(JSON.parse(task.event.input).title);
                    console.log(this.titles)
                }
            }).catch((error) => {
                console.error(error);
            });
        },
        toTitleCase(str: string): string {
            return str.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            });
        },
        confirmDelete(event: { currentTarget: any; }, taskId: string) {
            this.confirm.require({
                target: event.currentTarget,
                message: 'Do you want to delete this report?',
                icon: 'pi pi-info-circle',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Delete',
                    severity: 'danger'
                },
                accept: () => {
                    this.client.deleteTask(taskId).then(() => {
                        this.getTasks();
                        this.toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Report deleted', life: 3000 });
                    }).catch((error) => {
                        console.error(error);
                        this.toast.add({ severity: 'error', summary: 'Rejected', detail: 'There was an error deleting this report', life: 3000 });
                    });
                },
                reject: () => {
                    this.toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        },
        filterReports() {
            console.log(`filtering reports ${this.reportFilter}`);
            if (this.reportFilter === '') {
                this.getTasks();
                return;
            }
            const taskStore = useTaskStore();
            for (const task of taskStore.tasks) {
                if (JSON.parse(task.event.input).title.toLowerCase().includes(this.reportFilter.toLowerCase())) {
                    continue;
                } else {
                    // remove the task from the array
                    taskStore.tasks = taskStore.tasks.filter((t) => t.task_id !== task.task_id);
                }
            }
        },
        search(event: any) {
            // filter titles to match the search
            this.titles = this.titles.filter((title) => title.toLowerCase().includes(event.query.toLowerCase()));
        }
    },
    mounted() {
        this.getTasks();
    }
})
</script>