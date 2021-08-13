<template>
    <img src="" />
</template>

<script>
export default {
    name:"changePic",
    data:()=>{
        return {
            id: "",
            avatar: ""
        }
    },
    mounted: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {
                if (Users.users[i].password === this.id.toString()) {
                    this.avatar=require("../assets/"+Users.users[i].avatar);
                    //this.interest=Users.users[i].interest;
                }
            }
        }
        return;
    }
}
</script>

<style>

</style>