<template>
    <p>
        Counter value: {{ counter }}<br>
        <span class="validation" :class="{invalid: !isCounterValid}">
            <span v-if="!this.isCounterValid">in</span>valid value!
        </span>
    </p>
    <div>
        <button @click="countUp()">UP !</button>
        <br>
        <button @click="countDown()">DOWN !</button>
    </div>
</template>



<script lang="ts">
    import { defineComponent, ref, computed } from 'vue';

    export default defineComponent({
        setup() {
            /*********************************************************
             * Counter
             *********************************************************/
            let counter = ref(0);
            let countUp = () => counter.value++;
            let countDown = () => counter.value--;
            let isCounterValid = computed(() => counter.value <= 10 && counter.value > 0);


            /*********************************************************
             * Return data
             *********************************************************/
            return {
                counter, countUp, countDown, isCounterValid,
            }
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