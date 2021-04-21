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
    <br>
    <h3>User:</h3>
    <p style="padding-left: 10px">
        First Name: {{user.firstName}}<br>
        Last Name: {{user.lastName}}<br>
    </p>
</template>



<script lang="ts">
    import { defineComponent, ref, computed, onMounted } from 'vue';
    import { User, UserEmpty } from '@model/User';
    import { httpGet } from "@lib/api";
    import { GET_USER } from "@api";

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
             * User
             *********************************************************/
            let user = ref(UserEmpty());
            onMounted(() => {
                httpGet(GET_USER('ali'), (data) => {
                    user.value = data;
                }, () => {
                    // handle error
                });
            });


            /*********************************************************
             * Return data
             *********************************************************/
            return {
                counter, countUp, countDown, isCounterValid,
                user
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