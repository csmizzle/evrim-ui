<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-8 -mt-2">
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Team Builder</div>
        <p class="m-0 mb-2 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4 pl-2">
            Builder your research team by listing out the sections of a Report.
        </p>
        <Divider />
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border h-fit w-full flex flex-col">
            <div v-if="createdTeam">
                <InputText v-model="createdTeam.title" class="w-full p-2 mb-2" placeholder="Team Name" />
                <div v-for="agent in createdTeam.agents" :key="agent.id" class="flex flex-col">
                    <InputText v-model="agent.title" class="w-full p-2 mb-2" placeholder="Agent Title" />
                    <div v-for="research_question in agent.research_questions" :key="research_question.id" class="flex flex-col">
                        <InputText :value="research_question" class="w-full p-2 mb-2" placeholder="Section Title" />
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="text-surface-900 dark:text-surface-0 font-medium text-lg mb-4">Create a Team</p>
                <InputText v-model="teamName" class="w-full p-2 mb-2" placeholder="Team Name" />
                <div v-for="n in sectionCount" :key="n" class="flex flex-col">
                    <InputText v-model="sections[n]" class="w-full p-2 mb-2" placeholder="Section Title" />
                </div>
                <div>
                    <Button class="self-center w-1/2"label="Add Section" @click="addSection" outlined/>
                    <Button class="self-center w-1/2 mt-2" label="Create" @click="createTeam" outlined/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import FloatLabel from 'primevue/floatlabel';
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
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
            createdTeam: null,
        }
    },
    methods: {
        addSection() {
            this.sectionCount += 1;
        },
        createTeam() {
            // remove null values from sections
            const cleanedSections = this.sections.filter((section) => section !== null);
            this.client.createResearchTeam(this.teamName, cleanedSections).then((response) => {
                console.log(response);
                this.createdTeam = response.data;
            }).catch((error) => {
                console.error(error);
            })
        },
    }
})
</script>