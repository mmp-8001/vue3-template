<template>
    <p>
        Hi there!
    </p>
    <div class="special">
        <p>
            An special text :)
        </p>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({

    });
</script>

<style lang="scss">
    div.special {
        p {
            color: orange;
            padding-left: 20px;
        }
    }
</style>