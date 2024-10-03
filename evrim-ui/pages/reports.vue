<template>
<div class="bg-surface-50 dark:bg-surface-950 p-6">
    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4 pl-2">Reports</div>
        <p class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4 pl-2">
            Order, view, and dive into your reports.
        </p>
        <Divider />
        <div class="grid grid-cols-12 gap-4">
            <div v-for="task in tasks" :key="task.task_id" class="col-span-12 md:col-span-6 xl:col-span-4 p-2 pl-2">
                <nuxt-link class="mx-auto" :to="`/report/${task.task_id}`">
                <div class="bg-surface-0 dark:bg-surface-900 shadow rounded-border p-4 border border-surface hover:border-surface-300 dark:hover:border-surface-500">
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
                    <div class="flex justify-between pt-4">
                        <nuxt-link class="w-6/12 inline-block" :to="`/report/${task.task_id}`">
                            <Button label="View" icon="pi pi-search" class="w-full" outlined />
                        </nuxt-link>
                        <Button label="Follow" icon="pi pi-user-plus" class="w-6/12 ml-2" outlined />
                    </div>
                </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Divider from 'primevue/divider';

definePageMeta({
    title: 'Reports',
    description: 'Reports page of Evrim ',
    requiresAuth: true
})
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import EvrimClient from '~/utils/api';
import type { Task } from '~/types/task';

export default defineComponent({
    data() {
        return {
            tasks: [] as Task[],
            client: new EvrimClient()
        }
    },
    methods: {
        getTasks() {
            const userStore = useUserStore();
            this.client.getTasks(userStore.accessToken).then((response) => {
            console.log(response.data);
                this.tasks = response.data;
            }).catch((error) => {
                console.error(error);
            });
        },
        toTitleCase(str: string): string {
            return str.replace(/\w\S*/g, (txt) => {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            });
        }

    },
    mounted() {
        this.getTasks();
    }
})
</script>