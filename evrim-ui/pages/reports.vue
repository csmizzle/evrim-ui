<template>
<div class="bg-surface-50 dark:bg-surface-950 p-6">
    <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4 pl-2">Reports</div>
        <p class="m-0 mb-4 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4 pl-2">
            Order, view, and dive into your reports.
        </p>
        <div class="grid grid-cols-12 gap-4">
            <div v-for="report in reports" :key="report.id" class="col-span-12 md:col-span-6 xl:col-span-4 p-4">
                <div class="bg-surface-0 dark:bg-surface-900 shadow rounded-border p-6">
                    <div class="flex border-b border-surface pb-6">
                        <div class="flex flex-col items-start">
                            <span class="text-xl text-surface-900 dark:text-surface-0 font-medium mb-1">{{ report.report.title }}</span>
                            <span class="text-surface-600 dark:text-surface-200 font-medium mb-2">{{ report.report.description  }}</span>
                        </div>
                    </div>
                    <div class="flex justify-between pt-6">
                        <Button label="View" icon="pi pi-search" class="w-6/12 mr-2" outlined />
                        <Button label="Follow" icon="pi pi-user-plus" class="w-6/12 ml-2" outlined />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';

definePageMeta({
    title: 'Reports',
    description: 'Reports page of Evrim ',
    requiresAuth: true
})
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import EvrimClient from '~/utils/api';

export default defineComponent({
    data() {
        return {
            reports: [],
            client: new EvrimClient()
        }
    },
    methods: {
        getReports() {
            const userStore = useUserStore();
            this.client.getReports(userStore.accessToken).then((response) => {
                console.log(response.data);
                this.reports = response.data;
            }).catch((error) => {
                console.error(error);
            });
        }
    },
    mounted() {
        this.getReports();
    }
})
</script>