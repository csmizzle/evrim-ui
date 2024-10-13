<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-8 -mt-2">
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Home</div>
        <Divider />
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border h-screen w-full flex flex-col">
            <div class="grid grid-cols-2 gap-3 flex">
                <div class="bg-surface-0 dark:bg-surface-900 shadow rounded-border p-4 border border-surface hover:border-surface-300 dark:hover:border-surface-500">
                    <h2>Research Graph</h2>
                    <v-network-graph class="graph" :nodes="nodes" :edges="edges" :configs="configs"/>
                </div>
                <div class="bg-surface-0 dark:bg-surface-900 shadow rounded-border p-4 border border-surface hover:border-surface-300 dark:hover:border-surface-500">
                    <h2>Research Tasks</h2>
                    <Line :data="data" :options="chartOptions" />
                </div>
            </div>
            <div class="grid grid-cols-2 gap-3 flex-grow mt-3">
                <div class="bg-surface-0 dark:bg-surface-900 shadow rounded-border p-4 border border-surface hover:border-surface-300 dark:hover:border-surface-500">
                    <h2>Report Sources</h2>
                </div>
                <div class="bg-surface-0 dark:bg-surface-900 shadow rounded-border p-4 border border-surface hover:border-surface-300 dark:hover:border-surface-500">
                    <h2>Briefings</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import EvrimClient from '~/utils/api';
import * as vNG from "v-network-graph"
import { ForceLayout } from "v-network-graph/lib/force-layout"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)


definePageMeta({
    title: 'Home',
    description: 'Home page of Evrim ',
    requiresAuth: true
})

onMounted(() => {
    const userStore = useUserStore();
    const client = new EvrimClient();
    // check if user is subscribed
    client.isSubscribed().then((res: { status: number; data: any}) => {
        if (res.status === 200) {
            userStore.isSubscribed = true;
        }
    }).catch((err: any) => {
        console.log(err);
        userStore.isSubscribed = false;
    });
});

const layoutHandler: vNG.LayoutHandler = new ForceLayout()

const configs = reactive(
    vNG.defineConfigs({
        view: {
            layoutHandler,
        },
        node: {
            label: {
                visible: true,
                color: "#fefefe",
            },
            normal: {
                color: "#6366F1"
            }
        },
    })
)
</script>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            client: new EvrimClient(),
            nodes: {} as { [key: string]: { name: string; type?: string } },
            edges: {} as { [key: string]: { source: string; target: string } },
            nodeCount: 0,
            data:{
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [
                    {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 39, 10, 40, 39, 80, 40]
                    }
                ]
            },
            chartOptions: {
                responsive: true
            }
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
            return userStore.isSubscribed;
        },
        goToSubscribe() {
            this.$router.push('/subscribe');
        },
        fetchGraph() {
            this.client.getAllGraphs().then((res: { status: number; data: any }) => {
                if (res.status === 200) {
                    console.log(res.data);
                    const processedNodes: { [key: string]: { name: string, type: string } } = {};
                    const processedEdges: { [key: string]: { source: string, target: string, type: string } } = {};
                    res.data.forEach((graph: { entities: any[]; relationships: any[]; }) => {
                        if (graph.entities.length === 0 || graph.relationships.length === 0) {
                            return;
                        }
                        graph.entities.forEach((node: { id: number; name: string; type: string; }) => {
                            processedNodes[`node${node.id.toString()}`] = { name: node.name, type: node.type };
                            console.log(processedNodes);
                        });
                        graph.relationships.forEach((edge: { id: number; source: number; target: number; type: string; }) => {
                            processedEdges[`edge${edge.id.toString()}`] = { source: `node${edge.source.toString()}`, target: `node${edge.target.toString()}`, type: edge.type };
                            console.log(processedEdges);
                        });
                    });
                    this.nodeCount = Object.keys(processedNodes).length;
                    this.nodes = processedNodes;
                    this.edges = processedEdges;
                    console.log(this.nodes);
                    console.log(this.edges);
                    // buildNetwork(this.nodeCount, this.nodes, this.edges);
                }
            }).catch((err: any) => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.fetchGraph();
    }
})
</script>
