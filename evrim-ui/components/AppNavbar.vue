<template>
    <div>
        <Menubar :model="items" />
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        to: '/'
    },
    {
        label: 'Reports',
        icon: 'pi pi-fw pi-info',
        to: '/reports'
    },
    {
        label: 'Account',
        icon: 'pi pi-fw pi-envelope',
        to: '/account'
    }
])
</script>