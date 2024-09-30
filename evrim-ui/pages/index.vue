<template>
    <div>
        <p>Home</p>
    </div>
</template>
<script setup lang="ts">
import EvrimClient from '~/utils/api';

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
</script>

<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        return {
            client: new EvrimClient(),
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
            console.log(`subscribed: ${userStore.isSubscribed}`);
            return userStore.isSubscribed;
        },
        goToSubscribe() {
            this.$router.push('/subscribe');
        }
    }
})
</script>