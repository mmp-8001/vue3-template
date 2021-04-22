<template>
    <h3>User:</h3>
    <p style="padding-left: 10px">
        First Name: {{user.firstName}}<br>
        Last Name: {{user.lastName}}<br>
    </p>
</template>



<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router'
    import { User, UserEmpty } from '@model/User';
    import { httpGet } from "@lib/api";
    import { GET_USER } from "@api";

    export default defineComponent({
        setup() {
            const route = useRoute();
            const router = useRouter();

            /*********************************************************
             * User
             *********************************************************/
            let user = ref(UserEmpty());
            onMounted(() => {
                httpGet(GET_USER(<string> route.params.username), (data) => {
                    user.value = data;
                }, (code: number) => {
                    if (code === 404) {
                        router.push('/404');
                    } else {
                        // TODO: handle error
                    }
                });
            });


            /*********************************************************
             * Return data
             *********************************************************/
            return {
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