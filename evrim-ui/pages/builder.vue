<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-8 -mt-2">
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Team Builder</div>
        <p class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4">
            Builder your research team by listing out the sections of a Report.
        </p>
        <Divider />
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border h-fit w-full flex flex-col">
            <div v-if="createdTeam">
                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">{{ createdTeam.title }}</div>
                <div v-for="(agent, agentIndex) in createdTeam.agents" :key="agent.id" class="flex flex-col mb-2">
                    <Panel :header="agent.title">
                        <div v-for="(researchQuestion, researchIndex) in agent.research_questions" :key="researchQuestion.id" class="flex flex-col mb-2">
                            <InputGroup>
                                <InputText v-model="agent.research_questions[researchIndex]" class="w-full p-2 mb-2" placeholder="Research Question" />
                                <Button icon="pi pi-times" severity="danger" @click="deleteQuestion(agentIndex, researchIndex)" outlined/>
                            </InputGroup>
                        </div>
                        <div class="flex justify-center pt-2">
                            <Button class="self-center w-1/2" icon="pi pi-plus" @click="addResearchQuestion(agentIndex)" outlined/>
                        </div>
                    </Panel>
                </div>
                <div class="flex justify-between pt-2">
                    <Button class="self-center w-1/2" label="Update" @click="updateTeam" outlined/>
                    <Button class="self-center w-1/2 ml-2"label="Save" @click="saveTeam" outlined/>
                </div>
            </div>
            <div v-else>
                <p class="text-surface-900 dark:text-surface-0 font-medium text-lg mb-4">Create a Report Template</p>
                <InputText v-model="teamName" class="w-full p-2 mb-2" placeholder="Report Name" />
                <div v-for="n in sectionCount" :key="n" class="flex flex-col mb-2 ml-2">
                    <InputGroup>
                        <InputText v-model="sections[n]" class="w-full p-2 mb-2" placeholder="Section Title" />
                        <Button icon="pi pi-times" severity="danger" @click="deleteSection(n)" outlined/>
                    </InputGroup>
                </div>
                <div class="flex justify-between">
                    <Button class="self-center w-1/2"label="Add Section" @click="addSection" outlined/>
                    <Button class="self-center w-1/2 ml-2" label="Create" @click="createTeam" outlined/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import EvrimClient from '~/utils/api';

definePageMeta({
    title: 'Report Builder',
    description: 'Reports page of Evrim ',
    requiresAuth: true
})
</script>
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            teamName: '',
            sections: [],
            sectionCount: 0,
            client: new EvrimClient(),
            createdTeam: null as { title: string; agents: { id: number; title: string; research_questions: string[] }[] } | null,
        }
    },
    methods: {
        addSection() {
            this.sectionCount += 1;
        },
        createTeam() {
            // remove null values from sections
            if (this.sections) {
                const cleanedSections = this.sections.filter((section) => section !== null);
                this.client.createResearchTeam(this.teamName, cleanedSections).then((response) => {
                    this.createdTeam = response.data;
                }).catch((error) => {
                    console.error(error);
                })
            }
        },
        saveTeam() {
            this.sectionCount = 0;
            this.teamName = '';
            this.sections = [];
            this.createdTeam = null;
        },
        updateTeam() {
            console.log(this.createdTeam);
            this.client.partialUpdateTeam(this.createdTeam).then((response) => {
                console.log(response);
            }).catch((error) => {
                console.error(error);
            })
        },
        deleteQuestion(agentIndex: number, researchIndex: number) {
            console.log(agentIndex, researchIndex);
            if (this.createdTeam) {
                this.createdTeam.agents[agentIndex].research_questions.splice(researchIndex, 1);
            }
        },
        addResearchQuestion(agentIndex: number) {
            if (this.createdTeam) {
                // add new item to the research_questions array
                this.createdTeam.agents[agentIndex].research_questions.push('');
            }
        },
        deleteSection(index: number) {
            // remove the section from the sections array
            const actualIndex = index - 1;
            this.sections.splice(actualIndex, 1);
            this.sectionCount -= 1; // Don't forget to decrease the section count
        }
    }
})
</script>