<template>
    <div v-if="id === null">
        <Forbidden />
    </div>
   <div v-else>
        <img :src="avatar" id='profilePic' alt="avatar" width="300" height="320">
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
        <router-link to='/changePassword'><button>Change Password</button></router-link>
    </div>
</template>

<script>
import {Users} from "../database";
import Forbidden from './forbidden.vue';
export default {
    data: ()=> {
        return{
            avatar:'',
            name:'',
            gender:'',
            dob:'',
            email:'',
            userId:'',
            interest:[],
            id:''
        }
    },
    components:{
        Forbidden
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
<<<<<<< HEAD
#profilePic{
    border-radius: 50%;
}
=======
  #profilePic
  {
  border-radius: 50%;
  }
>>>>>>> 9b85291fbb4aca5b1dd420373a8ace97deb0a805
</style>