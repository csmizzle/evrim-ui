<template>
<div class="bg-surface-50 dark:bg-surface-950 p-6">
    <div v-if="taskReport.task">
        <div class="flex justify-between items-center mb-2">
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl justify-left">
                {{ JSON.parse(taskReport.task.event.input).title }}
            </div>
            <SplitButton icon="pi pi-download" label="Download" dropdownIcon="pi pi-cog" @click="downloadPdf" :model="buttonItems" outlined></SplitButton>
        </div>
        <Divider />
        <div class="flex justify-between items-center mb-1">
            <div class="text-surface-900 dark:text-surface-0 font-medium text-l">
                <p class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4">
                    <a :href="JSON.parse(taskReport.task.event.input).url"target="_blank" rel="noopener noreferrer" >{{ JSON.parse(taskReport.task.event.input).url }}</a>
                </p>
            </div>
        </div>
        <div v-if="taskReport.report" class="flex justify-left items-center mb-2">
            <span v-if="JSON.parse(taskReport.task.event.input).style" class="bg-blue-50 text-blue-400 dark:bg-blue-500/30 dark:text-blue-200 rounded-border inline-flex py-1 px-2 text-sm mr-2">
                {{ toTitleCase(JSON.parse(taskReport.task.event.input).style) }}
            </span>
            <span v-if="JSON.parse(taskReport.task.event.input).tone" class="bg-purple-50 text-purple-400 dark:bg-purple-500/30 dark:text-purple-200 rounded-border inline-flex py-1 px-2 text-sm">
                {{ toTitleCase(JSON.parse(taskReport.task.event.input).tone) }}
            </span>
        </div>
        <div v-if="taskReport.report" class="flex justify-left text-surface-900 dark:text-surface-0 font-medium text-l mb-2">
            {{ taskReport.report.description }}
        </div>
    </div>
    <div v-else>
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4 pl-2">
            Loading...
        </div>
    </div>
    <div v-if="taskReport.report" class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
        <Tabs>
        <TabList>
            <Tab value="report">Report</Tab>
            <Tab value="tasks">Tasks</Tab>
        </TabList>
        <TabPanels>
        <TabPanel value="report">
            <Accordion multiple>
                <AccordionPanel v-for="section in taskReport.report.sections" :key="section.id" :value="section.title">
                    <AccordionHeader>
                        <span class="font-bold whitespace-nowrap">{{ section.title }}</span>
                        <i v-if="section.sources && section.sources.length > 0" class="pi pi-external-link ml-auto mr-2" style="color: white !important"/>
                    </AccordionHeader>
                    <AccordionContent>
                        <p v-for="paragraph in section.paragraphs" :key="paragraph.id" class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4 pl-2">
                            {{ paragraph.sentences.join(" ") }}
                        </p>
                        <div v-if="section.sources && section.sources.length > 0">
                            <p class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4 pl-2">
                                Sources:
                            </p>
                            <p v-for="source in section.sources" class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4 pl-2">
                                <a :href="source"target="_blank" rel="noopener noreferrer" >{{ source }}</a>
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </TabPanel>
        <TabPanel value="tasks">
            <Accordion multiple>
                <AccordionPanel v-for="task in taskLog.tasks" :key="task.id" :value="task.name">
                    <AccordionHeader>
                        <span class="font-bold whitespace-nowrap">{{ task.name }}</span>
                    </AccordionHeader>
                    <AccordionContent>
                        <pre class="whitespace-pre-wrap">
{{ task.result.trimStart() }}
                        </pre>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </TabPanel>
        </TabPanels>
        </Tabs>
    </div>
    <div v-else>
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4 pl-2">
            Loading...
        </div>
    </div>
</div>
</template>
<script setup lang="ts">
import Accordion from 'primevue/accordion';
import SplitButton from 'primevue/splitbutton';
import Divider from 'primevue/divider';
import { useToast } from "primevue/usetoast";
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const toast = useToast();
const activeTab = ref('report');

definePageMeta({
    title: 'Reports',
    description: 'Reports page of Evrim ',
    requiresAuth: true
})
</script>
<script lang="ts">
import { defineComponent } from 'vue';
import EvrimClient from '~/utils/api';
import type { Report } from '~/types/report';
import type { Task } from '~/types/task';



interface TaskWithReport extends Report{
    task: Task;
}

export default defineComponent({
    data() {
        return {
            taskReport: {} as TaskWithReport,
            client: new EvrimClient(),
            buttonItems: [
                {
                    label: ".pdf",
                    icon: "pi pi-file-pdf",
                    command: () => {
                        this.downloadPdf();
                        this.$toast.add({
                            severity: "info",
                            summary: "Downloading PDF",
                            detail: "Your PDF report is being downloaded.",
                            life: 3000,
                        })
                    }
                },
                {
                    label: ".docx",
                    icon: "pi pi-file-word",
                    command: () => {
                        this.downloadDocx();
                        this.$toast.add({
                            severity: "info",
                            summary: "Downloading DOCX",
                            detail: "Your DOCX report is being downloaded.",
                            life: 3000,
                        })
                    }
                }
            ],
            taskLog: []
        }
    },
    methods: {
        getTaskRun(reportId: string) {
            this.client.getCrewRunFromReportId(reportId).then((response) => {
                console.log(response.data);
                this.taskLog = response.data;
            }).catch((error) => {
                console.error(error);
            });
        },
        getReport() {
            const userStore = useUserStore();
            const reportId = Array.isArray(this.$route.params.reportId) ? this.$route.params.reportId[0] : this.$route.params.reportId;
            this.client.getReportFromTaskId(userStore.accessToken, reportId).then((response) => {
                this.taskReport = response.data;
                this.getTaskRun(response.data.id);
            }).catch((error) => {
                console.error(error);
            });
        },
        downloadPdf() {
            const userStore = useUserStore();
            const reportId = this.taskReport.id
            this.client.generateReportPdf(userStore.accessToken, reportId.toString()).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${this.taskReport.report.title}.pdf`);
                document.body.appendChild(link);
                link.click();
            }).catch((error) => {
                console.error(error);
            });
        },
        downloadDocx() {
            const userStore = useUserStore();
            const reportId = this.taskReport.report.id
            this.client.generateReportDocx(userStore.accessToken, reportId).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${this.taskReport.report.title}.docx`);
                document.body.appendChild(link);
                link.click();
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
        this.getReport();
    },
})
</script>