<template>
    <div class="bg-auto dark:bg-auto px-6 py-20 md:px-12 lg:px-20">
        <div class="text-surface-900 dark:text-surface-0 font-bold text-4xl lg:text-6xl mb-6 text-center">Pricing Plans</div>
        <div class="text-surface-700 dark:text-surface-0/70 text-xl mb-12 text-center leading-normal">Evrim only provides a Basic Plan to but more are coming!</div>
        <div class="flex justify-center">
            <div
                class="w-full lg:w-1/3 flex-1 py-4 px-4 lg:px-6 flex rounded-lg flex-col bg-surface-0 dark:bg-surface-800 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.12),0px_0px_2px_0px_rgba(0,0,0,0.06),0px_4px_10px_0px_rgba(0,0,0,0.03)]"
            >
                <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Basic</div>
                <div class="text-surface-600 dark:text-surface-300"></div>
                <div class="my-4 w-full h-px bg-surface-300 dark:bg-surface-700" />
                <div class="flex items-center gap-2">
                    <span class="font-bold text-2xl text-surface-900 dark:text-surface-0">$5</span>
                    <span class="font-medium text-surface-600 dark:text-surface-300">per Report</span>
                </div>
                <div class="my-4 w-full h-px bg-surface-300 dark:bg-surface-600" />
                <ul class="list-none flex flex-col gap-4 flex-1">
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-green-500 text-lg" />
                        <span class="text-surface-800 dark:text-surface-100 leading-6"> Open source data from multiple search engines </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-green-500 text-lg" />
                        <span class="text-surface-800 dark:text-surface-100 leading-6"> Image search and generation </span>
                    </li>
                    <li class="flex items-center gap-2">
                        <i class="pi pi-check-circle text-green-500 text-lg" />
                        <span class="text-surface-800 dark:text-surface-100 leading-6"> Entity extraction </span>
                    </li>
                </ul>
                <div class="my-4 w-full h-px bg-surface-300 dark:bg-surface-700" />
                <Button label="Buy Now" @click="sendToStripe" class="px-5 py-3" />
            </div>
        </div>
        <div>
            <stripe-checkout
            ref="checkoutRef"
            :pk="useRuntimeConfig().public.STRIPE_PUBLISHABLE_KEY"
            :session-id="session_id"
            />
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';


definePageMeta({
    title: 'Subscribe',
    description: 'Subscribe to Evrim',
    requiresAuth: true,
    layout: false
})
</script>

<script lang="ts">
import { defineComponent } from 'vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import EvrimClient from '~/utils/api';



export default defineComponent({
    components: {
        StripeCheckout
    },
    methods: {
        sendToStripe() {
            // send user to stripe
            const nuxtApp = useNuxtApp()
            const userStore = useUserStore(nuxtApp.$pinia);
            // crete session id using user token
            // first check if user is already subscribed
            this.client.isSubscribed(userStore.accessToken).then((res: { status: number; data: any}) => {
                if (res.status === 200) {
                    this.$router.push('/subscribed');
                }
            }).catch((err: any) => {
                if (err.response) {
                    // handle 404 error which means the user is not subscribed and should be redirected to stripe
                    if (err.response.status === 404) {
                        this.client.createStripeCheckoutSession(userStore.accessToken).then((res: { status: number; data: any}) => {
                            if (res.status === 201) {
                                this.session_id = res.data.id;
                                (this.$refs.checkoutRef as any).redirectToCheckout();
                            }
                        }).catch((err: any) => {
                            console.log(err);
                        });
                    }
                }
            });
        },
    },
    data() {
        return {
                session_id: null,
                client: new EvrimClient()
            }
    },
});
</script>
