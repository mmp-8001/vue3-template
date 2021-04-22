<template>
    <h2>Vue Application</h2>
    <ul>
        <li><router-link :to="{name: 'home'}">Home (Counter)</router-link></li>
        <li><router-link :to="{name: 'user', params: {username: 'ali'}}">User (Ali)</router-link></li>
        <li><router-link :to="{name: 'user', params: {username: 'sara'}}">User (Sara)</router-link></li>
    </ul>
    <router-view :key="this.$route.fullPath"/>
</template>

<script lang="js">
    import {defineComponent} from 'vue';

    export default defineComponent({

    });
</script>

<style scoped>
</style>