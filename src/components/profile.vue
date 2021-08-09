<template>
   <div class="card">
        <img src="login.png" alt="logo" width="100" height="200">
    <fieldset>
    <label for="userid"><b>User ID: {{data.userid}} </b></label>
    <br>
    <br>
    <label for="name"><strong> Name: {{data.name}} </strong></label>
    <br>
    <br>
    <label for="dob"> <strong> Date of Birth: {{data.dob}}</strong></label>
    <br>
    <br>
    <label for="gender"><b> Gender: {{data.gender}} </b></label>
	<br>	
    <br>
    <label for="email"><b>Email ID: {{data.email}} </b></label>
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
            userid:'',
            interest:[],

        }
    },
    mounted: function () {
        let id= JSON.parse(sessionStorage.getItem("User"));
        for(let i=0; i<Users.users.length; i++) {
            if (Users.users[i].password === id) {
                this.userid=Users.users[i].userid
                this.name= Users.users[i].name;
                this.gender=Users.users[i].gender;
                this.dob=Users.users[i].dob;
                this.email=Users.users[i].email;
                //this.interest=Users.users[i].interest;
            }
        }
    }
}
</script>

<style>

</style>