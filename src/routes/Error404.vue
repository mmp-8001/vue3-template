<template>
    <h3>Page not found (404)</h3>
</template>



<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        setup() {
            return {}
        }
    });
</script>



<style lang="scss" scoped>
    .validation {
        color: green;
        &.invalid {
            color: red;
        }
    }
</style>