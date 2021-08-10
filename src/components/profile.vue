<template>
    <div v-if="id === null">
        <h1>403 Forbidden.<br>You should be logged in to access this page.<br>You can login <router-link to='/'>here</router-link></h1>
    </div>
   <div class="card" v-else>
        <img src="login.png" alt="logo" width="100" height="200">
        <fieldset>
        <label for="userid"><b>User ID: {{userId}} </b></label>
        <br>
        <br>
        <label for="name"><strong> Name: {{name}} </strong></label>
        <br>
        <br>
        <label for="dob"> <strong> Date of Birth: {{dob}}</strong></label>
        <br>
        <br>
        <label for="gender"><b> Gender: {{gender}} </b></label>
        <br>	
        <br>
        <label for="email"><b>Email ID: {{email}} </b></label>
        </fieldset>
        <br>
        <br>
        <button type="submit" @click.prevent="verify">Change Password</button>
    </div>
</template>

<script>
import {Users} from "../database"
export default {
    data: ()=> {
        return{
            name:'',
            gender:'',
            dob:'',
            email:'',
            userId:'',
            interest:[],
            id:''
        }
    },
    mounted: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {
                if (Users.users[i].password === this.id.toString()) {
                    this.userId=Users.users[i].id
                    this.name= Users.users[i].name;
                    this.gender=Users.users[i].gender;
                    this.dob=Users.users[i].dob;
                    this.email=Users.users[i].email;
                    //this.interest=Users.users[i].interest;
                }
            }
        }else{
            return 
        }
    }
}
</script>

<style>

</style>