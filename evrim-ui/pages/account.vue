<template>
    <div class="bg-surface-50 dark:bg-surface-950 px-6 py-8 md:px-12 lg:px-8">
        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl mb-4">Profile</div>
        <p class="m-0 mb-4 p-0 text-surface-600 dark:text-surface-200 leading-normal mr-4">
            Odio euismod lacinia at quis risus sed vulputate odio. Non nisi est sit amet. Egestas integer eget aliquet nibh praesent tristique magna.
        </p>
        <div class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border">
            <div class="grid grid-cols-12 gap-4">
                <div class="mb-4 col-span-12">
                    <label for="nickname2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Nickname</label>
                    <InputText id="nickname2" type="text" class="w-full" />
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="bio2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Bio</label>
                    <Textarea id="bio2" type="text" :rows="5" :auto-resize="true" class="w-full" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="avatar2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Avatar</label>
                    <div class="flex items-center">
                        <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/avatars/circle/avatar-f-4.png" class="mr-6" />
                        <FileUpload id="avatar2" mode="basic" name="avatar" url="./upload.php" accept="image/*" :max-file-size="1000000" class="p-button-outlined p-button-plain" choose-label="Upload Image" />
                    </div>
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="email2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Email</label>
                    <InputText id="email2" type="text" class="w-full" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="country2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Country</label>
                    <Select id="country2" v-model="selectedCountry" :options="countries" option-label="name" :filter="true" filter-by="name" :show-clear="true" placeholder="Select a Country" class="w-full">
                        <template #option="slotProps">
                            <div class="flex items-center">
                                <img src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/flag/flag_placeholder.png" :class="'mr-2 w-[18px]' + slotProps.option.code.toLowerCase()" />
                                <div>{{ slotProps.option.name }}</div>
                            </div>
                        </template>
                    </Select>
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="city2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">City</label>
                    <InputText id="city2" type="text" class="w-full" />
                </div>
                <div class="mb-4 col-span-12 md:col-span-6">
                    <label for="state2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">State</label>
                    <InputText id="state2" type="text" class="w-full" />
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="mb-4 col-span-12">
                    <label for="website2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Website</label>
                    <InputGroup>
                        <InputGroupAddon>www</InputGroupAddon>
                        <InputText id="website2" placeholder="Website" />
                    </InputGroup>
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="mb-4 col-span-12">
                    <label for="privacy2" class="font-medium text-surface-900 dark:text-surface-0 mb-1 block">Privacy</label>
                    <div class="flex items-center">
                        <ToggleSwitch id="privacy2" v-model="checked" />
                        <span class="ml-2">Share my data with contacts</span>
                    </div>
                </div>
                <div class="border-surface border-t opacity-50 mb-4 col-span-12" />
                <div class="col-span-12">
                    <Button label="Save Changes" class="w-auto mt-4" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import ToggleSwitch from 'primevue/toggleswitch';
import { ref } from 'vue';

const checked = ref(true);
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