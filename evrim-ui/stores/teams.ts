import { defineStore } from "pinia";


interface ResearchAgent {
    id: number;
    title: string;
    research_questions: string[];
}

interface ResearchTeamsState {
    id: number;
    title: string;
    agents: ResearchAgent[];
}


export const useTeamStore = defineStore('researchTeams', {
    state: () => ({
        teams: [] as ResearchTeamsState[],
    }),
    getters: {
        getTeams: (state) => state.teams,
    },
    actions: {
        logout() {
            this.$reset();
        }
    },
    persist: true
})