<template>
    <div class="fbox">
        <img src="warning.png" alt="warning">
    <p class="forbid">
        <!-- <p style="font-style:'Press Start 2P', cursive; font-size: 5rem;">     -->
        403 Forbidden!!!
        <br>
        You should be logged in to access this page.
        <br>
        You can login <router-link to='/'>here</router-link>
    </p>
    </div>
</template>

<script>
export default {
    name:'Forbidden'
}
</script>

<style >

.fbox{
    display:flex;
    justify-content:center;
    padding:2rem;
    
}

.forbid{
    
    font-family:'Press Start 2P', cursive;
    font-size: 3rem;
}

</style>