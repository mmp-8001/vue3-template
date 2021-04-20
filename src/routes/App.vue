<template>
    <p>
        Counter value: {{ counter }}<br>
        <span class="validation" :class="{invalid: !isCounterValid}">
            <span v-if="!this.isCounterValid">in</span>valid value!
        </span>
    </p>
    <div>
        <button @click="countUp()">UP !</button>
        <button @click="countDown()">DOWN !</button>
    </div>
    <br>
    <p>
        <span v-for="msg in messages">{{msg}}<br></span>
    </p>
</template>

<script lang="ts">
    import { defineComponent, ref, computed, onMounted } from 'vue';
    import axios from 'axios';

    export default defineComponent({
        setup() {
            let counter = ref(0);
            let countUp = () => counter.value++;
            let countDown = () => counter.value--;
            let isCounterValid = computed(() => counter.value <= 10 && counter.value > 0);

            let messages = ref(new Array<string>());
            onMounted(() => {
                axios.get('http://127.0.0.1:5000/api/greeting/ali').then(function (response) {
                    if (response.data.ok === true) {
                        (<Array<string>> response.data.data).forEach((item) => messages.value.push(item));
                    } else {
                        console.log("Failed 1");
                    }
                }).catch(function (error) {
                    console.log("Failed 2");
                    console.log(error);
                });
            });

            return {
                counter, countUp, countDown, isCounterValid, messages
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