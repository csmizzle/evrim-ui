<script setup lang="ts">
import EvrimClient from '~/utils/api';

const client = new EvrimClient();

// setup onMounted 
const router = useRouter();
onMounted(() => {
    setTimeout(() => {
        console.log('redirecting ...');
        client.subscribe().then((res: { status: number; data: any}) => {
            if (res.status === 201) {
                const userStore = useUserStore();
                // set new user token
                userStore.accessToken = res.data.access;
                userStore.refreshToken = res.data.refresh;
                userStore.isSubscribed = true;
                router.push('/');
            }
        }).catch((err: any) => {
            console.log(err);
        });
    }, 3000);
});

definePageMeta({
    title: 'Subscribed',
    description: 'Successful subscription to Evrim',
    requiresAuth: true,
    layout: false
})

</script>

<template>
    <div class="bg-auto dark:bg-auto px-6 py-20 md:px-12 lg:px-20">
        <div class="bg-auto dark:bg-surface-900 p-6 shadow-xl rounded-border w-full lg:w-6/12 mx-auto">
            <div class="text-center mb-8">
                <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Evrim</div>
                <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">You've been successfully subscribed, redirecting ...</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


</script>