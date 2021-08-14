<template>
    <div v-if="id === null">
        <Forbidden />
    </div>
   <div v-else>
       <Nav/>
        <img :src="avatar" id='profilePic' alt="avatar" width="300" height="320">
        <router-link to="/changeProfilePic"><button>✏️</button></router-link>
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
        <button @click.prevent = "logout()">Log-out</button>
    </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import Swal from 'sweetalert2';
import router from '../router/index';

import {Users} from "../database";
import Nav from "./nav.vue";
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
        Forbidden,
        Nav
    },
    methods:{
        logout:function(){
            Swal.fire({
            title: 'Do you really want to log out?',
            icon:'question',
            showDenyButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `No`,
            }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    Swal.fire('Thanks for visiting.See you soon!','','success').then(()=>{
                        sessionStorage.clear();
                        router.push('/');
                    });
                    
                } else if (result.isDenied) {
                    Swal.fire("We're glad you decided to stay!", "", "info")
                }
            })
        }
    },
    mounted: function () {
        this.id= JSON.parse(sessionStorage.getItem("User"));
        if (this.id){
            for(let i=0; i<Users.users.length; i++) {
                if (SHA256(Users.users[i].email).toString() === this.id.toString()) {
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
  #profilePic
  {
  border-radius: 50%;
  }
</style>