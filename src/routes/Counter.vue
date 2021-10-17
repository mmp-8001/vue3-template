<template>
    <div>{{ TRL("Title") }}</div>
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
    import {TRL} from "@lib/language";

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
                counter, countUp, countDown, isCounterValid, TRL
            }
        }
    });
</script>


<style lang="scss" scoped>

.validation {
  color: #{if($is_rtl, "yellow", "purple")};

  &.invalid {
    color: red;
  }
}
</style>