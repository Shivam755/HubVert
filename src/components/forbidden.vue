<template>
    <p class="forbid">
    <!-- <p style="font-style:'Press Start 2P', cursive; font-size: 5rem;">     -->
        403 Forbidden!!!
        <br>
        You should be logged in to access this page.
        <br>
        You can login <router-link to='/'>here</router-link>
    </p>
</template>

<script>
export default {
    name:'Forbidden'
}
</script>

<style >

.forbid{
    font-style:'Press Start 2P', cursive;
    font-size: 5rem;
}

</style>