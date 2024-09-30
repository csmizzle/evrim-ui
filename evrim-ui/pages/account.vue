<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-8 -mt-2">
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Profile</div>
        <p class="m-0 mb-4 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4">
            Modify your personal information and settings.
        </p>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
            <div class="grid grid-cols-12 gap-4">
                <div class="mb-4 col-span-12">
                    <label for="nickname2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Username</label>
                    <InputText id="nickname2" type="text" class="w-full" :value="username" />
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="email2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">First Name</label>
                    <InputText id="email2" type="text" class="w-full" :value="firstName" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="state2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Last Name</label>
                    <InputText id="state2" type="text" class="w-full" :value="lastName" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="state2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Email Address</label>
                    <InputText id="state2" type="text" class="w-full" :value="emailAddress" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="state2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Subscribed</label>
                    <InputText id="state2" type="text" class="w-full" :value="subscribed ? 'Yes' : 'No'" readonly="true"/>
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="col-span-12">
                    <Button label="Save Changes" class="w-auto mt-4" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { ref } from 'vue';

const selectedCountry = ref(null);
const countries = ref([
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Aruba', code: 'AW' },
    { name: 'Australia', code: 'AU' },
    { name: 'Austria', code: 'AT' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Bahamas', code: 'BS' }
]);
</script>
<script lang="ts">
import { defineComponent } from 'vue';


export default defineComponent({
    data() {
        const userStore = useUserStore();
        return {
            username: userStore.username,
            emailAddress: userStore.emailAddress,
            firstName: userStore.firstName,
            lastName: userStore.lastName,
            subscribed: userStore.isSubscribed
        }
    }
})
</script>